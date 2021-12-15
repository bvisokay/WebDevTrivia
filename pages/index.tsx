import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
//comps
import Search from "../components/Search"

const Home: NextPage = () => {
  return (
    <>
      <header>Header</header>
      <main>
        <p>Main Container</p>
        <Search />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default Home
