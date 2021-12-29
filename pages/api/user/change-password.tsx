import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { connectToDatabase } from "../../../lib/db"
import { hashPassword, verifyPassword } from "../../../lib/auth"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return
  }

  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: "Not authenticated" })
    return
  }

  const userEmail = session.user!.email
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

  const client = await connectToDatabase()
  const usersCollection = client.db().collection("users")
  const user = await usersCollection.findOne({ email: userEmail })

  if (!user) {
    res.status(404).json({ message: "User not found" })
    client.close()
    return
  }

  const currentPassword = user.password

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword)

  if (!passwordsAreEqual) {
    res.status(422).json({ message: "Could not update the password" })
    client.close()
    return
  }

  const hashedPassword = await hashPassword(newPassword)

  const result = await usersCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } })

  // this function needs error handling

  client.close()
  res.status(200).json({ message: "password updated" })
}

export default handler
