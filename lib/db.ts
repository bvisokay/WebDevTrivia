import { MongoClient } from "mongodb"

export async function connectToDatabase() {
  const client = await MongoClient.connect(`${process.env.ENV_LOCAL_CONNECTION_STRING}`)

  return client
}
