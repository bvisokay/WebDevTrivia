import { MongoClient } from "mongodb"
//import type { Document, WithId } from "mongodb"
import { Question, QuestionDoc, CategoryDocType, CategoryObjectType, UpdateCatNamesTypes } from "../lib/types"
import type { NextApiRequest } from "next"
import { ObjectId } from "mongodb"

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI
  //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const client = await MongoClient.connect(uri!)

  return client
} // end connectToDatabase

// CREATE

export async function addCategoryDocument(client: MongoClient, document: CategoryObjectType) {
  const db = client.db()
  const result = await db.collection("categories").insertOne(document)
  return result
}

export async function addQuestionDocument(client: MongoClient, document: Question) {
  const db = client.db()
  const result = await db.collection("questions").insertOne(document)
  return result
}

// READ

export async function getCategories(client: MongoClient) {
  const db = client.db()
  const results = (await db.collection("categories").find().toArray()) as CategoryDocType[]
  const cleanedResults = results.map(categoryObj => {
    return categoryObj.name
  })
  return cleanedResults
}

export async function getCategoryObjs(client: MongoClient) {
  const db = client.db()
  const results = (await db.collection("categories").find().toArray()) as CategoryDocType[]
  const cleanedResults = results.map(categoryObj => {
    return {
      id: categoryObj._id.toString(),
      name: categoryObj.name,
      tally: 0
    }
  })
  return cleanedResults
}

export async function getQuestions(client: MongoClient, req: NextApiRequest) {
  const db = client.db()

  let amount: number | string = 5
  if (req.query.amount) {
    //eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    amount = parseInt(`${req.query.amount}`)
  }

  let category: string | string[]
  let categoryMatch = {}
  if (req.query.category) {
    category = req.query.category
    //eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    categoryMatch = { category: `${category}` }
  }

  const results = (await db
    .collection("questions")
    .aggregate([{ $match: categoryMatch }, { $sample: { size: amount } }])
    .toArray()) as QuestionDoc[]

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

  void client.close()

  const data = cleanedResults
  return data
}

export async function getAllQuestions(client: MongoClient) {
  const db = client.db()
  try {
    const results = (await db.collection("questions").find().toArray()) as QuestionDoc[]
    // removes _id from each question object
    const cleanedResults = results.map(questionObj => {
      return {
        id: questionObj._id.toString(),
        category: questionObj.category,
        type: questionObj.type,
        difficulty: questionObj.difficulty,
        question: questionObj.question,
        correct_answer: questionObj.correct_answer,
        incorrect_answers: questionObj.incorrect_answers,
        createdDate: questionObj.createdDate.toString()
      }
    })
    return cleanedResults
  } catch (err) {
    throw { message: "failure", errors: err }
  }
}

// UPDATE

export async function updateQuestionDocument(client: MongoClient, document: QuestionDoc) {
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

export async function updateCategoryDocument(client: MongoClient, objWithOldAndNewNames: UpdateCatNamesTypes) {
  const db = client.db()
  // update the category name
  const result = await db.collection("categories").findOneAndUpdate(
    { name: objWithOldAndNewNames.oldCategoryName },
    {
      $set: {
        name: objWithOldAndNewNames.newCategoryName
      }
    }
  )
  // update all questions with that category
  return result
}

export async function updateQsWithNewCategoryName(client: MongoClient, objWithOldAndNewNames: UpdateCatNamesTypes) {
  const db = client.db()
  // update the category name
  const result = await db.collection("questions").updateMany(
    { category: objWithOldAndNewNames.oldCategoryName },
    {
      $set: {
        category: objWithOldAndNewNames.newCategoryName
      }
    }
  )
  // update all questions with that category
  return result
}

// DELETE

export async function deleteQuestionDocument(client: MongoClient, id: string) {
  const db = client.db()
  const result = await db.collection("questions").deleteOne({ _id: new ObjectId(id) })
  return result
}

// should really be using the id and not the name
export async function deleteCategoryDocument(client: MongoClient, catName: string) {
  const db = client.db()
  // rename existing questions in the category being deleted to uncategorized
  //const result1 = await db.collection("questions").updateMany({ category: catName }, { $set: { category: "uncategorized" } })

  // delete existing questions in the category being deleted to uncategorized
  const result1 = await db.collection("questions").deleteMany({ category: catName })
  const result2 = await db.collection("categories").deleteOne({ name: catName })
  const resultObj = {
    result1: result1,
    result2: result2
  }
  return resultObj
}
