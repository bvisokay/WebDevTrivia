import { MongoClient } from "mongodb"

export async function connectToDatabase() {
  const client = await MongoClient.connect(process.env.CONNECTION_STRING!)

  return client
}

export async function getQuestions(client: any) {
  const db = client.db()

  const results = await db
    .collection("questions")
    .aggregate([{ $sample: { size: 5 } }])
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
