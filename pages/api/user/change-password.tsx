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

    //need to redirect to the auth page
    return
  }

  const userEmail = session.user!.email
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword

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

    res.status(200).json({ message: "password updated" })
  } catch (error) {
    res.status(500).json({ message: "There was an error updating the password." })
  }
  client.close()
}

export default handler
