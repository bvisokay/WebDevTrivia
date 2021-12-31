import { useContext } from "react"
import { GlobalStateContext } from "../store/GlobalContext"
import Container, { HeaderContainer } from "./HeaderStyles"
import Link from "next/link"
import { SITENAME } from "../pages/_app"

//comps

import MainNav from "./MainNav"

const Header: React.FC = () => {
  const appState = useContext(GlobalStateContext)

  return (
    <HeaderContainer>
      <Container>
        <Link href="/">
          <a>{SITENAME}</a>
        </Link>

        <MainNav />
        {/* <p>{appState.loggedIn ? "Logged In" : "Logged Out"}</p> */}
        {/*  <LogInOutBtns /> */}
      </Container>
    </HeaderContainer>
  )
}

export default Header
