// do not override a built in default route (see docs...)

import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { connectToDatabase } from "../../../lib/db"
import { verifyPassword } from "../../../lib/auth"

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        // error handling for connection to database
        let client
        try {
          client = await connectToDatabase()
        } catch (error) {
          res.status(500).json({ message: "There was an error connecting to the database." })
          return
        }

        const usersCollection = client.db().collection("users")
        const user = await usersCollection.findOne({ email: credentials.email })

        if (!user) {
          // when you throw an error inside of authorize
          // authorize will reject the promise it generates
          client.close()
          throw new Error("No user found...")
        }

        const isValid = await verifyPassword(credentials.password, user.password)

        if (!isValid) {
          client.close()
          throw new Error("Could not log you in.")
        }

        // if we return an object inside of authorize
        // we let next-auth know that authorization succeeded
        // encoded into token

        client.close()
        // return { email: user.email }
        return { username: user.username, email: user.email }
      }
    })
  ]
})
