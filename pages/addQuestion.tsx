import { getSession } from "next-auth/client"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
// comps
import NewQuestionForm from "../components/NewQuestionForm/NewQuestionForm"

/* 



// OLD USEREF Version of adding question



*/

const addQuestion = () => {
  // redirect away if not logged in
  return (
    <div>
      <NewQuestionForm />
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
  return {
    props: { session }
  }
}

export default addQuestion
