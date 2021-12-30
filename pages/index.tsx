import type { NextPage } from "next"
import React, { useState } from "react"
import Head from "next/head"
import { MongoClient } from "mongodb"

//comps
import StartBtns from "../components/StartBtns"

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
const Home: React.FC = (props: any) => {
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

  const startTrivia = async () => {
    // this function needs error handling

    try {
      //setLoadingError(false)
      //setLoading(true)
      //const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
      //const newQuestions = await fetchQuizQuestions(selectedTotalQs, selectedDifficulty)
      //setQuestions(newQuestions)
      //setScore(0)
      //setUserAnswers([])
      //setNumber(0)
      //setLoading(false)
      //setGameOver(false)
    } catch (e) {
      //setLoadingError(true)
      //setLoading(false)
      return
    }
  }

  return (
    <>
      <Head>
        <title>Web Dev Trivia</title>
        <meta name="description" content="yea yea yea yea" />
        <link rel="icon" href="favicon.png" />
      </Head>
      {gameOver || userAnswers.length === selectedTotalQs ? <StartBtns startTrivia={startTrivia} setSettingsOpen={setSettingsOpen} /> : null}
      <ul>
        {props.items.map((item: any) => {
          return <li key={item.index}>{item.question}</li>
        })}
      </ul>
    </>
  )
}

// reach out to db for question data on the server?
// the api runs on the same server
// not doing it this way creates unnecessary http request
// how do we handle the loading state/time
// getStaticProps outside of the component to call internal API
// getStaticProps is about getting the data needed for the Home comp
// alernative to using fetch/axios inside
// could do fetch("/api/questions")
// do not talk to db from front-end of application
// send props to this Home component
// the questions data, including the answer,
// will still end up on the client, viewable in source code
// maybe better for SEO

export async function getStaticProps() {
  // server side code runs when the page is pre-rendered
  // make the code in api route available in an export so it can be
  // import these functions and run directly here.
  // dont send a response data code
  // about producing the data for the page component

  const client = await MongoClient.connect(`${process.env.ENV_LOCAL_CONNECTION_STRING}`)

  const db = client.db()

  const results = await db
    .collection("questions")
    .aggregate([{ $sample: { size: 5 } }])
    .toArray()

  // removes _id from each question object
  const cleanedResults = results.map(questionObj => {
    return {
      category: questionObj.category,
      type: questionObj.type,
      difficulty: questionObj.difficulty,
      question: questionObj.question,
      correct_answer: questionObj.correct_answer,
      incorrect_answers: questionObj.incorrect_answers
    }
  })

  client.close()

  const data = cleanedResults

  return {
    props: {
      items: data
    }
  }
}

export default Home
