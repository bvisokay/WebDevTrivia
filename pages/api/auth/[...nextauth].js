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
        try {
          const client = await connectToDatabase()
          const usersCollection = client.db().collection("users")
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const user = await usersCollection.findOne({ email: credentials.email })
          if (!user) {
            // when you throw an error inside of authorize
            // authorize will reject the promise it generates
            void client.close()
            throw new Error("No user found")
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const isValid = await verifyPassword(credentials.password, user.password)
          if (!isValid) {
            void client.close()
            throw new Error("Incorrect username/password")
          }
          //
          // returning object inside of authorize let NextAuth know auth succeeded
          //
          // this is what gets encoded in the token
          //
          // don't send entire user obj to avoid sending pw
          //
          // close db before return
          //
          void client.close()
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          return { username: user.username, email: user.email }
        } catch (err) {
          throw { message: "Error attempting authorization", errors: err }
        }
      } // end authorize
    }) // end Providers.Credentials
  ] // end providers key
}) // end NextAuth()
