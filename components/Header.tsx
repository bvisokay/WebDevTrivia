import { useContext } from "react"
import { GlobalStateContext } from "../store/GlobalContext"
import Container, { HeaderContainer } from "./HeaderStyles"
import { SITENAME } from "../pages/_app"

//comps
import LogInOutBtns from "./LogInOutBtns"

const Header: React.FC = () => {
  const appState = useContext(GlobalStateContext)

  return (
    <HeaderContainer>
      <Container>
        <h2>{SITENAME}</h2>
        <p>{appState.loggedIn ? "Logged In" : "Logged Out"}</p>
        <LogInOutBtns />
      </Container>
    </HeaderContainer>
  )
}

export default Header
