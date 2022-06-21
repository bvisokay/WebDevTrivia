//import { ObjectId } from "mongodb"

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

export type OptionsModalProps = {
  /* 
  Text inside a comment
  */
  /* setSelectedDifficulty: (value: string) => void */
  saveSettingsHandler: (e: React.FormEvent) => void
  closeSettingsHandler: () => void
}

export type Question = {
  /* authorId: ObjectId() */
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
  /* createdDate: Date */
}

export type QuestionsState = Question & {
  answers: string[]
}

export interface RegAttemptTypes {
  email: string
  password: string
}
