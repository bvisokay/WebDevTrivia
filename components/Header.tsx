import { useContext } from "react"
import { GlobalDispatchContext /* GlobalStateContext */ } from "../store/GlobalContext"
import Container, { HeaderContainer } from "./HeaderStyles"
import Link from "next/link"
import { SITENAME } from "../pages/_app"
//import { GiHamburgerMenu } from "react-icons/gi"

//comps
import MainNav from "./MainNav"

const Header: React.FC = () => {
  //const appState = useContext(GlobalStateContext)
  const appDispatch = useContext(GlobalDispatchContext)

  return (
    <HeaderContainer>
      <Container>
        {/* // need a function to manually reset the game state app */}
        <Link href="/">
          <a className="logoText" onClick={() => appDispatch({ type: "gameReset" })}>
            {/* <LogoText>{SITENAME}</LogoText> */}
            {SITENAME}
          </a>
        </Link>
        <MainNav />
        {/* <p>{appState.loggedIn ? "Logged In" : "Logged Out"}</p> */}
        {/*  <LogInOutBtns /> */}
        {/* <GiHamburgerMenu size={24} /> */}
      </Container>
    </HeaderContainer>
  )
}

export default Header
