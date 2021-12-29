import type { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from "mongodb"
import { getSession } from "next-auth/client"

export type Message = {
  message: string
}

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

    const client = await MongoClient.connect(`${process.env.ENV_LOCAL_CONNECTION_STRING}`)

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

    const client = await MongoClient.connect(`${process.env.ENV_LOCAL_CONNECTION_STRING}`)

    const db = client.db()

    const results = await db
      .collection("questions")
      .aggregate([{ $sample: { size: 5 } }])
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

    //console.log(newQuestion)

    res.status(200).json(cleanedResults)
  }
  // end handler function
}
