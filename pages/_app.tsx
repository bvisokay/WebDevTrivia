import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { useState, useReducer } from "react"
import { useImmerReducer } from "use-immer"

// Context Files
import DispatchContext from "../store/DispatchContext"
import StateContext from "../store/StateContext"

export type ACTIONTYPES = { type: "login" } | { type: "logout" } | { type: "flashMessage"; value: string }

function MyApp({ Component, pageProps }: AppProps) {
  const initialState = {
    loggedIn: false,
    flashMessages: [] as any
  }

  function ourReducer(draft: typeof initialState, action: ACTIONTYPES): void {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
      default:
        throw new Error("Bad action")
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

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
