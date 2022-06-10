import React, { useState, useEffect } from "react"

import { BtnSmall } from "../../styles/GlobalComponents/Button"
import { FormControl, SectionTitle } from "../../styles/GlobalComponents"

const EditQuestionModal = (props: any) => {
  console.log("Object.keys(props): ", Object.keys(props))
  console.log("props.categories: ", props.categories)

  const [newCategory, setNewCategory] = useState<string>(props.tgtQuestion.category)
  const [newQuestion, setNewQuestion] = useState<string>(props.tgtQuestion.question)
  const [newCorrectAnswer, setNewCorrectAnswer] = useState<string>(props.tgtQuestion.correct_answer)
  const [newIncorrectAnswer01, setNewIncorrectAnswer01] = useState<string>(props.tgtQuestion.incorrect_answers[0])
  const [newIncorrectAnswer02, setNewIncorrectAnswer02] = useState<string>(props.tgtQuestion.incorrect_answers[1])
  const [newIncorrectAnswer03, setNewIncorrectAnswer03] = useState<string>(props.tgtQuestion.incorrect_answers[2])

  const cancelHandler = () => {
    // Set the state back to the original
    setNewCategory(props.tgtQuestion.category.name)
    setNewQuestion(props.tgtQuestion.question)
    setNewCorrectAnswer(props.tgtQuestion.correct_answer)
    setNewIncorrectAnswer01(props.tgtQuestion.incorrect_answers[0])
    setNewIncorrectAnswer02(props.tgtQuestion.incorrect_answers[1])
    setNewIncorrectAnswer03(props.tgtQuestion.incorrect_answers[2])
    //call the cancel handler fucntion from props
    props.closeModalHandler()
  }

  const actuallyUpdateQuestionInDB = (updatedQuestion: any) => {
    // send a patch request to an api route
    //send valid data
    fetch("/api/questions", {
      method: "PATCH",
      body: JSON.stringify(updatedQuestion),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        // if the db operation is successful then update the UI
        // need to configure data.message == "success"
        if (data.message == "success") {
          const updatedQuestions = props.allQuestions.map((item: any) => {
            if (item.id == updatedQuestion._id) {
              return { ...updatedQuestion, id: updatedQuestion._id }
            } else {
              return item
            }
          })
          props.setAllQuestions([...updatedQuestions])
        }
      })
      .catch(err => console.log(err))
  }

  const editHandler = () => {
    // client side validation needed here

    // check to see if the tgtQuestion and the updatedQuestion are different
    if (newCategory !== props.tgtQuestion.category || newQuestion !== props.tgtQuestion.question || newCorrectAnswer !== props.tgtQuestion.correct_answer || newIncorrectAnswer01 !== props.tgtQuestion.incorrect_answers[0] || newIncorrectAnswer02 !== props.tgtQuestion.incorrect_answers[1] || newIncorrectAnswer03 !== props.tgtQuestion.incorrect_answers[2]) {
      //console.log("Changes Made")
      // only if there are changes made then create the new Question object you want to send to the database
      // format the updated question to prep it being sent to the database
      const formattedQuestion = { _id: props.tgtQuestion.id, category: newCategory, type: "multiple", difficulty: "easy", question: newQuestion, correct_answer: newCorrectAnswer, incorrect_answers: [newIncorrectAnswer01, newIncorrectAnswer02, newIncorrectAnswer03] }
      console.log(`formattedQuestion: ${formattedQuestion}`)
      // Call function to update the database passing it the object
      actuallyUpdateQuestionInDB(formattedQuestion)
      //close modal
      props.closeModalHandler()
    } else {
      //console.log("No Changes Made")
      props.closeModalHandler()
    }

    // could disable the confirm button unless there are changes
    // if different then update in the database with message of status results
    // if not different then just close the edit modal with nothing to change message
    // still need server-side and client-side validation
    // lookup in db with the id
    // remove old and add new or actually update?
    // findOneAndUpdate
  }

  return (
    <div className="modal">
      {/* Title Area */}
      <SectionTitle dark={true}>Edit Question</SectionTitle>
      {/* Meat and Potatoes */}
      <div>
        <FormControl>
          <label htmlFor="">Category</label>
          <select
            autoFocus
            name="Category"
            id="category"
            onChange={event => {
              setNewCategory(event.target.value)
            }}
          >
            <option value={newCategory}>{newCategory}</option>
            {props.categories
              .filter((category: any) => {
                //console.log("filter category.name: ", category.name)
                //console.log("filter props.tgtQuestion.category: ", props.tgtQuestion.category)
                return category.name !== props.tgtQuestion.category
              })
              .sort()
              .map((category: any, index: any) => {
                return (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                )
              })}
            {/*  {props.categories.sort().map((category: any, index: any) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              )
            })} */}
          </select>
        </FormControl>
        <FormControl>
          <label htmlFor="">Question</label>
          <textarea aria-label="Question" rows={3} value={newQuestion} onChange={e => setNewQuestion(e.target.value)} />
        </FormControl>
        <FormControl>
          <label htmlFor="">Correct Answer</label>
          <input aria-label="Correct Answer" type="text" value={newCorrectAnswer} onChange={e => setNewCorrectAnswer(e.target.value)} />
        </FormControl>
        <FormControl>
          <label htmlFor="">Incorrect Answer 1</label>
          <input aria-label="Incorrect Answer 1" type="text" value={newIncorrectAnswer01} onChange={e => setNewIncorrectAnswer01(e.target.value)} />
        </FormControl>
        <FormControl>
          <label htmlFor="">Incorrect Answer 2</label>
          <input aria-label="Incorrect Answer 2" type="text" value={newIncorrectAnswer02} onChange={e => setNewIncorrectAnswer02(e.target.value)} />
        </FormControl>
        <FormControl>
          <label htmlFor="">Incorrect Answer 3</label>
          <input aria-label="Incorrect Answer 3" type="text" value={newIncorrectAnswer03} onChange={e => setNewIncorrectAnswer03(e.target.value)} />
        </FormControl>
      </div>
      {/* Button Area */}
      <div>
        <BtnSmall onClick={cancelHandler}>Cancel</BtnSmall>
        <BtnSmall onClick={editHandler}>Confirm</BtnSmall>
      </div>
    </div>
  )
}

export default EditQuestionModal
