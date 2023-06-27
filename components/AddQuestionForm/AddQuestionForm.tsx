import React, { useState, useEffect, useContext, useRef } from "react"
import { useImmerReducer } from "use-immer"
import { GlobalDispatchContext } from "../../store/GlobalContext"
import { useRouter } from "next/router"
import Link from "next/link"
//import NewCategoryForm from "../NewCategoryForm/NewCategoryForm"

// types
import { Question, ResponseType } from "../../lib/types"

// styles
import { SectionTitle, FormControl, SectionNarrow, LiveValidateMessage } from "../../styles/GlobalComponents"
import { BtnPrimary, BtnSmall } from "../../styles/GlobalComponents/Button"

// Parent component is "pages/addQ"
// The page guard is server side in parent component
// The parent comp pre-fetches categories in GSSP
// This comp needs a button to open simple modal to add category?

type AddQuestionActionTypes = { type: "categoryImmediately"; value: string } | { type: "questionImmediately"; value: string } | { type: "correctAnswerImmediately"; value: string } | { type: "incorrectAnswer1Immediately"; value: string } | { type: "incorrectAnswer2Immediately"; value: string } | { type: "incorrectAnswer3Immediately"; value: string } | { type: "submitForm" } | { type: "saveRequestStarted" } | { type: "saveRequestFinished" } | { type: "clearFields" }

interface InitialStateType {
  category: {
    value: string
    hasErrors: boolean
    message: string
  }
  question: {
    value: string
    hasErrors: boolean
    message: string
  }
  correctAnswer: {
    value: string
    hasErrors: boolean
    message: string
  }
  incorrectAnswer1: {
    value: string
    hasErrors: boolean
    message: string
  }
  incorrectAnswer2: {
    value: string
    hasErrors: boolean
    message: string
  }
  incorrectAnswer3: {
    value: string
    hasErrors: boolean
    message: string
  }
  submitCount: number
  isSaving: boolean
}

// Initial State for Reducer
const initialState = {
  category: {
    value: "",
    hasErrors: false,
    message: ""
  },
  question: {
    value: "",
    hasErrors: false,
    message: ""
  },
  correctAnswer: {
    value: "",
    hasErrors: false,
    message: ""
  },
  incorrectAnswer1: {
    value: "",
    hasErrors: false,
    message: ""
  },
  incorrectAnswer2: {
    value: "",
    hasErrors: false,
    message: ""
  },
  incorrectAnswer3: {
    value: "",
    hasErrors: false,
    message: ""
  },
  submitCount: 0,
  isSaving: false
}

