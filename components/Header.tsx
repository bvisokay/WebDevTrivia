import { useContext } from "react"
import { GlobalDispatchContext, GlobalStateContext } from "../store/GlobalContext"
import Container, { HeaderContainer } from "./HeaderStyles"
import Link from "next/link"
import { SITENAME } from "../pages/_app"
import { FaSun } from "react-icons/fa"
import { RiMoonClearLine } from "react-icons/ri"
import { GiHamburgerMenu } from "react-icons/gi"

//styles
import { breakpoints } from "../styles/breakpoints"
import styled from "styled-components"

//comps
import MainNav from "./MainNav"

const LogoText = styled.div`
  font-size: 1.25rem;
  padding: 0.5rem 0;

  @media ${breakpoints.xs} {
    font-size: 1.75rem;
  }
`

const Header: React.FC = () => {
  const appState = useContext(GlobalStateContext)
  const appDispatch = useContext(GlobalDispatchContext)

  return (
    <HeaderContainer>
      <Container>
        {/* // need a function to manually reset the game state app */}
        <Link href="/">
          <a onClick={() => appDispatch({ type: "gameReset" })}>
            <LogoText>{SITENAME}</LogoText>
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
