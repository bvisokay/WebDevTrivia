import { useRouter } from "next/router"
import { getSession, session } from "next-auth/client"
import { useEffect, useState } from "react"

//comps
import Backdrop from "../components/Backdrop/Backdrop"
import DeleteCategoryModal from "../components/DeleteCategoryModal/DeleteCategoryModal"
import EditCategoryModal from "../components/EditCategoryModal/EditCategoryModal"
import DeleteQuestionModal from "../components/DeleteQuestionModal/DeleteQuestionModal"
import EditQuestionModal from "../components/EditQuestionModal/EditQuestionModal"

// styles
import { Section, SectionNarrow, ListItem } from "../styles/GlobalComponents"
import { BtnSmall } from "../styles/GlobalComponents/Button"
import { QuestionCardRow, SectionTitle } from "../styles/GlobalComponents"

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

const Admin: React.FC = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)
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
        setIsLoading(false)
        console.log("useEffect ran")
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
            const data = await response.json()
            // Load all categories and store in state
            setAllQuestions(data)
          } catch (error) {
            throw new Error()
          }
        } // closes getCategoriesOnLoad definition
        getCategoriesOnLoad()
        getQuestionsOnLoad()

        // teardown function goes here
      }
    })
  }, [router])

  if (isLoading) {
    return <p>Loading...</p>
  }

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
      <SectionTitle>Admin</SectionTitle>
      <p style={{ textAlign: "center" }}>This page is meant for admins to be able to CRUD categories and questions.</p>
      <hr />

      <ul>
        <p>
          <strong>Features coming soon include:</strong>
        </p>
        <li className="dotted">See all the existing questions and categories to make edits if necesssary.</li>
        <li className="dotted">Totals for categories</li>
        <li className="dotted">CRUD all questions and categories here? Need to be able to edit existing questions.</li>
        <li className="dotted">Ability to search</li>
        <li className="dotted">Ability to sort</li>
        <li className="dotted">Ability to filter</li>
      </ul>

      <ul className="categoryList">
        <p className="categoryItem">Categories ({categories.length})</p>
        <hr />
        {categories.sort().map((category, index) => {
          return (
            <ListItem key={index}>
              <div>
                <p className="categoryItem">{category}</p>
              </div>
              <div>
                <BtnSmall onClick={EditCategoryHandler.bind(null, category)}>Edit</BtnSmall>
                <BtnSmall onClick={DeleteCategoryHandler.bind(null, category)}>Delete</BtnSmall>
              </div>
            </ListItem>
          )
        })}
      </ul>

      <ul /* className="questionList" */>
        <p /* className="questionItem" */>Questions ({allQuestions.length})</p>
        <hr />
        {allQuestions.map((questionObj: any, index: any) => {
          return (
            <QuestionCardRow key={index}>
              <div>
                {/* <p style={{ textAlign: "right", fontWeight: "700" }}>{questionObj.category}</p> */}
                <div>
                  <p>
                    <strong>Q: </strong>
                    {questionObj.question}
                  </p>
                  {/*   <p>
                    <strong>Correct A:</strong> {questionObj.correct_answer}
                  </p>
                  <p>
                    <strong>Incorrect 1:</strong> {questionObj.incorrect_answers[0]}
                  </p>
                  <p>
                    <strong>Incorrect 2:</strong> {questionObj.incorrect_answers[1]}
                  </p>
                  <p>
                    <strong>Incorrect 3:</strong> {questionObj.incorrect_answers[2]}
                  </p> */}
                </div>
                {/*  <p className="categoryItem">Correct Answer: {questionObj.correct_answer}</p>
                <p className="categoryItem">Incorrect Answer 1: {questionObj.incorrect_answers[0]}</p>
                <p className="categoryItem">Incorrect Answer 2: {questionObj.incorrect_answers[1]}</p>
                <p className="categoryItem">Incorrect Answer 3: {questionObj.incorrect_answers[2]}</p> */}
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
          <DeleteCategoryModal closeModalHandler={closeModalHandler} tgtCategory={tgtCategory} setCategories={setCategories} categories={categories} />
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

export default Admin
