import { AnswerObject } from "../../pages/index"

import { Wrapper, ProgressBar, ButtonWrapper } from "./QuestionCardStyles"

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
  let percentComplete = (questionNr / totalQuestions) * 100

  return (
    <Wrapper>
      <p className="score">Score: {score}</p>
      <ProgressBar percentComplete={percentComplete} />
      <p className="number">
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map(answer => (
          <ButtonWrapper correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer} key={answer}>
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  )
}

export default QuestionCard
