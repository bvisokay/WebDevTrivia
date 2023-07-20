import Import from "../components/Import"
import { getSession } from "next-auth/react"
import { GetServerSidePropsContext } from "next"

const ImportPage = () => {
  return <Import />
}
export default ImportPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
    props: {
      session
    }
  }
}
