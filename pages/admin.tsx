import { useRouter } from "next/router"
import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"
import Link from "next/link"
// import { CSVLink } from "react-csv"
/* CSV Link is breaking things */

//comps
import Backdrop from "../components/Backdrop/Backdrop"
import DeleteCategoryModal from "../components/DeleteCategoryModal/DeleteCategoryModal"
import EditCategoryModal from "../components/EditCategoryModal/EditCategoryModal"
import DeleteQuestionModal from "../components/DeleteQuestionModal/DeleteQuestionModal"
import EditQuestionModal from "../components/EditQuestionModal/EditQuestionModal"

// styles
import { Section, SectionNarrow, ListItem, SectionText, SectionTitle2, QuestionCardRow, TitleArea } from "../styles/GlobalComponents"
import { BtnSmall } from "../styles/GlobalComponents/Button"

import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 100px;
  margin: 0 auto;

  @media ${breakpoints.sm} {
    //border: 1px solid crimson;
    margin: 0 0 0 0.5rem;
  }
`

const AdminPage = () => {
  const router = useRouter()
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true)
  const [isCategoriesLoading, setIsCategoriesLoading] = useState<boolean>(true)
  const [categories, setCategories] = useState<string[]>([])
  const [editCategoryModalIsOpen, setEditCategoryModalIsOpen] = useState(false)
  const [deleteCategoryModalIsOpen, setDeleteCategoryModalIsOpen] = useState(false)
  //questions state
  const [allQuestions, setAllQuestions] = useState<any>([])
  const [editQuestionModalIsOpen, setEditQuestionModalIsOpen] = useState(false)
  const [deleteQuestionModalIsOpen, setDeleteQuestionModalIsOpen] = useState(false)
  const [tgtCategory, setTgtCategory] = useState<string>()
  const [tgtQuestion, setTgtQuestion] = useState<{} | any>()

  // make sure the user is logged in if so fetch data
  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        router.replace("/auth")
      } else {
        setIsPageLoading(false)
        //console.log("useEffect ran")
        setIsCategoriesLoading(true)
        //async function called immediately after to avoid useEffect being async
        const getCategoriesOnLoad = async () => {
          try {
            const response = await fetch("/api/categories")
            const data = await response.json()
            // Load all categories and store in state
            setCategories(data)
            setIsCategoriesLoading(false)
          } catch (error) {
            throw new Error()
          }
        } // closes getCategoriesOnLoad definition
        const getQuestionsOnLoad = async () => {
          try {
            const response = await fetch("/api/allquestions")
            const ourdatas = await response.json()
            // Load all categories and store in state

            setAllQuestions(ourdatas)
            console.log(allQuestions)
          } catch (error) {
            throw new Error()
          }
        } // closes getCategoriesOnLoad definition
        getQuestionsOnLoad()
        getCategoriesOnLoad()

        // teardown function goes here
        return () => {}
      }
    })
  }, [router, allQuestions])

  if (isPageLoading) {
    return <p>Loading...</p>
  }

  //EXPORT TO CSV STRATEGY #1

  /* const data = [
    { firstName: "Warren", lastName: "Gee" },
    { firstName: "Pepper", lastName: "Onchini the, first" },
    { firstName: "Rox", lastName: "aroni" },
    { firstName: "Luky", lastName: "Skywalky" }
  ] */

  /* let mydata
  if (allQuestions.length) {
    let mydata = allQuestions.reduce((acc: any, q: any) => {
      const { id, question } = q
      acc.push([id, question].join(","))
      return acc
    }, [])
  }

  const headers = [
    { label: "ID", key: "firstName" },
    { label: "QUESTION", key: "lastName" }
  ]

  const csvReport = {
    filename: "Report.csv",
    headers: headers,
    data: mydata
  } */

  // EXPORT TO CSV STRATEGY #2
  /*  const downloadFile = (input: any) => {
    const blob = new Blob([input.data], { type: input.fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a")
    a.download = input.fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  } */

  /*   const exportToCsv = (e: any) => {
    e.preventDefault()

    // Headers for each column
    // "id, type, difficulty, category, question, correct_answer, incorrect_answer01, incorrectanswer02, incorrectanswer03"
    let headers = ["id,question"]

    // Convert allQuestions data to a csv
    let questionsCsv = allQuestions.reduce((acc: any, q: any) => {
      const { id, question } = q
      acc.push([id, question].join(","))
      return acc
    }, [])

    downloadFile({
      data: [...headers, ...questionsCsv].join("\n"),
      fileName: "questions.csv",
      fileType: "text/csv"
    })
  } */

  // CATEGORIES
  // not sure of dependency but need to be logged in

  function EditCategoryHandler(catObj: string) {
    setTgtCategory(catObj)
    setEditCategoryModalIsOpen(true)
    // IF YOU EDIT - need to find all questions with the old name and update it to be the new name
  }

  function DeleteCategoryHandler(catObj: string) {
    setTgtCategory(catObj)
    setDeleteCategoryModalIsOpen(true)
    // or convert to uncategorized, add uncategorized as categoyr
    // Should questions with this category be deleted?
    // if not they will never been seen
  }

  function EditQuestionHandler(qObj: any) {
    setTgtQuestion(qObj)
    setEditQuestionModalIsOpen(true)
  }

  function DeleteQuestionHandler(qObj: any) {
    setTgtQuestion(qObj)
    setDeleteQuestionModalIsOpen(true)
    // Should questions with this category be deleted?
    // if not they will never been seen
    // or convert to uncategorized
  }

  const closeModalHandler = () => {
    setEditCategoryModalIsOpen(false)
    setDeleteCategoryModalIsOpen(false)
    setEditQuestionModalIsOpen(false)
    setDeleteQuestionModalIsOpen(false)
  }

  // Show Categories with Edit and Delete Buttons
  // Show a button to add category that pulls in addCategory comp

  // QUESTIONS
  // Load all questions and store in state
  // Show all questions with Edit and Delete Buttons
  // Show a button to add question that pulls in addQuestion comp
  // IF YOU EDIT - the category field of a question it needs to be one of the existing categories.

  return (
    <Section>
      <SectionText style={{ textAlign: "center" }}>Manage All Categories and Questions</SectionText>

      <SectionNarrow>
        <TitleArea>
          <SectionTitle2>Categories ({categories.length})</SectionTitle2>
          <Link href="/addCategory">
            <a>+</a>
          </Link>
        </TitleArea>

        <ul className="categoryList">
          {/* Render the Category */}
          {categories.sort().map((category, index) => {
            return (
              <ListItem key={index}>
                <div>
                  <p className="categoryItem">{category} (#Qs)</p>
                </div>
                <div>
                  <BtnSmall onClick={EditCategoryHandler.bind(null, category)}>Edit</BtnSmall>
                  <BtnSmall onClick={DeleteCategoryHandler.bind(null, category)}>Delete</BtnSmall>
                </div>
              </ListItem>
            )
          })}
        </ul>
      </SectionNarrow>

      <TitleArea>
        <SectionTitle2>Questions ({allQuestions.length})</SectionTitle2>
        {/*  <CSVLink {...csvReport}>Export to CSV</CSVLink> */}
        <Link href="/addQ">
          <a>+</a>
        </Link>
        {/* <button type="button" onClick={exportToCsv}>
          Export to CSV
        </button> */}
      </TitleArea>

      <ul className="question">
        {/* {allQuestions.map((questionObj: any) => (
          <li key={questionObj.id}>{questionObj.question}</li>
        ))} */}
        {allQuestions.map((questionObj: any) => {
          return (
            <QuestionCardRow key={questionObj.id}>
              <div>
                <div>
                  <p>
                    <strong>Q: </strong>
                    {questionObj.question}
                  </p>
                </div>
              </div>
              <BtnContainer>
                <BtnSmall onClick={EditQuestionHandler.bind(null, questionObj)}>Edit</BtnSmall>
                <BtnSmall onClick={DeleteQuestionHandler.bind(null, questionObj)}>Delete</BtnSmall>
              </BtnContainer>
            </QuestionCardRow>
          )
        })}
      </ul>

      {/* Backdrop and Modal Logic*/}
      {deleteCategoryModalIsOpen && (
        <>
          <Backdrop closeModalHandler={closeModalHandler} />
          <DeleteCategoryModal closeModalHandler={closeModalHandler} tgtCategory={tgtCategory} setCategories={setCategories} categories={categories} allQuestions={allQuestions} setAllQuestions={setAllQuestions} />
        </>
      )}

      {editCategoryModalIsOpen && (
        <>
          <Backdrop closeModalHandler={closeModalHandler} />
          <EditCategoryModal closeModalHandler={closeModalHandler} tgtCategory={tgtCategory} setCategories={setCategories} categories={categories} />
        </>
      )}
      {deleteQuestionModalIsOpen && (
        <>
          <Backdrop closeModalHandler={closeModalHandler} />
          <DeleteQuestionModal closeModalHandler={closeModalHandler} tgtQuestion={tgtQuestion} allQuestions={allQuestions} setAllQuestions={setAllQuestions} />
        </>
      )}

      {editQuestionModalIsOpen && (
        <>
          <Backdrop closeModalHandler={closeModalHandler} />
          <EditQuestionModal categories={categories} tgtQuestion={tgtQuestion} closeModalHandler={closeModalHandler} allQuestions={allQuestions} setAllQuestions={setAllQuestions} />
        </>
      )}
    </Section>
  )
}

export default AdminPage
