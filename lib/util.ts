import { Question } from "./types"

export function validateCategory(catName: string) {
  const validationErrors: string[] = []
  console.log("validate category ran on server")
  console.log("catName passed in: ", catName)
  console.log("typeof catName: ", typeof catName)

  if (typeof catName !== "string") {
    validationErrors.push("invalid category name")
  }

  if (catName === "") {
    validationErrors.push("Category name must not be empty")
  }

  if (catName.length < 3) {
    validationErrors.push("Category name must be at least 3 characters")
  }

  if (catName === "{}" || catName === "[]") {
    validationErrors.push("Invalid category name")
  }

  if (validationErrors.length) {
    return { message: "error", errors: validationErrors }
  } else {
    return { message: "success" }
  }
}

// Being used server-side in pages/api/questions
// This was the original and the logic uses this "pass" key which is a boolean.
// Need to refactor to use the standard message key.
export function validateNewQs(newQArray: Question[]) {
  for (let i = 0; i < newQArray.length; i++) {
    // need to make sure type exists

    // need to set character-limit max

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

// Also being used server-side pages/api/import-questions
export function validateQuestionsArray(questionArray: Question[]) {
  const errors: string[] = []
  // const trimmedCategory = state.name.value.trim().replace(/ /g, "-")
  questionArray.map(question => {
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

  if (errors.length) {
    return { message: "error", errors: [...errors] }
  } else {
    return { message: "success", data: questionArray }
  }
} // end validateQuestionsArray

// Being used client side in components/Import
export function clientValidateQuestionsArray(questionArray: Question[]) {
  // const trimmedCategory = state.name.value.trim().replace(/ /g, "-")
  questionArray.map(question => {
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

  return { message: "success", data: questionArray }
} // end validateQuestionsArray

export const shuffleArray = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5)
}
