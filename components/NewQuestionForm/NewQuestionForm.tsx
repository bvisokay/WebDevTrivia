import React, { useRef, useState, useEffect } from "react"
import { Wrapper } from "./NewQFormStyles"
import { SectionTitle, FormControl, SectionNarrow } from "../../styles/GlobalComponents"
import { BtnTertiary } from "../../styles/GlobalComponents/Button"

export type Question = {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

const NewQuestionForm: React.FC = () => {
  const categoryInputRef = useRef<HTMLSelectElement>(null)
  /* const typeInputRef = useRef<HTMLInputElement>(null) */
  /* const difficultyInputRef = useRef<HTMLInputElement>(null) */
  const questionInputRef = useRef<HTMLTextAreaElement>(null)
  const correctAnswerInputRef = useRef<HTMLInputElement>(null)
  const incorrectAnswer1InputRef = useRef<HTMLInputElement>(null)
  const incorrectAnswer2InputRef = useRef<HTMLInputElement>(null)
  const incorrectAnswer3InputRef = useRef<HTMLInputElement>(null)

  const [newCategoryOpen, setIsNewCategoryOpen] = useState(false)

  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")

  // get existing categories on render inside of useEffect
  useEffect(() => {
    setIsCategoriesLoading(true)
    //async function called immediatly after to avoid useEffect being async
    const getCategoriesOnLoad = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        setCategories(data)
        setIsCategoriesLoading(false)
      } catch (error) {
        throw new Error()
      }
    }
    getCategoriesOnLoad()
    // teardown function goes here
  }, [])

  // define validation logic

  function validateQuestion() {
    console.log("Validate function ran.")
  }

  /*   function newCategory() {
    setIsNewCategoryOpen(true)
  } */

  function newQuestionHandler(e: React.FormEvent) {
    e.preventDefault()

    // fetch user input
    const enteredCategory = categoryInputRef.current!.value
    /*  const enteredType = typeInputRef.current!.value */
    const enteredType = "multiple choice"
    /* const enteredDifficulty = difficultyInputRef.current!.value */
    const enteredDifficulty = "easy"
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

    // run validation

    // client-side validation: no empty fields allowed
    if (enteredCategory === "" || enteredQuestion === "" || enteredCorrectAnswer === "" || enteredIncorrectAnswer1 === "" || enteredIncorrectAnswer2 === "" || enteredIncorrectAnswer3 === "") {
      console.log("Please complete all fields")
      return
    }

    // client-side validation: incorrect answer1, 2, or 3, cannot equal correct answer
    if (enteredCorrectAnswer === enteredIncorrectAnswer1 || enteredCorrectAnswer === enteredIncorrectAnswer2 || enteredCorrectAnswer === enteredIncorrectAnswer3) {
      console.log("Incorrect Answer Cannot Match the Correct Answer")
      return
    }

    // client-side validation: cannot contain object or array?

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
        //console.log(data)
      })

    // clear form inputs
    questionInputRef.current!.value = ""
    correctAnswerInputRef.current!.value = ""
    incorrectAnswer1InputRef.current!.value = ""
    incorrectAnswer2InputRef.current!.value = ""
    incorrectAnswer3InputRef.current!.value = ""
  }

  return (
    <SectionNarrow>
      <SectionTitle>Add New Question</SectionTitle>
      {isCategoriesLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={newQuestionHandler}>
          <FormControl>
            <label htmlFor="">Category</label>
            <select name="Category" id="category" ref={categoryInputRef} onChange={e => setSelectedCategory(e.target.value)}>
              <option value="">Make a Selection</option>
              {categories.sort().map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                )
              })}
            </select>
          </FormControl>
          {/*    <FormControl>
            {" "}
            <label htmlFor="">Type</label>
            <input aria-label="Type" type="text" ref={typeInputRef} />
          </FormControl>
          <FormControl>
            {" "}
            <label htmlFor="">Difficulty</label>
            <input aria-label="Difficulty" type="text" ref={difficultyInputRef} />
          </FormControl> */}

          <FormControl>
            <label htmlFor="">Question</label>
            <textarea aria-label="Question" ref={questionInputRef} rows={3} />
          </FormControl>
          <FormControl>
            <label htmlFor="">Correct Answer</label>
            <input aria-label="Correct Answer" type="text" ref={correctAnswerInputRef} />
          </FormControl>
          <FormControl>
            <label htmlFor="">Incorrect Answer 1</label>
            <input aria-label="Incorrect Answer 1" type="text" ref={incorrectAnswer1InputRef} />
          </FormControl>
          <FormControl>
            <label htmlFor="">Incorrect Answer 2</label>
            <input aria-label="Incorrect Answer 2" type="text" ref={incorrectAnswer2InputRef} />
          </FormControl>
          <FormControl>
            <label htmlFor="">Incorrect Answer 3</label>
            <input aria-label="Incorrect Answer 3" type="text" ref={incorrectAnswer3InputRef} />
          </FormControl>

          <BtnTertiary>Submit</BtnTertiary>
        </form>
      )}
    </SectionNarrow>
  )
}

export default NewQuestionForm
