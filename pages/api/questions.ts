import type { NextApiRequest, NextApiResponse } from "next"

export type Question = {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  answers: string[]
  question: string
  type: string
}

export type ErrorMessage = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Question | ErrorMessage>) {
  if (req.method === "POST") {
    const newQuestion = req.body.newQuestion
    // add validation
    if (newQuestion.category === "") {
      res.status(422).json({ message: "Invalid category. " })
    }
  }

  if (req.method === "GET") {
    // add validation
  }

  res.status(200).json({
    category: "Sports",
    correct_answer: "Dallas Cowboys",
    difficulty: "easy",
    incorrect_answers: ["New York Giants", "Washington Redskins", "Philadelphia Eagles"],
    answers: ["New York Giants", "Dallas Cowboys", "Washington Redskins", "Philadelphia Eagles"],
    question: "Which NFL team won the NFC East title in 2021?",
    type: "multiple"
  })
}
