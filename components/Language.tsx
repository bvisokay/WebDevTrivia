import { useContext } from "react"
import { GlobalStateContext } from "../store/GlobalContext"

export default function LanguagePreference() {
  const GlobalAppState = useContext(GlobalStateContext)
  return <div>Current Language is: {GlobalAppState.language}</div>
}
