import { useContext } from "react"
import StateContext from "../store/StateContext"

const Header = () => {
  const appState = useContext(StateContext)

  return (
    <header>
      <h2>Header</h2>
      <br />
      <p>{appState.loggedIn ? "Logged In" : "Logged Out"}</p>
    </header>
  )
}

export default Header
