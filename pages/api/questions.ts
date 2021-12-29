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
    // restrict with key or limit number of requests?
    // how to make route dynamic to get certain difficulty or type?
    // is there a way to prevent a user from seeing...
    // ...same question twice before all questions seen?
    // AT A MINIUMUM: connect to database and grab 3 random questions

    const client = await MongoClient.connect(`${process.env.ENV_LOCAL_CONNECTION_STRING}`)

    const db = client.db()

    // narrow down instead of using find() which gets all
    // should we bother to cleanup _id in json results?
    // could do .find().toArray()
    // .aggregate([{$sample: {size: 3}}])
    const results = await db
      .collection("questions")
      .aggregate([{ $sample: { size: 5 } }])
      .toArray()

    console.log(results)

    client.close()

    //console.log(newQuestion)

    res.status(200).json(results)

    /*     [
      {
        category: "Sports",
        correct_answer: "Dallas Cowboys",
        difficulty: "easy",
        incorrect_answers: ["New York Giants", "Washington Redskins", "Philadelphia Eagles"],
        answers: ["New York Giants", "Dallas Cowboys", "Washington Redskins", "Philadelphia Eagles"],
        question: "Which NFL team won the NFC East title in 2021?",
        type: "multiple"
      },
      {
        category: "test",
        correct_answer: "test",
        difficulty: "test",
        incorrect_answers: ["test", "Test", "Test"],
        answers: ["Test", "Test", "Test", "Test"],
        question: "Test?",
        type: "Test"
      }
    ] */
  }
  // end handler function
}
