import { createContext } from "react"

const StateContext = createContext({ loggedIn: false, flashMessages: [] })

export default StateContext
