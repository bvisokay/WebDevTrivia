import type { Question } from "../lib/types"

export const randomSetOfQuestions: Question[] = [
  { category: "javascript-basics", type: "multiple", difficulty: "easy", question: "JS function that can be used to URL encode a string?", correct_answer: "encodeURIComponent()", incorrect_answers: ["rawurlencode()", "Server.URLEncode()", "URIEncode()"] },
  { category: "javascript-basics", type: "multiple", difficulty: "easy", question: 'Which invocation pattern uses the "new" keyword?', correct_answer: "constructor", incorrect_answers: ["method", "function", "apply"] },
  { category: "git", type: "multiple", difficulty: "easy", question: "Un-stage files from the command line with what command?", correct_answer: "git reset", incorrect_answers: ["git undo", "git revert", "git uncommit"] },
  { category: "css", type: "multiple", difficulty: "easy", question: "How to prevent a list item with two words not wrap onto second line?", correct_answer: "white-space: nowrap;", incorrect_answers: ["white-space: no-wrap;", "flex-wrap: nowrap", "flex-wrap: no-wrap;"] },
  { category: "javascript-basics", type: "multiple", difficulty: "easy", question: "This method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.", correct_answer: "requestAnimationFrame", incorrect_answers: ["getContext()", "setInterval()", "clearTimeout()"] }
]
