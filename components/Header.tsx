import { useContext } from "react"
import { GlobalStateContext } from "../store/GlobalContext"
import Container, { HeaderContainer } from "./HeaderStyles"
import Link from "next/link"
import { SITENAME } from "../pages/_app"
import styled from "styled-components"

//comps
import MainNav from "./MainNav"

const LogoText = styled.div`
  font-size: 1.75rem;
  padding: 0.5rem 0;
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
      </Container>
    </HeaderContainer>
  )
}

export default Header
