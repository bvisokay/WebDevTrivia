import { useContext } from "react"
import { GlobalStateContext } from "../store/GlobalContext"
import { GlobalDispatchContext } from "../store/GlobalContext"

const Header = () => {
  const appState = useContext(GlobalStateContext)
  const appDispatch = useContext(GlobalDispatchContext)

  return (
    <header>
      <h2>Header</h2>
      <br />
      <p>{appState.loggedIn ? "Logged In" : "Logged Out"}</p>
    </header>
  )
}

export default Header
