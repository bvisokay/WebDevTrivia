import { useState, useEffect } from "react"
import { getSession } from "next-auth/client"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
// comps
import NewCategoryForm from "../components/NewCategoryForm/NewCategoryForm"

const addCategory = () => {
  // redirect away if not logged in
  return (
    <div>
      <NewCategoryForm />
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

export default addCategory
