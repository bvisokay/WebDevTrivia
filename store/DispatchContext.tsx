import { createContext } from "react"
import { ACTIONTYPES } from "../pages/_app"

const DispatchContext = createContext((() => {}) as React.Dispatch<ACTIONTYPES>)

export default DispatchContext
