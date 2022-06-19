import type { NextPage } from "next"
import React, { useState, useContext, useEffect } from "react"
import Head from "next/head"
import { shuffleArray } from "../lib/util"
import { defaultTotalQuestions, GlobalDispatchContext, GlobalStateContext } from "../store/GlobalContext"
import styled from "styled-components"

//comps
import StartBtns from "../components/StartBtns"
import ResultsCard from "../components/ResultsCard"
import LoadingError from "../components/LoadingError"
import QuestionCard from "../components/QuestionCard/QuestionCard"
import OptionsModal from "../components/OptionsModal/OptionsModal"

//styles
import { SectionTitle } from "../styles/GlobalComponents"
import { BtnPrimary } from "../styles/GlobalComponents/Button"

// types
import { AnswerObject, Question, QuestionsState } from "../lib/types"

const Debug = styled.div`
  border: 1px solid white;
  border-radius: 0.5rem;
  margin: 1rem auto;
  padding: 0 0.5rem;
  p {
    line-height: 0.5rem;
  }
`

// Home: NextPage =
const Home: NextPage = () => {
  //console.log("Home Comp Rendered")
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [loadingError, setLoadingError] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  /* temporarily not implementating difficulty feature */
  /*   const [selectedDifficulty, setSelectedDifficulty] = useState("easy") */

  const appDispatch = useContext(GlobalDispatchContext)
  const appState = useContext(GlobalStateContext)

  const fetchQuizQuestions = async (selectedCategory: string, selectedTotalQs: number) => {
    //console.log(selectedCategory)
    //console.log(selectedTotalQs)
    const trimmedCategory = selectedCategory.trim().replace(/ /g, "")

    try {
      let endpoint
      if (trimmedCategory === "all") {
        endpoint = `/api/questions?amount=${selectedTotalQs}`
      } else {
        endpoint = `/api/questions?category=${trimmedCategory}&amount=${selectedTotalQs}`
      }
      //console.log(endpoint)

      const response = await fetch(endpoint)
      const data = await response.json()
      //console.log("data", data)

      return data.map((question: Question) => {
        return { ...question, answers: shuffleArray([...question.incorrect_answers, question.correct_answer]) }
      })
    } catch (error) {
      throw new Error()
    }
  }

  useEffect(() => {
    //console.log("questions.length", questions.length)
    if (!appState.gameOver && questions.length === 0) {
      appDispatch({ type: "flashMessage", value: "Error: No questions for that category" })
      appDispatch({ type: "gameReset" })
    }
    if (!appState.gameOver && questions.length && questions.length < appState.selectedTotalQs) {
      appDispatch({ type: "setSelectedTotalQs", value: questions.length })
      appDispatch({ type: "flashMessage", value: "As many Qs as possible" })
      console.log("Question number reset down to what's available")
    }
  }, [appState.gameOver, questions, appState.selectedTotalQs, appDispatch])

  const startGameHandler = async () => {
    //fresh start
    setLoadingError(false)
    setLoading(true)
    //get questions
    try {
      const newQuestions = await fetchQuizQuestions(appState.selectedCategory, appState.selectedTotalQs)
      setQuestions(newQuestions)
    } catch (err) {
      setLoadingError(true)
      setLoading(false)
      throw { message: "error", errors: err }
    }
    // end fetch questions
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
    appDispatch({ type: "gameOver", value: false })
  }

  const checkAnswer = (e: any) => {
    if (!appState.gameOver) {
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
    if (nextQuestion === appState.selectedTotalQs) {
      appDispatch({ type: "gameReset" })
    } else {
      setNumber(nextQuestion)
    }
  }

  const saveSettingsHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    setSettingsOpen(false)
    appDispatch({ type: "gameOver", value: true })
    startGameHandler()
  }

  const closeSettingsHandler = () => {
    setSettingsOpen(false)
    appDispatch({ type: "gameOver", value: true })
    //reset defaults if cancel button is hit
    appDispatch({ type: "setSelectedTotalQs", value: defaultTotalQuestions })
    appDispatch({ type: "setSelectedCategory", value: "all" })
    /* setSelectedDifficulty("easy") */
  }

  return (
    <>
      <Head>
        <title>Web Dev Trivia</title>
        <meta name="description" content="Trivia questions on web development" />
        <link rel="icon" href="favicon.png" />
      </Head>
      {(appState.gameOver || userAnswers.length === appState.selectedTotalQs) && !loading && <StartBtns startGameHandler={startGameHandler} setSettingsOpen={setSettingsOpen} />}

      {!appState.gameOver && userAnswers.length === appState.selectedTotalQs && <ResultsCard score={score} />}
      {loadingError && <LoadingError />}
      {loading && <div className="loading">Loading Questions...</div>}
      {!loading && !appState.gameOver && questions.length && <QuestionCard score={score} questionNr={number + 1} totalQuestions={appState.selectedTotalQs} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers ? userAnswers[number] : undefined} callback={checkAnswer}></QuestionCard>}
      {!appState.gameOver && !loading && userAnswers.length === number + 1 && number !== appState.selectedTotalQs - 1 && <BtnPrimary onClick={nextQuestion}>Next Question</BtnPrimary>}
      {settingsOpen && <OptionsModal /* setSelectedDifficulty={setSelectedDifficulty} */ saveSettingsHandler={saveSettingsHandler} closeSettingsHandler={closeSettingsHandler} />}

      {/*  <Debug>
        <p style={{ color: "white" }}>questions.length: {questions.length}</p>
        <p style={{ color: "white" }}>Number: {number}</p>
        <p style={{ color: "white" }}>SelectedCategory: {appState.selectedCategory}</p>
        <p style={{ color: "white" }}>selectedTotalQs: {appState.selectedTotalQs}</p>
      </Debug> */}
    </>
  )
}

export default Home
