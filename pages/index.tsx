import type { NextPage } from "next"
import { useContext } from "react"

//context
import { GlobalDispatchContext } from "../store/GlobalContext"

//comps
import Search from "../components/Search"
import Header from "../components/Header"
import LanguagePreference from "../components/Language"
import LanguageBtn from "../components/LanguageBtn"

const Home: NextPage = () => {
  const appDispatch = useContext(GlobalDispatchContext)

  return (
    <>
      <Header />
      <main>
        <p>Main Container</p>
        {/* <Search /> */}
        <button
          onClick={() => {
            appDispatch({ type: "login" })
          }}
        >
          LogIn
        </button>
        <button
          onClick={() => {
            appDispatch({ type: "logout" })
          }}
        >
          LogOut
        </button>
        <br />
        <hr />
        <br />
        <LanguagePreference />
        <LanguageBtn />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default Home
