import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { useState, useReducer } from "react"

// Context Files
import DispatchContext from "../store/DispatchContext"
import StateContext from "../store/StateContext"

export type ACTIONTYPES = { type: "login" } | { type: "logout" } | { type: "flashMessage"; value: any }

function MyApp({ Component, pageProps }: AppProps) {
  const initialState = {
    loggedIn: false,
    flashMessages: []
  }

  function ourReducer(state: typeof initialState, action: ACTIONTYPES): typeof initialState {
    switch (action.type) {
      case "login":
        return { loggedIn: true, flashMessages: state.flashMessages }
      case "logout":
        return { loggedIn: false, flashMessages: state.flashMessages }
      case "flashMessage":
        return { loggedIn: state.loggedIn, flashMessages: state.flashMessages.concat(action.value) }
      default:
        throw new Error("Bad action")
    }
  }

  const [state, dispatch] = useReducer(ourReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
export default MyApp
