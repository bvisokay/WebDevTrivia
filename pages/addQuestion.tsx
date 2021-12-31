import { useState, useEffect } from "react"
import { getSession } from "next-auth/client"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
// comps
import NewQuestionForm from "../components/NewQuestionForm/NewQuestionForm"

const addQuestion = () => {
  // redirect away if not logged in
  return (
    <div>
      <NewQuestionForm />
    </div>
  )
}

// redirect away if not logged in - server-side page guard
export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}

export default addQuestion
