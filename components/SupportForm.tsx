import { useContext, useEffect } from "react"
import { GlobalDispatchContext } from "../store/GlobalContext"
import { useImmerReducer } from "use-immer"
import { useRouter } from "next/router"

// styles
import { FormControl, SectionNarrow, LiveValidateMessage } from "../styles/GlobalComponents"
import { BtnPrimary } from "../styles/GlobalComponents/Button"

type SupportFormActionTypes =
  | { type: "clearFields" } //
  | { type: "nameCheck"; value: string } //
  | { type: "nameAfterDelay"; value?: string } //
  | { type: "emailCheck"; value: string } //
  | { type: "emailAfterDelay"; value?: string } //
  | { type: "messageCheck"; value: string } //
  | { type: "saveRequestStarted" } //
  | { type: "saveRequestFinished" } //
  | { type: "submitRequest" }

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

  function supportReducer(draft: InitialStateType, action: SupportFormActionTypes) {
    switch (action.type) {
      case "nameCheck":
        draft.name.hasErrors = false
        draft.name.value = action.value

        if (draft.name.value.length > 50) {
          draft.name.hasErrors = true
          draft.name.message = "Enter a shorter name"
        }
        return
      case "nameAfterDelay":
        draft.email.hasErrors = false
        if (draft.name.value.length < 2) {
          draft.name.hasErrors = true
          draft.name.message = "Enter a longer name"
        }
        return
      case "emailCheck":
        draft.email.hasErrors = false
        draft.email.value = action.value
        if (draft.email.value.length > 100) {
          draft.email.hasErrors = true
          draft.email.message = "Enter a shorter email"
        }
        return
      case "emailAfterDelay":
        draft.email.hasErrors = false
        if (!/^\S+@\S+$/.test(draft.email.value)) {
          draft.email.hasErrors = true
          draft.email.message = "You must provide a valid email address"
        }
        return
      case "messageCheck":
        draft.message.hasErrors = false
        draft.message.value = action.value

        if (draft.message.value.length > 255) {
          draft.message.hasErrors = true
          draft.message.message = "Enter a shorter message"
        }
        return
      case "submitRequest":
        if (draft.name.value === "") {
          draft.name.hasErrors = true
          draft.name.message = "Enter a name"
        }
        if (draft.email.value === "") {
          draft.email.hasErrors = true
          draft.email.message = "Enter an email"
        }
        if (draft.message.value === "") {
          draft.message.hasErrors = true
          draft.message.message = "Enter a message"
        }
        if (!draft.name.hasErrors && !draft.email.hasErrors && !draft.message.hasErrors) {
          draft.sendCount++
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

  // username validation after delay
  useEffect(() => {
    if (state.name.value) {
      const delay = setTimeout(() => dispatch({ type: "nameAfterDelay" }), 800)
      return () => clearTimeout(delay)
    }
    //eslint-disable-next-line
  }, [state.name.value])

  // email validation after delay
  useEffect(() => {
    if (state.email.value) {
      const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 800)
      return () => clearTimeout(delay)
    }
    //eslint-disable-next-line
  }, [state.email.value])

  interface SupportResponseType {
    message: string
    errors?: string
  }

  async function fetchSupportResults(signal: AbortSignal) {
    try {
      const response = await fetch("/api/support", {
        signal: signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: state.name.value,
          email: state.email.value,
          message: state.message.value
        })
      })

      const responseData = (await response.json()) as SupportResponseType
      if (responseData.message !== "success") {
        appDispatch({ type: "flashMessage", value: `${responseData.errors ? responseData.errors : "Message could not be sent"}` })
        return
      }
      if (responseData.message === "success") {
        appDispatch({ type: "flashMessage", value: "Your message has been sent" })
        dispatch({ type: "clearFields" })
        void router.push("/")
        return
      }
    } catch (err) {
      appDispatch({ type: "flashMessage", value: "There was a problem" })
      console.warn("Error caught: ", err)
      throw { message: "error", errors: err }
    }
  }

  useEffect(() => {
    if (state.sendCount) {
      const controller = new AbortController()
      const signal = controller.signal
      fetchSupportResults(signal)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      return () => controller.abort()
    }
  }, [state.sendCount])

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
          <input id="name" autoFocus aria-label="Name" type="text" value={state.name.value} onChange={e => dispatch({ type: "nameCheck", value: e.target.value })} />
          {state.name.hasErrors && <LiveValidateMessage>{state.name.message}</LiveValidateMessage>}
        </FormControl>
        <FormControl light={true}>
          <label htmlFor="email">Email</label>
          <input id="email" aria-label="Email" type="text" value={state.email.value} onChange={e => dispatch({ type: "emailCheck", value: e.target.value })} />
          {state.email.hasErrors && <LiveValidateMessage>{state.email.message}</LiveValidateMessage>}
        </FormControl>
        <FormControl light={true}>
          <label htmlFor="message">Your Message</label>
          <textarea id="message" aria-label="Message" rows={8} value={state.message.value} onChange={e => dispatch({ type: "messageCheck", value: e.target.value })} />
          {state.message.hasErrors && <LiveValidateMessage>{state.message.message}</LiveValidateMessage>}
        </FormControl>
        <BtnPrimary>Submit</BtnPrimary>
      </form>
    </SectionNarrow>
  )
}

export default SupportForm
