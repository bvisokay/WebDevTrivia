import React, { createContext } from "react"
import { useImmerReducer } from "use-immer"

export const GlobalDispatchContext = createContext((() => {}) as React.Dispatch<GlobalActionTypes>)

export const GlobalStateContext = createContext({
  gameOver: true,
  loggedIn: false,
  flashMessages: [] as any,
  language: "",
  theme: ""
})

type GlobalActionTypes = { type: "gameOver"; value: boolean } | { type: "login" } | { type: "logout" } | { type: "flashMessage"; value: string } | { type: "setEnglish" } | { type: "setSpanish" } | { type: "setLatin" } | { type: "setLightTheme" } | { type: "setDarkTheme" }

export const GlobalContextProvider: React.FC = props => {
  const initialState = {
    gameOver: true,
    loggedIn: false,
    flashMessages: [] as any,
    language: "english",
    theme: "dark"
  }

  function ourReducer(draft: typeof initialState, action: GlobalActionTypes): void {
    switch (action.type) {
      case "gameOver":
        draft.gameOver = action.value
      case "login":
        draft.loggedIn = true
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
      case "setEnglish":
        draft.language = "english"
        return
      case "setSpanish":
        draft.language = "spanish"
        return
      case "setLatin":
        draft.language = "latin"
        return
      case "setLightTheme":
        draft.theme = "light"
        return
      case "setDarkTheme":
        draft.theme = "dark"
        return
      default:
        throw new Error("Bad action")
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>{props.children}</GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}
