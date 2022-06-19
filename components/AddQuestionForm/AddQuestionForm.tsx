import React, { useState, useEffect, useContext } from "react"
import { useImmerReducer } from "use-immer"
import { GlobalDispatchContext } from "../../store/GlobalContext"
import { useRouter } from "next/router"

// styles
import { CSSTransition } from "react-transition-group"
import { SectionTitle, FormControl, SectionNarrow } from "../../styles/GlobalComponents"
import { BtnPrimary } from "../../styles/GlobalComponents/Button"

// Parent component is "pages/addQ"
// The page guard is server side in parent component
// The parent comp pre-fetches categories in GSSP
// This comp needs a button to open simple modal to add category?

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
function ourReducer(draft: any, action: any) {
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
      if (draft.question.value.length > 140) {
        draft.question.hasErrors = true
        draft.question.message = "Field cannot exceed 140 characters."
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
      console.log("clearFields ran")
      draft.question.value = ""
      draft.correctAnswer.value = ""
      draft.incorrectAnswer1.value = ""
      draft.incorrectAnswer2.value = ""
      draft.incorrectAnswer3.value = ""

      return
  }
}

// Main Componemt Function
const AddQuestionForm = (props: any) => {
  const appDispatch = useContext(GlobalDispatchContext)
  const router = useRouter()

  // Receive categories as props from parent component via GSSP
  const [categories, setCategories] = useState([])

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
      const saveNewQ = async (newQuestionArr: any) => {
        try {
          const response = await fetch("/api/questions", {
            method: "POST",
            body: JSON.stringify(newQuestionArr),
            headers: {
              "Content-Type": "application/json"
            }
          })
          const data = await response.json()
          dispatch({ type: "saveRequestFinished" })
          if (data.message == "success") {
            //console.log("New question was added")
            //dispatch({ type: "clearFields" })
            appDispatch({ type: "flashMessage", value: "New Question Added" })
            router.push("/manage")
          }
        } catch (e) {
          console.log("New question could not be added")
        }
      }
      saveNewQ(newQ)
      // teardown function needed here
    }
  }, [state.submitCount, dispatch, appDispatch, router, state.correctAnswer.value, state.incorrectAnswer1.value, state.incorrectAnswer2.value, state.incorrectAnswer3.value, state.question.value, state.category.value])

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

  return (
    <SectionNarrow>
      <SectionTitle>Add New Question</SectionTitle>
      <form onSubmit={newQuestionHandler}>
        <FormControl light={true}>
          <label htmlFor="">Category</label>
          <select
            onChange={e => {
              dispatch({ type: "categoryImmediately", value: e.target.value })
            }}
            name="category"
            id="category"
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
          <CSSTransition in={state.category.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="liveValidateMessage">{state.category.message}</div>
          </CSSTransition>
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
          <CSSTransition in={state.question.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="liveValidateMessage">{state.question.message}</div>
          </CSSTransition>
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
          <CSSTransition in={state.correctAnswer.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="liveValidateMessage">{state.correctAnswer.message}</div>
          </CSSTransition>
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
          <CSSTransition in={state.incorrectAnswer1.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="liveValidateMessage">{state.incorrectAnswer1.message}</div>
          </CSSTransition>
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
          <CSSTransition in={state.incorrectAnswer2.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="liveValidateMessage">{state.incorrectAnswer2.message}</div>
          </CSSTransition>
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

          <CSSTransition in={state.incorrectAnswer3.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
            <div className="liveValidateMessage">{state.incorrectAnswer3.message}</div>
          </CSSTransition>
        </FormControl>
        <BtnPrimary disabled={state.isSaving}>{state.isSaving ? "Saving..." : "Submit"}</BtnPrimary>
      </form>
    </SectionNarrow>
  )
}

export default AddQuestionForm
