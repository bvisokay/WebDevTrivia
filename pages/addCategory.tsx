import { getSession } from "next-auth/react"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
// comps
import NewCategoryForm from "../components/NewCategoryForm/NewCategoryForm"
import { SectionNarrow } from "../styles/GlobalComponents"
import Link from "next/link"

const AddCategory = () => {
  // redirect away if not logged in
  return (
    <SectionNarrow>
      <div style={{ padding: "1rem 1rem", alignItems: "start" }}>
        <Link href="/manage"> &#8592; Back to Manage</Link>
      </div>
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
