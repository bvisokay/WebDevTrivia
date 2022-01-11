import { connectToDatabase } from "../../../lib/db"
import type { NextApiRequest, NextApiResponse } from "next"
import { hashPassword } from "../../../lib/auth"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    console.log("Not a POST request")
    res.status(500).json({ message: "There was an error." })
    return
  }

  const data = req.body

  const { email, password } = data

  if (!email || !email.includes("@") || !password || password.trim().length < 7) {
    res.status(422).json({ message: "Invalid input - password should also be at least 7 characters." })
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

  //error handling for actually signing up
  try {
    const db = client.db()

    // check if user already exists
    const existingUser = await db.collection("users").findOne({ email: email })
    if (existingUser) {
      res.status(422).json({ message: "A user with that email already exists." })
      client.close()
      return
    }

    // hash password only if unique user
    const hashedPassword = await hashPassword(password)

    // store new unique user in the database
    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword
    })

    res.status(201).json({ message: "Created user." })
  } catch (error) {
    res.status(500).json({ message: "There was an error creating the user." })
  }
  client.close()
  res.status(201).json({ message: "Created user." })
}
export default handler
