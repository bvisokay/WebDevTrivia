import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { ObjectId } from "mongodb"
import { connectToDatabase, addQuestionDocument, getQuestions, deleteQuestionDocument } from "../../lib/db"
import { Question, QuestionOnClientTypes } from "../../lib/types"
import { validateNewQs } from "../../lib/util"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // api-route protection from non-logged in users
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    const data = req.body as Question[]

    let newQArray

    if (data.length && data instanceof Array) {
      // cleanup each question object in the array regardless of how many there are
      newQArray = data.map(qObj => {
        return {
          category: qObj.category.trim(),
          type: "multiple",
          difficulty: "easy",
          question: qObj.question.trim(),
          correct_answer: qObj.correct_answer.trim(),
          incorrect_answers: [qObj.incorrect_answers[0].trim(), qObj.incorrect_answers[1].trim(), qObj.incorrect_answers[2].trim()],
          createdDate: new Date()
        }
      }) // end newQArray

      // validate every question object in the array regardless of how many there are
      const valResult = validateNewQs(newQArray)

      if (!valResult) {
        throw { message: "error", errors: "Validation failed, operation aborted" }
      }

      if (valResult) {
        let client
        //error handling for connection to database
        try {
          client = await connectToDatabase()
        } catch (err) {
          return res.status(500).json({ message: "There was an error connecting to the data", errors: err })
        }

        //error handling for adding a new question
        for (let i = 0; i < newQArray.length; i++) {
          const newQ = newQArray[i] || {}
          try {
            await addQuestionDocument(client, newQ)
          } catch (err) {
            void client.close()
            return res.status(500).json({ message: "Inserting data failed.", errors: err })
          }
        } // end for loop

        void client.close()
        res.status(201).json({ message: "success" })
      }
    } else {
      res.status(422).json({ message: "Invalid data sent" })
    } // end if/else
  } // end post request

  if (req.method === "GET") {
    let client
    //error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: "There was an error connecting to the data." })
      return
    }

    // error handling for getting questions
    let cleanedResults
    try {
      cleanedResults = await getQuestions(client, req)
      res.status(200).json(cleanedResults)
    } catch (error) {
      res.status(500).json({ message: "There was an error retrieving the questions" })
    }

    void client.close()
  } // end GET request

  if (req.method === "PATCH") {
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

    const data = req.body as QuestionOnClientTypes

    let client
    //error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: "There was an error connecting to the data." })
      return
    }

    try {
      const result = await client
        .db()
        .collection("questions")
        .findOneAndUpdate(
          { _id: new ObjectId(data.id) },
          {
            $set: {
              category: data.category,
              type: data.type,
              difficulty: data.difficulty,
              question: data.question,
              correct_answer: data.correct_answer,
              incorrect_answers: data.incorrect_answers
            }
          }
        )
      void client.close()
      return res.status(201).json({ message: "success", data: result })
    } catch (err) {
      void client.close()
      return res.status(500).json({ message: "failure", errors: err })
    }
  } // end PATCH request

  if (req.method === "DELETE") {
    // api-route protection from non-logged in users
    const session = await getSession({ req: req })
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    // add server-side validation to prevent empty fields
    /*  if (newQuestion.category === "") {
      res.status(422).json({ message: "Invalid category. " })
    } */

    const catToDelete = req.body as string

    let client
    //error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (err) {
      return res.status(500).json({ message: "There was an error connecting to the data.", errors: err })
    }

    //error handling for deleting question
    try {
      await deleteQuestionDocument(client, catToDelete)
      return res.status(201).json({ message: "success" })
    } catch (err) {
      return res.status(500).json({ message: "Deleting question failed.", errors: err })
    }
  } // end DELETE request
} // end handler function
