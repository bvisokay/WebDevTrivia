import { connectToDatabase } from "../../../lib/db"
import type { NextApiRequest, NextApiResponse } from "next"
import { hashPassword } from "../../../lib/auth"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return
  }

  const data = req.body

  const { email, password } = data

  if (!email || !email.includes("@") || !password || password.trim().length < 7) {
    res.status(422).json({ message: "Invalid input - password should also be at least 7 characters." })
    return
  }

  const client = await connectToDatabase()

  const db = client.db()

  const existingUser = await db.collection("users").findOne({ email: email })

  if (existingUser) {
    res.status(422).json({ message: "A user with that email already exists" })
    client.close()
    // user already exists
    return
  }

  const hashedPassword = await hashPassword(password)

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword
  })

  res.status(201).json({ message: "Created User!" })
  client.close()
  // Should have some error handling above...
}
export default handler
