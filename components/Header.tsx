import { useContext } from "react"
import { GlobalStateContext } from "../store/GlobalContext"
import Container, { HeaderContainer } from "./HeaderStyles"
import { SITENAME } from "../pages/_app"
import Link from "next/link"

//comps
import LogInOutBtns from "./LogInOutBtns"
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
