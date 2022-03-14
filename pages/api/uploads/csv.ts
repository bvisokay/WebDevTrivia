import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { connectToDatabase } from "../../../lib/db"
import { Question } from "../../index"

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

type Data = {
  hey?: string
  message?: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    let client
    //error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: "There was an error connecting to the data." })
      return
    }

    const documentsFromCSV = req?.body?.csv

    for (let i = 0; i < documentsFromCSV.length; i++) {
      let newQ = { ...(documentsFromCSV[i] || {}) }

      //error handling for adding a new question
      try {
        //await addQuestionDocument(client, newQ)
        res.status(201).json({ message: "csv uploaded" })
      } catch (error) {
        res.status(500).json({ message: "Inserting data failed." })
      }
    }

    res.status(200).json({ hey: "there" })
  }
}
