import type { NextApiRequest, NextApiResponse } from "next"
import { MongoClient } from "mongodb"

export type Message = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // add server-side validation validation
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
    // add validation
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
