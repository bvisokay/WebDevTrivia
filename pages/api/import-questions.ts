import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { connectToDatabase, getCategories } from "../../lib/db"
import { validateQuestionsArray } from "../../lib/util"
import { Question } from "../../lib/types"

/*
*
*
*
  type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

*
*
*/

/* TESTING API WITH JSON

[{
    "category": "hello",
    "question": "test0",
    "correct_answer": "test1",
    "incorrect_answers": ["ia1", "ia2", "ia3"]
}]


*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Not supported" })
  }
  if (req.method === "POST") {
    const MAX_QUESTIONS_ALLOWED = 100
    /* const session = await getSession({ req: req })
    if (!session) {
      res.status(401).json({ message: "Not authenticated" })
      return
    } */
    console.log("ping_01")
    // Hold off for now
    // need to extract username from the session
    // using the session username lok upc
    // later append user's _id as authorId property

    //console.log("req.body: ", req.body)
    console.log(typeof req.body)

    if (!req.body) {
      res.status(422).json({ message: "error", errors: "data error" })
      return { message: "error", errors: "data error" }
    }

    if (!(req.body instanceof Array) || !req.body.length) {
      res.status(422).json({ message: "error", errors: "error: data" })
      return { message: "error", errors: "data error" }
    }

    if (req.body.length > MAX_QUESTIONS_ALLOWED) {
      res.status(422).json({ message: "error", errors: "Maximum import limit reached" })
      return { message: "error", errors: "Maximum import limit reached" }
    }

    // extract data from the incoming request (array of objects)
    const csvData = req.body

    // and cleanup to strip bogus properties
    // append the hard-coded type and hard-coded difficulty and the date as createdDate to each question object
    let cleanedCsvData = csvData.map((item: any) => {
      return {
        category: item.category.trim().toLowerCase().replace(/ /g, "-"),
        difficulty: "easy",
        type: "multiple",
        question: item.question.trim(),
        correct_answer: item.correct_answer.trim(),
        incorrect_answers: [item.incorrect_answers[0].trim(), item.incorrect_answers[1].trim(), item.incorrect_answers[2].trim()],
        createdDate: new Date()
      }
    })

    // look up the authorId - holding off for now

    // run through server side validation function that can take array of arguments
    const valiResult = validateQuestionsArray(cleanedCsvData)

    // if validation fails then throw necessary errors
    if (valiResult && valiResult?.message !== "success") {
      return res.status(422).json(valiResult?.errors)
    }

    // if validation passes then connect to database
    if (valiResult && valiResult?.message === "success") {
      //console.log("valiResult.data: ", valiResult.data)
    }

    //console.log("valiResult", valiResult)

    // BEGIN db work
    let client
    try {
      client = await connectToDatabase()
    } catch (error) {
      return res.status(500).json({ message: "There was an error connecting to the data." })
    }

    // get categories and run check
    // need to get list of categories and check versus categories on new questions
    // if necessary add new category or throw error?
    try {
      // extract attempted categories
      const attemptedCategoryNamesSet = new Set()
      valiResult.data?.forEach(question => {
        attemptedCategoryNamesSet.add(question.category)
      })
      //console.log("attemptedCategoryNamesSet: ", attemptedCategoryNamesSet)
      // lookup existing categories
      const existingCategoryObj = await client.db().collection("categories").find().project({ _id: 0, name: 1 }).toArray()
      //console.log("existingCategoryObj", existingCategoryObj)
      const existingCategoryNamesArr = existingCategoryObj.map(category => category.name)
      //console.log("existingCategoryNamesArr: ", existingCategoryNamesArr)
      //
      const newAttemptedCategoriesSet = new Set()
      //let newAttemptedCategories: string[] = []
      attemptedCategoryNamesSet?.forEach(item => {
        if (!existingCategoryNamesArr.includes(item)) {
          newAttemptedCategoriesSet.add(item)
        }
      })
      // automatically add the categories. Best case for full restoration from data backup
      // necessary to use .length condition on a set, didn't throw error so maybe skipped
      for (const item of newAttemptedCategoriesSet) {
        //console.log(`tick: ${item}`)
        await client.db().collection("categories").insertOne({ name: item })
      }
    } catch (err) {
      void client.close()
      console.log(err)
    }

    //error handling for adding a new question
    try {
      // add to the databases using insertMany
      const insertManyResult = await client.db().collection("questions").insertMany(valiResult.data!)
      void client.close()
      return res.status(200).json({ message: "success", data: `${insertManyResult.insertedCount} of ${valiResult.data!.length} questions added` })
    } catch (err: unknown) {
      void client.close()
      // handled result (How do we know all inserts were a success?)
      res.status(500).json({ message: "error", errors: err })
    }

    // END db work
    if (client) void client.close()
    console.log("Error: End of API Route")
  } // end POST request
}
