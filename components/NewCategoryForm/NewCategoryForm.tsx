import { useRouter } from "next/router"
import React, { useEffect, useContext } from "react"
import { useImmerReducer } from "use-immer"
import { ResponseType } from "../../lib/types"
import { GlobalDispatchContext } from "../../store/GlobalContext"

//styles
import { SectionNarrow, SectionTitle, FormControl, LiveValidateMessage } from "../../styles/GlobalComponents"
import { BtnPrimary } from "../../styles/GlobalComponents/Button"

type NewCategoryActionTypes = { type: "clearField" } | { type: "nameChange"; value: string } | { type: "submitRequest" } | { type: "saveRequestStarted" } | { type: "saveRequestFinished" }

type OriginalStateTypes = {
  name: {
    value: string
    hasErrors: boolean
    message: string
  }
  isSaving: boolean
  sendCount: number
}

const originalState = {
  name: {
    value: "",
    hasErrors: false,
    message: ""
  },
  isSaving: false, // to gray out button while processing
  sendCount: 0
}

function ourReducer(draft: OriginalStateTypes, action: NewCategoryActionTypes) {
  switch (action.type) {
    case "clearField":
      draft.name.value = ""
      return
    case "nameChange":
      draft.name.hasErrors = false
      draft.name.value = action.value
      return
    case "submitRequest":
      if (draft.name.value.trim() == "") {
        draft.name.hasErrors = true
        draft.name.message = "You must provide a value."
      }
      if (!draft.name.hasErrors) {
        draft.sendCount++
      }
      return
    case "saveRequestStarted":
      draft.isSaving = true
      return
    case "saveRequestFinished":
      draft.isSaving = false
      return
  }
}

const NewCategoryForm: React.FC = () => {
  const appDispatch = useContext(GlobalDispatchContext)
  const router = useRouter()

  const [state, dispatch] = useImmerReducer(ourReducer, originalState)

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" })
      const controller = new AbortController()
      const signal = controller.signal
      const addCat = async (signal: AbortSignal) => {
        try {
          // Trim and replace with dash, category ends up in url
          const trimmedCategory = state.name.value.trim().toLowerCase().replace(/ /g, "-")
          const response = await fetch("/api/categories", {
            signal: signal,
            method: "POST",
            body: JSON.stringify(trimmedCategory),
            headers: {
              "Content-Type": "application/json"
            }
          })
          const data = (await response.json()) as ResponseType
          if (data.message !== "success") {
            appDispatch({ type: "flashMessage", value: "Category could not be added" })
            throw { message: "error", errors: "There was a problem" }
          }
          if (data.message === "success") {
            dispatch({ type: "saveRequestFinished" })
            appDispatch({ type: "flashMessage", value: "Category Added" })
            void router.push("/manage")
          }
        } catch (err) {
          console.log("err: ", err)
          appDispatch({ type: "flashMessage", value: "There was a problem or the request was cancelled" })
        }
      }
      void addCat(signal)
      return () => controller?.abort()
    } // close if state.sendCount
  }, [state.sendCount, appDispatch, router, dispatch, state.name.value])

  function newCategoryHandler(e: React.FormEvent) {
    e.preventDefault()
    dispatch({ type: "nameChange", value: state.name.value })
    dispatch({ type: "submitRequest" })
  }

  return (
    <SectionNarrow>
      <SectionTitle>Add New Category</SectionTitle>
      <form onSubmit={newCategoryHandler}>
        <FormControl light={true}>
          <label htmlFor="category-name">Category</label>
          <input autoFocus aria-label="Category" type="text" value={state.name.value} onChange={e => dispatch({ type: "nameChange", value: e.target.value })} />
          {state.name.hasErrors && <LiveValidateMessage>{state.name.message}</LiveValidateMessage>}
        </FormControl>
        <BtnPrimary type="submit" disabled={state.isSaving}>
          {state.isSaving ? "Saving..." : "Add"}
        </BtnPrimary>
      </form>
    </SectionNarrow>
  )
}

export default NewCategoryForm
