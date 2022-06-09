//import { Question } from "../pages"

export async function validateNewQs(newQArray: any[]) {
  for (let i = 0; i < newQArray.length; i++) {
    //console.log("hello")

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

export const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5)
}
