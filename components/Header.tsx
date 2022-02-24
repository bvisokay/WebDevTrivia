import { useContext } from "react"
import { GlobalStateContext } from "../store/GlobalContext"
import Container, { HeaderContainer } from "./HeaderStyles"
import Link from "next/link"
import { SITENAME } from "../pages/_app"
import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"
import { FaSun } from "react-icons/fa"
import { RiMoonClearLine } from "react-icons/ri"
import { GiHamburgerMenu } from "react-icons/gi"

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

  return (
    <HeaderContainer>
      <Container>
        <Link href="/">
          <LogoText>
            <a>{SITENAME}</a>
          </LogoText>
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
