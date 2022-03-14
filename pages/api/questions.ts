import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { connectToDatabase, addQuestionDocument, getQuestions, updateQuestionDocument, deleteQuestionDocument } from "../../lib/db"
import { validateNewQs } from "../../lib/util"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // api-route protection from non-logged in users
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    let newQArray

    if (req.body.length && req.body instanceof Array) {
      // cleanup each question object in the array regardless of how many there are
      newQArray = req.body.map(qObj => {
        return {
          category: qObj.category.trim(),
          type: qObj.type.trim(),
          difficulty: qObj.difficulty.trim(),
          question: qObj.question.trim(),
          correct_answer: qObj.correct_answer.trim(),
          incorrect_answers: [qObj.incorrect_answers[0].trim(), qObj.incorrect_answers[1].trim(), qObj.incorrect_answers[2].trim()]
        }
      }) // end newQArray

      // validate every question object in the array regardless of how many there are
      const valResult = await validateNewQs(newQArray)

      if (!valResult) {
        console.log("Validation failed, operation aborted")
        return
      }

      if (valResult) {
        let client
        //error handling for connection to database
        try {
          client = await connectToDatabase()
        } catch (error) {
          res.status(500).json({ message: "There was an error connecting to the data." })
          return
        }

        //error handling for adding a new question
        for (let i = 0; i < newQArray.length; i++) {
          let newQ = newQArray[i] || {}
          try {
            await addQuestionDocument(client, newQ)
          } catch (error) {
            res.status(500).json({ message: "Inserting data failed." })
            client.close()
            return
          }
        } // end for loop

        client.close()
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

    client.close()
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

    let client
    //error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: "There was an error connecting to the data." })
      return
    }

    //error handling for adding a new question
    try {
      await updateQuestionDocument(client, {
        _id: req.body._id,
        category: req.body.category,
        type: req.body.type,
        difficulty: req.body.difficulty,
        question: req.body.question,
        correct_answer: req.body.correct_answer,
        incorrect_answers: req.body.incorrect_answers
      })
      res.status(201).json({ message: "success" })
    } catch (error) {
      res.status(500).json({ message: "Updating question failed." })
    }

    client.close()
  } // end PATCH request

  if (req.method === "DELETE") {
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

    let client
    //error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: "There was an error connecting to the data." })
      return
    }

    //error handling for deleting question
    try {
      await deleteQuestionDocument(client, {
        _id: req.body.id,
        category: req.body.category,
        type: req.body.type,
        difficulty: req.body.difficulty,
        question: req.body.question,
        correct_answer: req.body.correct_answer,
        incorrect_answers: req.body.incorrect_answers
      })
      res.status(201).json({ message: "success" })
    } catch (error) {
      res.status(500).json({ message: "Deleting question failed." })
    }

    client.close()
  } // end DELETE request
} // end handler function
