import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "../../../lib/db"
import { hashPassword, verifyPassword } from "../../../lib/auth"
import { UpdatePassTypes } from "../../../lib/types"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "error" })
  }

  const session = await getSession({ req: req })

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" })
  }

  let userEmail
  if (session && session.user && session.user.email) {
    userEmail = session.user.email
  }

  const { oldPassword, newPassword } = req.body as UpdatePassTypes

  let client
  //error handling for connection to database
  try {
    client = await connectToDatabase()
  } catch (error) {
    res.status(500).json({ message: "There was an error connecting to the data." })
    return
  }

  //error handling for updating

  try {
    const usersCollection = client.db().collection("users")
    const user = await usersCollection.findOne({ email: userEmail })
    // cannot find user
    if (!user) {
      res.status(404).json({ message: "User not found" })
      void client.close()
      return
    }
    const currentPassword = user.password as string

    const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

    if (!passwordsAreEqual) {
      res.status(422).json({ message: "Could not update the password" })
      void client.close()
      return
    }

    const hashedPassword = await hashPassword(newPassword)
    await usersCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } })
    res.status(200).json({ message: "success" })
  } catch (error) {
    res.status(500).json({ message: "error" })
  }
  void client.close()
}

export default handler
