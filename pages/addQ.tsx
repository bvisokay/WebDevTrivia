import { getSession } from "next-auth/client"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
// comps
import AddQuestionForm from "../components/AddQuestionForm/AddQuestionForm"
import { connectToDatabase, getCategories } from "../lib/db"
import React from "react"
import Import from "../components/Import"

interface AddQPropTypes {
  categories: string[]
}

const addQ = (props: AddQPropTypes) => {
  return (
    <div>
      <AddQuestionForm categories={props.categories} />
      <Import />
    </div>
  )
}

// redirect away if not logged in - server-side page guard
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    }
  }

  let client
  try {
    client = await connectToDatabase()
  } catch (err) {
    throw { message: "Error", errors: err }
  }

  let categories
  try {
    if (client) {
      categories = await getCategories(client)
    }
  } catch (err) {
    throw { message: "error", errors: err }
  }

  return {
    props: { session, categories }
  }
}

export default addQ
