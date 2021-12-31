import { useRef } from "react"
import styled from "styled-components"

const Wrapper = styled.section`
  max-width: 90%;
  margin: 3rem auto;

  label {
    font-weight: bold;
  }

  input {
    max-width: 400px;
    //min-height: 200px;
  }
`

const SupportForm = () => {
  const messageInputRef = useRef<HTMLInputElement>(null)

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    const enteredMessageInput = messageInputRef.current!.value
    alert("Sending Feedback Now: " + enteredMessageInput)
  }

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="">Your Message</label>
          <input aria-label="Message" type="textarea" ref={messageInputRef} />
        </div>
        <button className="supportSubmit" type="submit">
          Submit
        </button>
      </form>
    </Wrapper>
  )
}

export default SupportForm
