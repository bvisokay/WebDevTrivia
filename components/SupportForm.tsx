import { useRef, useContext } from "react"
import { GlobalDispatchContext } from "../store/GlobalContext"
import { FormControl, SectionNarrow } from "../styles/GlobalComponents"
import { BtnPrimary } from "../styles/GlobalComponents/Button"

const SupportForm = () => {
  const appDispatch = useContext(GlobalDispatchContext)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    const enteredNameInput = nameInputRef.current!.value
    const enteredEmailInput = emailInputRef.current!.value
    const enteredMessageInput = messageInputRef.current!.value
    const message = {
      name: enteredNameInput,
      email: enteredEmailInput,
      meesage: enteredMessageInput
    }
    console.log("message: ", message)
    // simple client side validation with useReducer?

    // end simple client side validation

    //send request to /api/support

    // if (!response === "success")
    // {appDispatch({type: "flashMessages", value: "Message sent"})}
    // {appDispatch({type: "clearFields"})}

    // if (!response === "success") {appDispatch({type: "flashMessages", value: "Message not sent"})}
  }

  return (
    <SectionNarrow>
      <form onSubmit={submitHandler}>
        <FormControl light={true}>
          <label htmlFor="name">Name</label>
          <input autoFocus aria-label="Name" ref={nameInputRef} />
        </FormControl>
        <FormControl light={true}>
          <label htmlFor="email">Email</label>
          <input aria-label="Email" ref={emailInputRef} />
        </FormControl>
        <FormControl light={true}>
          <label htmlFor="message">Your Message</label>
          <textarea aria-label="Message" rows={8} ref={messageInputRef} />
        </FormControl>
        <BtnPrimary>Submit</BtnPrimary>
      </form>
    </SectionNarrow>
  )
}

export default SupportForm
