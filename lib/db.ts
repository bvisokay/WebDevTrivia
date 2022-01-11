import { MongoClient } from "mongodb"
import { Question } from "../pages/index"
import type { NextApiRequest } from "next"

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI
  const client = await MongoClient.connect(uri!)

  return client
} // end connectToDatabase

export async function addQuestionDocument(client: MongoClient, document: Question) {
  const db = client.db()
  const result = await db.collection("questions").insertOne(document)
  return result
}

export async function getQuestions(client: MongoClient, req: NextApiRequest) {
  const db = client.db()

  let amount: any = 5
  if (req.query.amount) {
    amount = parseInt(`${req.query.amount}`)
  }

  let category: string | string[]
  let categoryMatch = {}
  if (req.query.category) {
    category = req.query.category
    categoryMatch = { category: `${category}` }
  }

  const results = await db
    .collection("questions")
    .aggregate([{ $match: categoryMatch }, { $sample: { size: amount } }])
    .toArray()

  // removes _id from each question object
  const cleanedResults = results.map((questionObj: any) => {
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

  const data = cleanedResults
  return data
}
