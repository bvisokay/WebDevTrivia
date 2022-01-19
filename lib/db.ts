import { MongoClient } from "mongodb"
import { Question } from "../pages/index"
import type { NextApiRequest } from "next"
const ObjectId = require("mongodb").ObjectId

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

export async function updateQuestionDocument(client: MongoClient, document: any) {
  const db = client.db()
  const result = await db.collection("questions").findOneAndUpdate(
    { _id: new ObjectId(document._id) },
    {
      $set: {
        category: document.category,
        type: document.type,
        difficulty: document.difficulty,
        question: document.question,
        correct_answer: document.correct_answer,
        incorrect_answers: document.incorrect_answers
      }
    }
  )
  return result
}

export async function deleteQuestionDocument(client: MongoClient, document: any) {
  const db = client.db()
  const result = await db.collection("questions").deleteOne({ _id: new ObjectId(document._id) })
  return result
}

export async function addCategoryDocument(client: MongoClient, document: {}) {
  const db = client.db()
  const result = await db.collection("categories").insertOne(document)
  return result
}

export async function getCategories(client: MongoClient) {
  const db = client.db()
  const results = await db.collection("categories").find().toArray()
  const cleanedResults = results.map(categoryObj => {
    return categoryObj.name
  })
  client.close()

  const data = cleanedResults
  return data
}

export async function getQuestions(client: MongoClient, req: NextApiRequest) {
  const db = client.db()

  let amount: number | string = 5
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

export async function getAllQuestions(client: MongoClient) {
  const db = client.db()

  const results = await db.collection("questions").find().toArray()

  // removes _id from each question object
  const cleanedResults = results.map((questionObj: any) => {
    return {
      id: questionObj._id,
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
