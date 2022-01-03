// API all about handling HTTP requests
// to send and receive data in JSON format
// to the server and/or the database
// behind the scenes requests
// res.status(200).json({}), also req.method() and req.body()
// open up network tab in the dev tools and reload
// Click on the route in the name column
// Can see reponse and headers
// The data in this routes are not exposed to the front-end
// Store in database, file, or array (for developement)
// Can import fs and path since this is node code & runs on the server
// use this to write to a file (actually read, and overwrite)

import type { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from "mongodb"
import { getSession } from "next-auth/client"

export type Message = {
  message: string
}

const uri = process.env.MONGODB_URI

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // api-route protection from non-logged in users
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    // add server-side validation to prevent empty fields
    /*  if (newQuestion.category === "") {
      res.status(422).json({ message: "Invalid category. " })
    } */

    const client = await MongoClient.connect(uri!)

    const db = client.db()

    await db.collection("questions").insertOne({
      category: req.body.category,
      type: req.body.type,
      difficulty: req.body.difficulty,
      question: req.body.question,
      correct_answer: req.body.correct_answer,
      incorrect_answers: req.body.incorrect_answers
    })

    client.close()

    //console.log(newQuestion)
    res.status(201).json({ message: "New question added!" })
  }

  if (req.method === "GET") {
    // restrict by requiring api key or limit number of requests?
    // how to make route dynamic to get certain difficulty or type?
    // is there a way to prevent a user from seeing...
    // ...same question twice before all questions seen?

    const client = await MongoClient.connect(uri!)

    // grab query parameters
    //console.log(newQuestion)

    //let category = req.query.category
    //console.log(category)
    //console.log(`Query category: ${req.query.category}`)

    // set a default for amount
    // if a query parameter is passed then use that
    let amount: any = 5
    if (req.query.amount) {
      amount = parseInt(`${req.query.amount}`)
      //console.log(`amount`, amount)
    } else {
      //console.log("No Amount Specified")
      //console.log(`Amount`, req.query.category)
    }

    // set a default for categoryMatch
    // if a query parameter is passed then use that
    let category: string | string[]
    let categoryMatch = {}
    if (req.query.category) {
      category = req.query.category
      categoryMatch = { category: `${category}` }
      //console.log(`category`, category)
    } else {
      //console.log(`No category specified`)
      //console.log(`category`, req.query.category)
    }

    //console.log(req.query)

    const db = client.db()

    const results = await db
      .collection("questions")
      .aggregate([{ $match: categoryMatch }, { $sample: { size: amount } }])
      .toArray()

    // removes _id from each question object
    const cleanedResults = results.map(questionObj => {
      return {
        category: questionObj.category,
        type: questionObj.type,
        difficulty: questionObj.difficulty,
        question: questionObj.question,
        correct_answer: questionObj.correct_answer,
        incorrect_answers: questionObj.incorrect_answers
      }
    })

    client.close()

    res.status(200).json(cleanedResults)
  }
  // end handler function
}
