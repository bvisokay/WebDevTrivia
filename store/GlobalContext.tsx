import React, { createContext } from "react"
import { useImmerReducer } from "use-immer"

export const defaultTotalQuestions = 5

export const GlobalDispatchContext = createContext({} as React.Dispatch<GlobalActionTypes>)

export const GlobalStateContext = createContext({
  selectedCategory: "",
  selectedTotalQs: defaultTotalQuestions,
  gameOver: true,
  loggedIn: false,
  flashMessages: [] as string[]
})

type GlobalActionTypes = { type: "gameReset" } | { type: "setSelectedCategory"; value: string } | { type: "setSelectedTotalQs"; value: number } | { type: "gameOver"; value: boolean } | { type: "login" } | { type: "logout" } | { type: "flashMessage"; value: string | string[] } | { type: "clearFlashMessages" } | { type: "removeFlashMessage"; value: string }

export const GlobalContextProvider: React.FC = props => {
  const initialState = {
    selectedCategory: "all",
    selectedTotalQs: defaultTotalQuestions,
    gameOver: true,
    loggedIn: false,
    flashMessages: [] as string[]
  }

  function ourReducer(draft: typeof initialState, action: GlobalActionTypes): void {
    switch (action.type) {
      case "gameReset":
        draft.gameOver = true
        draft.selectedTotalQs = defaultTotalQuestions
        draft.selectedCategory = "all"
        return
      case "setSelectedCategory":
        draft.selectedCategory = action.value
        return
      case "setSelectedTotalQs":
        draft.selectedTotalQs = action.value
        return
      case "gameOver":
        draft.gameOver = action.value
        return
      case "login":
        draft.loggedIn = true
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        if (typeof action.value === "string") {
          draft.flashMessages.push(action.value)
        }
        if (Array.isArray(action.value)) {
          draft.flashMessages = [...draft.flashMessages, ...action.value]
        }
        return
      case "clearFlashMessages":
        draft.flashMessages = []
        return
      case "removeFlashMessage":
        draft.flashMessages = draft.flashMessages.filter(item => {
          if (item !== action.value) return item
        })
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