// Reducer Function (Switch)
function ourReducer(draft: InitialStateType, action: AddQuestionActionTypes) {
  switch (action.type) {
    case "categoryImmediately":
      /* alert(action.value) */
      draft.category.hasErrors = false
      draft.category.value = action.value
      if (draft.category.value == "") {
        //alert("hello form the category case")
        draft.category.hasErrors = true
        draft.category.message = "Please select a category"
      }
      return
    case "questionImmediately":
      draft.question.hasErrors = false
      draft.question.value = action.value
      if (draft.question.value.length > 250) {
        draft.question.hasErrors = true
        draft.question.message = "Field cannot exceed 250 characters."
      }
      // cannot exceeed blank characters
      return
    case "correctAnswerImmediately":
      draft.correctAnswer.hasErrors = false
      draft.correctAnswer.value = action.value
      if (draft.correctAnswer.value.length > 50) {
        draft.correctAnswer.hasErrors = true
        draft.correctAnswer.message = "Field cannot exceed 50 characters."
      }
      return
    case "incorrectAnswer1Immediately":
      /* alert(action.value) */
      draft.incorrectAnswer1.hasErrors = false
      draft.incorrectAnswer1.value = action.value
      if (draft.incorrectAnswer1.value.length > 50) {
        draft.incorrectAnswer1.hasErrors = true
        draft.incorrectAnswer1.message = "Field cannot exceed 50 characters."
      }
      return
    case "incorrectAnswer2Immediately":
      draft.incorrectAnswer2.hasErrors = false
      draft.incorrectAnswer2.value = action.value
      if (draft.incorrectAnswer2.value.length > 50) {
        draft.incorrectAnswer2.hasErrors = true
        draft.incorrectAnswer2.message = "Field cannot exceed 50 characters."
      }
      return
    case "incorrectAnswer3Immediately":
      draft.incorrectAnswer3.hasErrors = false
      draft.incorrectAnswer3.value = action.value
      if (draft.incorrectAnswer3.value.length > 50) {
        draft.incorrectAnswer3.hasErrors = true
        draft.incorrectAnswer3.message = "Field cannot exceed 50 characters."
      }
      return
    case "submitForm":
      if (draft.category.value.trim() == "") {
        draft.category.hasErrors = true
        draft.category.message = "You must choose a category."
      }
      if (draft.question.value.trim() == "") {
        draft.question.hasErrors = true
        draft.question.message = "This field cannot be left blank."
      }
      if (draft.correctAnswer.value.trim() == "") {
        draft.correctAnswer.hasErrors = true
        draft.correctAnswer.message = "This field cannot be left blank."
      }
      if (draft.incorrectAnswer1.value.trim() == "") {
        draft.incorrectAnswer1.hasErrors = true
        draft.incorrectAnswer1.message = "This field cannot be left blank."
      }
      if (draft.incorrectAnswer2.value.trim() == "") {
        draft.incorrectAnswer2.hasErrors = true
        draft.incorrectAnswer2.message = "This field cannot be left blank"
      }
      if (draft.incorrectAnswer3.value.trim() == "") {
        draft.incorrectAnswer3.hasErrors = true
        draft.incorrectAnswer3.message = "This field cannot be left blank."
      }
      // if no fields have an error then submit the form
      if (!draft.category.hasErrors && !draft.question.hasErrors && !draft.correctAnswer.hasErrors && !draft.incorrectAnswer1.hasErrors && !draft.incorrectAnswer2.hasErrors && !draft.incorrectAnswer3.hasErrors) {
        draft.submitCount++
      }
      return
    case "saveRequestStarted":
      draft.isSaving = true
      return
    case "saveRequestFinished":
      draft.isSaving = false
      return
    case "clearFields":
      draft.question.value = ""
      draft.correctAnswer.value = ""
      draft.incorrectAnswer1.value = ""
      draft.incorrectAnswer2.value = ""
      draft.incorrectAnswer3.value = ""

      return
  }
}

interface AddQuestionFormPropTypes {
  categories: string[]
}

