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
      type: req.body.type,
      category: req.body.category,
      difficulty: req.body.difficulty,
      question: req.body.question,
      correct_answer: req.body.correct_answer,
      incorrect_answers: req.body.incorrect_answers,
      answers: req.body.answers
    })

    client.close()

    //console.log(newQuestion)
    res.status(201).json({ message: "New question added!" })
  }

  if (req.method === "GET") {
    // restrict with key or limit number of requests?
    // how to make route dynamic to get certain difficulty or type?
    // is there a way to prevent a user from seeing...
    // ...same question twice before all questions seen?
    // AT A MINIUMUM: connect to database and grab 3 random questions

    res.status(200).json({
      category: "Sports",
      correct_answer: "Dallas Cowboys",
      difficulty: "easy",
      incorrect_answers: ["New York Giants", "Washington Redskins", "Philadelphia Eagles"],
      answers: ["New York Giants", "Dallas Cowboys", "Washington Redskins", "Philadelphia Eagles"],
      question: "Which NFL team won the NFC East title in 2021?",
      type: "multiple"
    })
  }
  // end handler function
}
