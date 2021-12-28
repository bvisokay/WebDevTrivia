import type { NextPage } from "next"

//comps
import Main from "../components/Main"
import Welcome from "../components/Welcome"

const Home: NextPage = () => {
  return (
    <>
      <Main>
        <Welcome />
      </Main>
    </>
  )
}

export default Home
