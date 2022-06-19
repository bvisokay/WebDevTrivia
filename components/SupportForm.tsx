import { useRef } from "react"
import { FormControl, SectionNarrow } from "../styles/GlobalComponents"
import { BtnPrimary } from "../styles/GlobalComponents/Button"

const SupportForm = () => {
  const nameInputRef = useRef<HTMLInputElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    const enteredNameInput = nameInputRef.current!.value
    const enteredMessageInput = messageInputRef.current!.value
    alert("Sending Feedback Now: " + enteredNameInput + enteredMessageInput)
  }

  return (
    <SectionNarrow>
      <form onSubmit={submitHandler}>
        <FormControl light={true}>
          <label htmlFor="">Name</label>
          <input aria-label="Message" ref={nameInputRef} />
        </FormControl>
        <FormControl light={true}>
          <label htmlFor="">Your Message</label>
          <textarea aria-label="Message" rows={8} ref={messageInputRef} />
        </FormControl>
        <BtnPrimary>Submit</BtnPrimary>
      </form>
    </SectionNarrow>
  )
}

export default SupportForm
