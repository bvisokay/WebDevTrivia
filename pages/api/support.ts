import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { connectToDatabase } from "../../lib/db"

interface SupportMessageTypes {
  name: string
  email: string
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "error", errors: "Not supported" })
  }

  if (req.method === "POST") {
    // api-route protection from non-logged in users not needed for support request
    // Still using to see if the user was logged in when sending
    const session = await getSession({ req: req })
    let isSession = false
    if (session) {
      isSession = true
    }

    // extract data from the response.body
    const data = req.body as SupportMessageTypes

    // run server side cleanup and add status property (unread, pending, completed)
    if (typeof data.name !== "string") {
      return res.status(422).json({ message: "error", errors: "Error with data" })
    }
    if (typeof data.email !== "string") {
      return res.status(422).json({ message: "error", errors: "Error with data" })
    }
    if (typeof data.message !== "string") {
      return res.status(422).json({ message: "error", errors: "Error with data" })
    }
    const cleanedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim()
    }

    //// run server-side validation

    // all fields cannot be empty
    if (cleanedData.name === "" || !cleanedData.name.length) {
      return res.status(422).json({ message: "error", errors: "Must provide a name" })
    }
    if (cleanedData.email === "" || !cleanedData.email.length) {
      return res.status(422).json({ message: "error", errors: "Must provide an email" })
    }
    if (cleanedData.message === "" || !cleanedData.message.length) {
      return res.status(422).json({ message: "error", errors: "Must provide a message" })
    }

    // name must not be too short
    // email must not be too short
    if (cleanedData.email.length < 5) {
      return res.status(422).json({ message: "error", errors: "Must provide a valid email" })
    }
    // message must not be too short

    // name must not be too long
    if (cleanedData.name.length > 50) {
      return res.status(422).json({ message: "error", errors: "Provide a shorter name" })
    }
    // email must not be too long
    if (cleanedData.email.length > 100) {
      return res.status(422).json({ message: "error", errors: "Provide a shorter email" })
    }
    // message must not be too long
    if (cleanedData.message.length > 255) {
      return res.status(422).json({ message: "error", errors: "Provide a shorter message" })
    }
    // email must be in email format
    if (!/^\S+@\S+$/.test(cleanedData.email)) {
      return res.status(422).json({ message: "error", errors: "You must provide a valid email address" })
    }

    const dataToStore = {
      name: cleanedData.name,
      email: cleanedData.email,
      message: cleanedData.message,
      status: "pending",
      fromLoggedInUser: isSession
    }

    let client
    //error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: "error", errors: "There was an error connecting to the data." })
      return
    }

    //error handling for adding a new category
    try {
      await client.db().collection("support").insertOne(dataToStore)
      client.close()
      res.status(201).json({ message: "success" })
    } catch (error) {
      client.close()
      res.status(422).json({ message: "error" })
    }

    if (client) client.close()
  }
} // end handler function
