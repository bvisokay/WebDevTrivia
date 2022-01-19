import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { connectToDatabase, getAllQuestions } from "../../lib/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // api-route protection from non-logged in users
    // non-open route because we are fetching all questions
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

    // error handling for getting questions
    let cleanedResults
    try {
      cleanedResults = await getAllQuestions(client)
      res.status(200).json(cleanedResults)
    } catch (error) {
      res.status(500).json({ message: "There was an error retrieving the questions" })
    }

    client.close()
  } // end GET request
} // end handler function
