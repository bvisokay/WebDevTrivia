import { ObjectId } from "mongodb"

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

export type CategoryObjectType = {
  name: string
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

export type QuestionDoc = {
  _id: ObjectId
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}
export type QuestionOnClientTypes = {
  id: string
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type QuestionsState = Question & {
  answers: string[]
}

export interface RegAttemptTypes {
  email: string
  password: string
}

export interface ResponseType {
  message: string
  data?: string
  errors?: string | string[]
}