// Main Componemt Function
const AddQuestionForm = (props: AddQuestionFormPropTypes) => {
  const CategoryInputRef = useRef<HTMLSelectElement>(null)
  const appDispatch = useContext(GlobalDispatchContext)
  const router = useRouter()

  // Receive categories as props from parent component via GSSP
  const [categories, setCategories] = useState<string[]>([])

  // See if the user wants to add a new category
  //const [showNewCatForm, setShowNewCatForm] = useState<boolean>(false)

  // component throws error if this not in useEffect - something about infinite loop
  useEffect(() => {
    setCategories(props.categories)
  }, [props.categories])

  // useImmerReducer
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  // useEffect to submit form request
  useEffect(() => {
    // don't run when page first loads
    if (state.submitCount) {
      dispatch({ type: "saveRequestStarted" })
      // format new Q to send
      // sending inside of array
      const newQ = [
        {
          category: state.category.value,
          type: "multiple",
          difficulty: "easy",
          question: state.question.value.trim(),
          correct_answer: state.correctAnswer.value.trim(),
          incorrect_answers: [state.incorrectAnswer1.value.trim(), state.incorrectAnswer2.value.trim(), state.incorrectAnswer3.value.trim()]
        }
      ]
      const saveNewQ = async (newQuestionArr: Question[]) => {
        try {
          const response = await fetch("/api/questions", {
            method: "POST",
            body: JSON.stringify(newQuestionArr),
            headers: {
              "Content-Type": "application/json"
            }
          })
          const data = (await response.json()) as ResponseType
          dispatch({ type: "saveRequestFinished" })
          if (data.message == "success") {
            appDispatch({ type: "flashMessage", value: "New Question Added" })
            dispatch({ type: "clearFields" })
            if (CategoryInputRef && CategoryInputRef.current) {
              CategoryInputRef.current.focus()
            }
            //void router.push("/manage")
          }
        } catch (err) {
          appDispatch({ type: "flashMessage", value: "New question could not be added" })
          throw { message: "Error", errors: err }
        }
      }
      void saveNewQ(newQ)
      // teardown function needed here
    }
  }, [state.submitCount])

  // none of these values need to be unique or checked after a delay
  // sanitize before saving to the database
  // we need to trim white space
  // exclude special characters like html, objects, arrays
  // cannot be more than x characters (immediately)
  // cannot be left blank

  const newQuestionHandler = (e: React.FormEvent) => {
    e.preventDefault()
    // Call saveNewQ with client-side validated newQObj
    dispatch({ type: "submitForm" })
  }

  /*   function addCatHandler(e: React.FormEvent) {
    e.preventDefault()
    void router.push("/addCategory")
  } */

  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <Link href="/manage"> &#8592; Back to Manage</Link>
      </div>
      <SectionNarrow>
        <SectionTitle>Add New Question</SectionTitle>
        <form onSubmit={newQuestionHandler}>
          <FormControl light={true}>
            <label className="split" htmlFor="">
              Category
              <BtnSmall onClick={() => void router.push("/addCategory")} style={{ margin: "0 12px", fontSize: ".6rem" }}>
                Add Category
              </BtnSmall>
            </label>
            {/* {showNewCatForm && <NewCategoryForm />} */}
            <select
              autoFocus
              onChange={e => {
                dispatch({ type: "categoryImmediately", value: e.target.value })
              }}
              name="category"
              id="category"
              ref={CategoryInputRef}
            >
              <option value="">Make a Selection</option>

              {categories.sort().map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                )
              })}
            </select>
            {state.category.hasErrors && <LiveValidateMessage>{state.category.message}</LiveValidateMessage>}
          </FormControl>

          <FormControl light={true}>
            <label htmlFor="">Question</label>
            <textarea
              value={state.question.value}
              onChange={e => {
                dispatch({ type: "questionImmediately", value: e.target.value })
              }}
              aria-label="Question"
              name="question"
              rows={3}
              autoComplete="off"
            />
            {state.question.hasErrors && <LiveValidateMessage>{state.question.message}</LiveValidateMessage>}
          </FormControl>
          <FormControl light={true}>
            <label htmlFor="correctAnswer">Correct Answer</label>
            <input
              value={state.correctAnswer.value}
              onChange={e => {
                dispatch({ type: "correctAnswerImmediately", value: e.target.value })
              }}
              aria-label="Correct Answer"
              name="correctAnswer"
              type="text"
              autoComplete="off"
            />
            {state.correctAnswer.hasErrors && <LiveValidateMessage>{state.correctAnswer.message}</LiveValidateMessage>}
          </FormControl>
          <FormControl light={true}>
            <label htmlFor="incorrectAnswer1">Incorrect Answer 1</label>
            <input
              value={state.incorrectAnswer1.value}
              onChange={e => {
                dispatch({ type: "incorrectAnswer1Immediately", value: e.target.value })
              }}
              aria-label="incorrectAnswer1"
              name="incorrectAnswer1"
              type="text"
              autoComplete="off"
            />
            {state.incorrectAnswer1.hasErrors && <LiveValidateMessage>{state.incorrectAnswer1.message}</LiveValidateMessage>}
          </FormControl>
          <FormControl light={true}>
            <label htmlFor="">Incorrect Answer 2</label>
            <input
              value={state.incorrectAnswer2.value}
              onChange={e => {
                dispatch({ type: "incorrectAnswer2Immediately", value: e.target.value })
              }}
              aria-label="incorrectAnswer2"
              name="incorrectAnswer2"
              type="text"
              autoComplete="off"
            />
            {state.incorrectAnswer2.hasErrors && <LiveValidateMessage>{state.incorrectAnswer2.message}</LiveValidateMessage>}
          </FormControl>
          <FormControl light={true}>
            <label htmlFor="">Incorrect Answer 3</label>
            <input
              value={state.incorrectAnswer3.value}
              onChange={e => {
                dispatch({ type: "incorrectAnswer3Immediately", value: e.target.value })
              }}
              aria-label="incorrectAnswer3"
              name="incorrectAnswer3"
              type="text"
              autoComplete="off"
            />
            {state.incorrectAnswer3.hasErrors && <LiveValidateMessage>{state.incorrectAnswer3.message}</LiveValidateMessage>}
          </FormControl>
          <BtnPrimary disabled={state.isSaving}>{state.isSaving ? "Saving..." : "Submit"}</BtnPrimary>
        </form>
      </SectionNarrow>
    </>
  )
}

export default AddQuestionForm
