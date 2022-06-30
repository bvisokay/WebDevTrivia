import type { NextPage } from "next"
import React, { useState, useContext, useEffect, useRef } from "react"
import Head from "next/head"
import { shuffleArray } from "../lib/util"
import { defaultTotalQuestions, GlobalDispatchContext, GlobalStateContext } from "../store/GlobalContext"
import Link from "next/link"

//comps
import StartBtns from "../components/StartBtns"
import ResultsCard from "../components/ResultsCard"
import LoadingError from "../components/LoadingError"
import QuestionCard from "../components/QuestionCard/QuestionCard"
import OptionsModal from "../components/OptionsModal/OptionsModal"

//styles
import { BtnPrimary, ResetBtn } from "../styles/GlobalComponents/Button"

// types
import { AnswerObject, Question, QuestionsState } from "../lib/types"

// Home: NextPage =
const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [loadingError, setLoadingError] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  /* temporarily not implementating difficulty feature */
  /*   const [selectedDifficulty, setSelectedDifficulty] = useState("easy") */

  const nextQuestionBtnRef = useRef<HTMLButtonElement>(null)

  const appDispatch = useContext(GlobalDispatchContext)
  const appState = useContext(GlobalStateContext)

  const fetchQuizQuestions = async (selectedCategory: string, selectedTotalQs: number) => {
    const trimmedCategory = selectedCategory.trim().replace(/ /g, "")

    try {
      let endpoint
      if (trimmedCategory === "all") {
        endpoint = `/api/questions?amount=${selectedTotalQs}`
      } else {
        endpoint = `/api/questions?category=${trimmedCategory}&amount=${selectedTotalQs}`
      }

      const response = await fetch(endpoint)
      const data = (await response.json()) as Question[]

      return data.map((question: Question) => {
        return { ...question, answers: shuffleArray([...question.incorrect_answers, question.correct_answer]) }
      })
    } catch (error) {
      throw new Error()
    }
  }

  /* Handle Category Chosen with No Questions */
  useEffect(() => {
    if (!appState.gameOver && questions.length && questions.length < appState.selectedTotalQs) {
      appDispatch({ type: "setSelectedTotalQs", value: questions.length })
      appDispatch({ type: "flashMessage", value: "As many Qs as possible" })
    }
  }, [appState.gameOver, questions, appState.selectedTotalQs, appDispatch])

  const startGameHandler = () => {
    //fresh start
    setLoadingError(false)
    setLoading(true)
    setQuestions([])
    appDispatch({ type: "gameOver", value: false })
    //get questions

    fetchQuizQuestions(appState.selectedCategory, appState.selectedTotalQs)
      .then(newQuestions => {
        if (newQuestions.length === 0) {
          appDispatch({ type: "flashMessage", value: "No Questions for that category" })
          appDispatch({ type: "gameReset" })
          return
        }
        setQuestions(newQuestions)
        setScore(0)
        setUserAnswers([])
        setNumber(0)
        setLoading(false)
        appDispatch({ type: "gameOver", value: false })
      })
      .catch((err: unknown) => {
        setLoadingError(true)
        setLoading(false)
        throw { message: "error", errors: err }
      })
    // end fetch questions
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!appState.gameOver) {
      // User's answer
      const answer = e.currentTarget.value
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer
      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1)
      // Save the answer in the array for user answers
      const answerObject: AnswerObject = {
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

  // Focus on Next Question Button When it is visible for better keyboard navigation
  useEffect(() => {
    if (nextQuestionBtnRef.current) {
      nextQuestionBtnRef.current.focus()
    }
  }, [userAnswers])

  const nextQuestion = () => {
    // move on to the next question if not the last question
    const nextQuestion = number + 1
    if (nextQuestion === appState.selectedTotalQs) {
      appDispatch({ type: "gameReset" })
    } else {
      setNumber(nextQuestion)
    }
  }

  const saveSettingsHandler = (event: React.FormEvent) => {
    event.preventDefault()
    setSettingsOpen(false)
    appDispatch({ type: "gameOver", value: true })
    void startGameHandler()
  }

  const closeSettingsHandler = () => {
    setSettingsOpen(false)
    appDispatch({ type: "gameOver", value: true })
    //reset defaults if cancel button is hit
    appDispatch({ type: "setSelectedTotalQs", value: defaultTotalQuestions })
    appDispatch({ type: "setSelectedCategory", value: "all" })
    /* setSelectedDifficulty("easy") */
  }

  const resetBtnHandler = () => {
    appDispatch({ type: "gameReset" })
    setQuestions([])
  }

  return (
    <>
      <Head>
        <title>Web Dev Trivia</title>
        <meta name="description" content="Trivia questions on web development" />
        <link rel="icon" href="favicon.png" />
      </Head>

      {appState.gameOver && !loading && <StartBtns startGameHandler={startGameHandler} setSettingsOpen={setSettingsOpen} />}

      {!appState.gameOver && !loading && userAnswers.length !== appState.selectedTotalQs && (
        <Link href="/">
          <ResetBtn onClick={resetBtnHandler}>Reset</ResetBtn>
        </Link>
      )}

      {!appState.gameOver && !loading && userAnswers.length === appState.selectedTotalQs && (
        <Link href="/">
          <ResetBtn autoFocus onClick={resetBtnHandler}>
            Home
          </ResetBtn>
        </Link>
      )}

      {!appState.gameOver && userAnswers.length === appState.selectedTotalQs && !loading && <ResultsCard score={score} />}

      {loadingError && <LoadingError />}

      {loading && <p>Loading Questions...</p>}

      {!loading && !appState.gameOver && questions.length && <QuestionCard score={score} questionNr={number + 1} totalQuestions={appState.selectedTotalQs} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers ? userAnswers[number] : undefined} callback={checkAnswer}></QuestionCard>}

      {!appState.gameOver && !loading && userAnswers.length === number + 1 && number !== appState.selectedTotalQs - 1 && (
        <BtnPrimary ref={nextQuestionBtnRef} onClick={nextQuestion}>
          Next Question
        </BtnPrimary>
      )}

      {settingsOpen && <OptionsModal /* setSelectedDifficulty={setSelectedDifficulty} */ saveSettingsHandler={saveSettingsHandler} closeSettingsHandler={closeSettingsHandler} />}
    </>
  )
}

export default Home
