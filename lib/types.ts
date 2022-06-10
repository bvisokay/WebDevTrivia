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
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export type QuestionsState = Question & {
  answers: string[]
}
