import type { NextPage } from "next"

//comps
import Header from "../components/Header"
import Main from "../components/Main"
import Welcome from "../components/Welcome"
import Footer from "../components/Footer"

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Main>
        <Welcome />
      </Main>
      <Footer />
    </>
  )
}

export default Home
