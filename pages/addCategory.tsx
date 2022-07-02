import { getSession } from "next-auth/client"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
// comps
import NewCategoryForm from "../components/NewCategoryForm/NewCategoryForm"
import { SectionNarrow } from "../styles/GlobalComponents"

const AddCategory = () => {
  // redirect away if not logged in
  return (
    <SectionNarrow>
      <NewCategoryForm />
    </SectionNarrow>
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

export default AddCategory
