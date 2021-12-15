import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useContext } from "react"

//context
import DispatchContext from "../store/DispatchContext"

//comps
import Search from "../components/Search"
import Header from "../components/Header"

const Home: NextPage = () => {
  const appDispatch = useContext(DispatchContext)

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
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default Home
