import type { NextPage } from "next"
import React, { useState } from "react"
import Head from "next/head"
import { shuffleArray } from "../utils"

//comps
import StartBtns from "../components/StartBtns"
import ResultsCard from "../components/ResultsCard"
import LoadingError from "../components/LoadingError"
import QuestionCard from "../components/QuestionCard/QuestionCard"
import OptionsModal from "../components/OptionsModal"

export type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
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

const TOTAL_QUESTIONS = 5

// Home: NextPage =
const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)
  const [loadingError, setLoadingError] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [selectedTotalQs, setSelectedTotalQs] = useState(TOTAL_QUESTIONS)
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy")

  const fetchQuizQuestions = async () => {
    const response = await fetch("/api/questions")
    const data = await response.json()

    return data.map((question: Question) => {
      return { ...question, answers: shuffleArray([...question.incorrect_answers, question.correct_answer]) }
    })
  }

  const startTrivia = async () => {
    // this function needs error handling

    try {
      setLoadingError(false)
      setLoading(true)
      const newQuestions = await fetchQuizQuestions()
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)
      setGameOver(false)
    } catch (e) {
      setLoadingError(true)
      setLoading(false)
      return
    }
  }

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer
      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1)
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => {
        return [...prev, answerObject]
      })
    }
  }

  const nextQuestion = () => {
    // move on to the next question if not the last question
    const nextQuestion = number + 1
    if (nextQuestion === selectedTotalQs) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  const saveSettingsHandler = (event: React.FormEvent) => {
    event.preventDefault()
    setSettingsOpen(false)
    setGameOver(true)
    startTrivia()
  }

  const closeSettingsHandler = () => {
    setSettingsOpen(false)
    setGameOver(true)
    //reset defaults if cancel button is hit
    setSelectedTotalQs(TOTAL_QUESTIONS)
    setSelectedDifficulty("easy")
  }

  return (
    <>
      <Head>
        <title>Web Dev Trivia</title>
        <meta name="description" content="yea yea yea yea" />
        <link rel="icon" href="favicon.png" />
      </Head>
      <h1>RANDOM QUIZ</h1>
      {gameOver || userAnswers.length === selectedTotalQs ? <StartBtns startTrivia={startTrivia} setSettingsOpen={setSettingsOpen} /> : null}
      {!gameOver && userAnswers.length === selectedTotalQs && <ResultsCard score={score} selectedTotalQs={selectedTotalQs} />}
      {loadingError && <LoadingError />}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && <QuestionCard score={score} questionNr={number + 1} totalQuestions={selectedTotalQs} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers ? userAnswers[number] : undefined} callback={checkAnswer}></QuestionCard>}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== selectedTotalQs - 1 && (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      )}
      {settingsOpen && <OptionsModal setSelectedTotalQs={setSelectedTotalQs} setSelectedDifficulty={setSelectedDifficulty} saveSettingsHandler={saveSettingsHandler} closeSettingsHandler={closeSettingsHandler} />}
    </>
  )
}

export default Home
