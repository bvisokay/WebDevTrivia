import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { connectToDatabase, getCategories, addCategoryDocument, updateCategoryDocument, updateQsWithNewCategoryName, deleteCategoryDocument } from "../../lib/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // api-route protection from non-logged in users
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    // extract data
    const categoryName = req.body as string

    let client
    //error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: "There was an error connecting to the data." })
      return
    }

    //error handling for adding a new category
    try {
      await addCategoryDocument(client, {
        name: categoryName
      })
      res.status(201).json({ message: "New category added!" })
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed." })
    }

    void client.close()
  }

  if (req.method === "GET") {
    let client
    //error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: "There was an error connecting to the data." })
      return
    }

    // error handling for getting categories
    let cleanedResults
    try {
      cleanedResults = await getCategories(client)
      res.status(200).json(cleanedResults)
    } catch (error) {
      res.status(500).json({ message: "There was an error retrieving the categories" })
    }

    void client.close()
  } // end GET request

  if (req.method === "PATCH") {
    // api-route protection from non-logged in users
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    // extract data
    interface UpdateCategoryTypes {
      oldCategoryName: string
      newCategoryName: string
    }
    const { oldCategoryName, newCategoryName } = req.body as UpdateCategoryTypes

    let client
    // error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: "There was an error connecting to the data." })
      return
    }

    //error handling for updating a category name
    try {
      await updateCategoryDocument(client, {
        oldCategoryName,
        newCategoryName
      })
      await updateQsWithNewCategoryName(client, {
        oldCategoryName,
        newCategoryName
      })
      res.status(201).json({ message: "success" })
    } catch (error) {
      res.status(500).json({ message: "Updating category name failed." })
    }

    void client.close()
  } // end PATCH request

  if (req.method === "DELETE") {
    // api-route protection from non-logged in users
    const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: "Not authenticated" })
      return
    }

    const catToDelete = req.body as string

    let client
    //error handling for connection to database
    try {
      client = await connectToDatabase()
    } catch (error) {
      res.status(500).json({ message: "There was an error connecting to the data." })
      return
    }

    //error handling for adding a new category
    try {
      const result = await deleteCategoryDocument(client, catToDelete)
      if (result) {
        res.status(201).json({ message: "success" })
      }
    } catch (error) {
      res.status(500).json({ message: "Deleting category failed." })
    }

    void client.close()
  } // end DELETE request
} // end handler function
