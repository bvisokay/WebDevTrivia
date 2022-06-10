import { route } from "next/dist/server/router"
import { useRouter } from "next/router"
import React, { useEffect, useContext } from "react"
import { useImmerReducer } from "use-immer"
import { GlobalDispatchContext } from "../../store/GlobalContext"

//styles
import { SectionNarrow, SectionTitle, FormControl } from "../../styles/GlobalComponents"
import { BtnTertiary } from "../../styles/GlobalComponents/Button"

const NewQuestionForm: React.FC = () => {
  const appDispatch = useContext(GlobalDispatchContext)
  const router = useRouter()

  const originalState = {
    name: {
      value: "",
      hasErrors: false,
      message: ""
    },
    isSaving: false, // to gray out button while processing
    sendCount: 0
  }

  function ourReducer(draft: any, action: any) {
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

  const [state, dispatch] = useImmerReducer(ourReducer, originalState)

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: "saveRequestStarted" })
      let controller = new AbortController()
      const addCat = async () => {
        try {
          // Trim and replace with dash, category ends up in url
          const trimmedCategory = state.name.value.trim().replace(/ /g, "-")
          const response = await fetch("/api/categories", {
            method: "POST",
            body: JSON.stringify(trimmedCategory),
            headers: {
              "Content-Type": "application/json"
            },
            signal: controller.signal
          })
          const data = await response.json()
          console.log(`data: ${data}`)
          dispatch({ type: "saveRequestFinished" })
          //dispatch({ type: "clearField" })
          appDispatch({ type: "flashMessage", value: "Category Added" })
          router.push("/manage")
        } catch (e) {
          console.log("There was a problem or the request was cancelled")
          // handle fetch error
        }
      }
      addCat()
      return () => controller?.abort()
    } // close if state.sendCount
  }, [state.sendCount])

  function newCategoryHandler(e: React.FormEvent) {
    e.preventDefault()
    dispatch({ type: "nameRules", value: state.name.value })
    dispatch({ type: "submitRequest" })
  }

  return (
    <SectionNarrow>
      <SectionTitle>Add New Category</SectionTitle>
      <form onSubmit={newCategoryHandler}>
        <FormControl light={true}>
          <label htmlFor="category-name">Category</label>
          <input autoFocus aria-label="Category" type="text" value={state.name.value} onChange={e => dispatch({ type: "nameChange", value: e.target.value })} />
          {state.name.hasErrors && <div className="liveValidateMessage">{state.name.message}</div>}
        </FormControl>
        <BtnTertiary type="submit" disabled={state.isSaving}>
          {state.isSaving ? "Saving..." : "Add"}
        </BtnTertiary>
      </form>
    </SectionNarrow>
  )
}

export default NewQuestionForm
