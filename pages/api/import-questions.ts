import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { connectToDatabase } from "../../lib/db"
import { Question } from "../../lib/types"

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

    // Hold off for now
    // need to extract username from the session
    // using the session username lok upc
    // later append user's _id as authorId property

    // extract data from the incoming request (array of objects)
    //const documentsFromCSV = req?.body?.csv

    // look up the authorId

    // append the hard-coded type and hard-coded difficulty and the date as createdDate to each question object

    // run through server side validation function that can take array of arguments

    // if validation fails then throw necessary errors

    // if validation passes then connect to database

    // need to get list of categories and check versus categories on new questions

    // add to the databases using update many

    // handled result

    // if necessary add new category or throw error?

    // if validation passes then use extracted username from the session to look up _id

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
      //await client.db().collection.("questions").insertMany()
    } catch (err: unknown) {
      client.close()
      res.status(500).json({ message: "error", errors: err })
    }

    client.close()
    res.status(200).json({ message: "success" })
  } // end POST request
}
