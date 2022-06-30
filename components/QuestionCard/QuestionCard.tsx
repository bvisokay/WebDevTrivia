import { useEffect, useRef } from "react"
import { AnswerObject } from "../../lib/types"
import { Wrapper, ProgressBar, ButtonWrapper, QuestionText } from "./QuestionCardStyles"

export type QuestionCardProps = {
  score: number
  question: string
  answers: string[]
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void
  userAnswer: AnswerObject | undefined
  questionNr: number
  totalQuestions: number
}

const QuestionCard: React.FC<QuestionCardProps> = ({ score, question, answers, callback, userAnswer, questionNr, totalQuestions }) => {
  const firstAnswerRef = useRef<HTMLButtonElement>(null)
  const percentComplete = (questionNr / totalQuestions) * 100

  useEffect(() => {
    if (firstAnswerRef.current) {
      firstAnswerRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (firstAnswerRef.current) {
      firstAnswerRef.current.focus()
    }
  }, [answers])

  return (
    <Wrapper>
      <h2>Score: {score}</h2>
      <br />
      <ProgressBar percentComplete={percentComplete} />
      <h2>
        Question: {questionNr} / {totalQuestions}
      </h2>
      <QuestionText dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer, index) => {
          if (index === 0) {
            return (
              <ButtonWrapper correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer} key={index}>
                <button ref={firstAnswerRef} disabled={!!userAnswer} value={answer} onClick={callback}>
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </ButtonWrapper>
            )
          }

          if (index !== 0) {
            return (
              <ButtonWrapper correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer} key={index}>
                <button disabled={!!userAnswer} value={answer} onClick={callback}>
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </ButtonWrapper>
            )
          }
        })}
      </div>
    </Wrapper>
  )
}

export default QuestionCard
