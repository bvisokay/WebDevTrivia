import { useRef, useContext, useEffect } from "react"
import { GlobalDispatchContext } from "../store/GlobalContext"
import { useImmer, useImmerReducer } from "use-immer"
import { useRouter } from "next/router"

// styles
import { FormControl, SectionNarrow } from "../styles/GlobalComponents"
import { BtnPrimary } from "../styles/GlobalComponents/Button"

type SupportFormActionTypes = { type: "clearFields" } | { type: "nameCheck"; value: string } | { type: "emailCheck"; value: string } | { type: "messageCheck"; value: string } | { type: "saveRequestStarted" } | { type: "saveRequestFinished" } | { type: "submitRequest" }

interface InitialStateType {
  name: {
    value: string
    hasErrors: boolean
    message: string
  }
  email: {
    value: string
    hasErrors: boolean
    message: string
  }
  message: {
    value: string
    hasErrors: boolean
    message: string
  }
  isSaving: boolean
  sendCount: number
}

const SupportForm: React.FC = () => {
  const appDispatch = useContext(GlobalDispatchContext)
  const router = useRouter()

  const initialState = {
    name: { value: "", hasErrors: false, message: "" },
    email: { value: "", hasErrors: false, message: "" },
    message: { value: "", hasErrors: false, message: "" },
    isSaving: false,
    sendCount: 0
  }

  function supportReducer(draft: typeof initialState, action: SupportFormActionTypes) {
    switch (action.type) {
      case "nameCheck":
        draft.name.hasErrors = false
        draft.name.value = action.value
        if (draft.name.value === "") {
          draft.name.hasErrors = true
          draft.name.message = "Enter a name"
        }
        if (draft.name.value && !/^([a-zA-Z0-9]+)$/.test(draft.name.value)) {
          draft.name.hasErrors = true
          draft.name.message = "Name can only contain letters and numbers."
        }
        if (draft.name.value.length > 100) {
          draft.name.hasErrors = true
          draft.name.message = "Enter a shorter name"
        }
        return
      case "emailCheck":
        draft.email.hasErrors = false
        draft.email.value = action.value
        if (draft.email.value === "") {
          draft.email.hasErrors = true
          draft.email.message = "Enter a email"
        }
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true
          draft.email.message = "You must provide a valid email address."
        }
        return
      case "messageCheck":
        draft.message.hasErrors = false
        draft.message.value = action.value
        if (draft.message.value === "") {
          draft.message.hasErrors = true
          draft.message.message = "Enter a message"
        }
        if (draft.message.value.length > 10) {
          draft.message.hasErrors = true
          draft.message.message = "Enter a shorter message"
        }
        return
      case "submitRequest":
        if (!draft.name.hasErrors && !draft.email.hasErrors && !draft.message.hasErrors) {
          draft.sendCount++
        } else {
          appDispatch({ type: "flashMessage", value: "Could Not Submit Form" })
        }
        return
      case "saveRequestStarted":
        draft.isSaving = true
        return
      case "saveRequestFinished":
        draft.isSaving = false
        return
      case "clearFields":
        draft.name.value = ""
        draft.email.value = ""
        draft.message.value = ""
        return
    }
  }

  const [state, dispatch] = useImmerReducer(supportReducer, initialState)

  //useEffect(()=>{}, [state.sendCount])

  /* 
    //send request to /api/support

    // if (!response === "success")
    // {appDispatch({type: "flashMessages", value: "Message sent"})}
    // {appDispatch({type: "clearFields"})}

    // if (!response === "success") {appDispatch({type: "flashMessages", value: "Message not sent"})}
  */

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    dispatch({ type: "nameCheck", value: state.name.value })
    dispatch({ type: "emailCheck", value: state.email.value })
    dispatch({ type: "messageCheck", value: state.message.value })
    dispatch({ type: "submitRequest" })
  }

  return (
    <SectionNarrow>
      <form onSubmit={submitHandler}>
        <FormControl light={true}>
          <label htmlFor="name">Name</label>
          <input autoFocus aria-label="Name" type="text" value={state.name.value} onChange={e => dispatch({ type: "nameCheck", value: e.target.value })} />
        </FormControl>
        <FormControl light={true}>
          <label htmlFor="email">Email</label>
          <input aria-label="Email" type="text" value={state.email.value} onChange={e => dispatch({ type: "emailCheck", value: e.target.value })} />
        </FormControl>
        <FormControl light={true}>
          <label htmlFor="message">Your Message</label>
          <textarea aria-label="Message" rows={8} value={state.message.value} onChange={e => dispatch({ type: "messageCheck", value: e.target.value })} />
        </FormControl>
        <BtnPrimary>Submit</BtnPrimary>
      </form>
    </SectionNarrow>
  )
}

export default SupportForm
