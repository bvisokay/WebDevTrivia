//import { Question } from "../pages"

import { ImportedAndSetQuestionType } from "./types"

export function validateNewQs(newQArray: any[]) {
  for (let i = 0; i < newQArray.length; i++) {
    //console.log("hello")

    // need to make sure type exists

    // server-side validation to prevent empty fields
    if (newQArray[i].category == "" || newQArray[i].type == "" || newQArray[i].difficulty == "" || newQArray[i].question == "" || newQArray[i].correct_answer == "" || newQArray[i].incorrect_answers[0] == "" || newQArray[i].incorrect_answers[1] == "" || newQArray[i].incorrect_answers[2] == "") {
      return { pass: false, message: "No fields may be left empty" }
    }

    // server-side validation to prevent correct answer matching incorrect answer
    if (newQArray[i].correct_answer == newQArray[i].incorrect_answers[0] || newQArray[i].correct_answer == newQArray[i].incorrect_answers[1] || newQArray[i].correct_answer == newQArray[i].incorrect_answers[2]) {
      return { pass: false, message: "Correct answer cannot match incorrect answer" }
    }

    // passed all validation checks
    return { pass: true, message: "cleared validation" }
  } // end for loop
} // end validateNewQs

export function validateQuestionsArray(questionArray: any[]) {
  console.log("Validation Input: ", questionArray)
  let errors: string[] = []
  // const trimmedCategory = state.name.value.trim().replace(/ /g, "-")
  questionArray.map((question: any) => {
    // Need a type guard here to only allow strings

    if (question.type !== "multiple") {
      question.type = "multiple"
    }

    if (question.difficulty !== "easy") {
      question.difficulty = "easy"
    }

    // prevent empty fields
    if (question.category === "" || question.type === "" || question.difficulty === "" || question.question === "" || question.correct_answer === "" || question.incorrect_answers[0] === "" || question.incorrect_answers[1] === "" || question.incorrect_answers[2] === "") {
      errors.push("No fields may be left empty")
    }

    // prevent correct answer matching incorrect answer
    if (question.correct_answer === question.incorrect_answers[0] || question.correct_answer === question.incorrect_answers[1] || question.correct_answer === question.incorrect_answers[2]) {
      //throw { message: "error", errors: "Correct answer cannot match incorrect answer" }
      errors.push("Correct answer cannot match incorrect answer")
    }

    // prevent the same incorrect answer
    if (question.incorrect_answers[0] === question.incorrect_answers[1] || question.incorrect_answers[0] === question.incorrect_answers[2] || question.incorrect_answers[1] === question.incorrect_answers[2]) {
      //throw { message: "error", errors: "Can not have the same incorrect answer" }
      errors.push("Can not have the same incorrect answer")
    }
  })

  //console.log("questionArray", questionArray)
  if (errors.length) {
    return { message: "error", errors: [...errors] }
  } else {
    return { message: "success", data: questionArray }
  }
} // end validateQuestionsArray

export function clientValidateQuestionsArray(questionArray: any[]) {
  //console.log("Validation Input: ", questionArray)
  let errors
  // const trimmedCategory = state.name.value.trim().replace(/ /g, "-")
  questionArray.map((question: any) => {
    // Need a type guard here to only allow strings

    // prevent empty fields
    if (question.category === "" || question.type === "" || question.difficulty === "" || question.question === "" || question.correct_answer === "" || question.incorrect_answers[0] === "" || question.incorrect_answers[1] === "" || question.incorrect_answers[2] === "") {
      throw { message: "error", errors: "No fields may be left empty" }
    }

    // prevent correct answer matching incorrect answer
    if (question.correct_answer === question.incorrect_answers[0] || question.correct_answer === question.incorrect_answers[1] || question.correct_answer === question.incorrect_answers[2]) {
      throw { message: "error", errors: "Correct answer cannot match incorrect answer" }
    }

    // prevent the same incorrect answer
    if (question.incorrect_answers[0] === question.incorrect_answers[1] || question.incorrect_answers[0] === question.incorrect_answers[2] || question.incorrect_answers[1] === question.incorrect_answers[2]) {
      throw { message: "error", errors: "Can not have the same incorrect answer" }
    }
  })

  //console.log("questionArray", questionArray)
  return { message: "success", data: questionArray }
} // end validateQuestionsArray

export const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5)
}
