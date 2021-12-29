import { useRef } from "react"

export type Question = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

const NewQuestionForm: React.FC = () => {
  const categoryInputRef = useRef<HTMLInputElement>(null)
  const typeInputRef = useRef<HTMLInputElement>(null)
  const difficultyInputRef = useRef<HTMLInputElement>(null)
  const questionInputRef = useRef<HTMLInputElement>(null)
  const correctAnswerInputRef = useRef<HTMLInputElement>(null)
  const incorrectAnswer1InputRef = useRef<HTMLInputElement>(null)
  const incorrectAnswer2InputRef = useRef<HTMLInputElement>(null)
  const incorrectAnswer3InputRef = useRef<HTMLInputElement>(null)

  function newQuestionHandler(e: React.FormEvent) {
    e.preventDefault()

    // fetch user input
    const enteredCategory = categoryInputRef.current!.value
    const enteredType = typeInputRef.current!.value
    const enteredDifficulty = difficultyInputRef.current!.value
    const enteredQuestion = questionInputRef.current!.value
    const enteredCorrectAnswer = correctAnswerInputRef.current!.value
    const enteredIncorrectAnswer1 = incorrectAnswer1InputRef.current!.value
    const enteredIncorrectAnswer2 = incorrectAnswer2InputRef.current!.value
    const enteredIncorrectAnswer3 = incorrectAnswer3InputRef.current!.value

    // format user input into object
    const newQuestion: Question = {
      category: enteredCategory,
      type: enteredType,
      difficulty: enteredDifficulty,
      question: enteredQuestion,
      correct_answer: enteredCorrectAnswer,
      incorrect_answers: [enteredIncorrectAnswer1, enteredIncorrectAnswer2, enteredIncorrectAnswer3]
    }

    //console.log(newQuestion)

    // add front-end validation

    //send valid data
    fetch("/api/questions", {
      method: "POST",
      body: JSON.stringify(newQuestion),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        response.json()
      })
      .then(data => {
        console.log(data)
      })
  }

  return (
    <form onSubmit={newQuestionHandler}>
      <div className="form-control">
        <label htmlFor="">Category</label>
        <input aria-label="Category" type="text" ref={categoryInputRef} placeholder="Category" />
      </div>
      <div className="form-control">
        <label htmlFor="">Type</label>
        <input aria-label="Type" type="text" ref={typeInputRef} placeholder="Type" />
      </div>
      <div className="form-control">
        <label htmlFor="">Difficulty</label>
        <input aria-label="Difficulty" type="text" ref={difficultyInputRef} placeholder="Difficulty" />
      </div>
      <div className="form-control">
        <label htmlFor="">Question</label>
        <input aria-label="Question" type="text" ref={questionInputRef} placeholder="Question" />
      </div>
      <div className="form-control">
        <label htmlFor="">Correct Answer</label>
        <input aria-label="Correct Answer" type="text" ref={correctAnswerInputRef} placeholder="Correct Answer" />
      </div>
      <div className="form-control">
        <label htmlFor="">Incorrect Answer 1</label>
        <input aria-label="Incorrect Answer 1" type="text" ref={incorrectAnswer1InputRef} placeholder="Incorrect Answer 1" />
      </div>
      <div className="form-control">
        <label htmlFor="">Incorrect Answer 2</label>
        <input aria-label="Incorrect Answer 2" type="text" ref={incorrectAnswer2InputRef} placeholder="Incorrect Answer 2" />
      </div>
      <div className="form-control">
        <label htmlFor="">Incorrect Answer 3</label>
        <input aria-label="Incorrect Answer 3" type="text" ref={incorrectAnswer3InputRef} placeholder="Incorrect Answer 3" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default NewQuestionForm
