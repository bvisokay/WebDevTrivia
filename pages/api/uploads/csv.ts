import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { connectToDatabase } from "../../../lib/db"
import { Question } from "../../../lib/types"

/*
*
*
*
  type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

*
*
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    // need to extract username from the session so we can look up _id

    let client
    //error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: "There was an error connecting to the data." })
      return
    }

    // extract data from the request
    const documentsFromCSV = req?.body?.csv

    // server side validation needed

    // need to get list of categories and check versus categories on new questions

    // if necessary add new category or throw error?

    // if validation passes then use extracted username from the session to look up _id

    // append _id as authorId property and the date as createdDate to each question object
    for (let i = 0; i < documentsFromCSV.length; i++) {
      let newQ = { ...(documentsFromCSV[i] || {}) }

      //error handling for adding a new question
      try {
        //await addQuestionDocument(client, newQ)
      } catch (err: unknown) {
        client.close()
        res.status(500).json({ message: "error", errors: err })
      }
    } // end for loop

    client.close()
    res.status(200).json({ message: "success" })
  } // end POST request
}
