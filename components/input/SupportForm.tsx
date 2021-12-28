import { useRef } from "react"

const SupportForm = () => {
  const messageInputRef = useRef<HTMLInputElement>(null)

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    const enteredMessageInput = messageInputRef.current!.value
    alert("Sending Feedback Now: " + enteredMessageInput)
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="">Your Message</label>
        <input aria-label="Message" type="textArea" ref={messageInputRef} placeholder="Message" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default SupportForm
