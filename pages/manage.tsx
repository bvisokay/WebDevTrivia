import { useRouter } from "next/router"
import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { CSVLink } from "react-csv"

import { connectToDatabase, getCategoryObjs, getAllQuestions } from "../lib/db"

/* This manage page is a duplicate of the admin page */
/* DONE: Attempt to re-fit with getServerSideProps instead of CS-data-fetching */
/* DONE: Not just about the data but protecting the page from non-logged in users */
/* Existing implementation uses the getSession in useEffect Approach */

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
import { GetServerSidePropsContext } from "next"

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

interface CategoryObj {
  id: string
  name: string
  tally: number
}

const AdminPage = (props: any) => {
  const router = useRouter()

  //categories state
  /* const [isLoading, setIsLoading] = useState(true)
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true) */
  const [categories, setCategories] = useState<CategoryObj[]>(props.categoryData)
  const [editCategoryModalIsOpen, setEditCategoryModalIsOpen] = useState(false)
  const [deleteCategoryModalIsOpen, setDeleteCategoryModalIsOpen] = useState(false)
  //questions state
  const [allQuestions, setAllQuestions] = useState<any>(props.questionData)
  const [editQuestionModalIsOpen, setEditQuestionModalIsOpen] = useState(false)
  const [deleteQuestionModalIsOpen, setDeleteQuestionModalIsOpen] = useState(false)

  // Tgt sent to modals
  const [tgtCategory, setTgtCategory] = useState<CategoryObj>()
  const [tgtQuestion, setTgtQuestion] = useState<{} | any>()

  //console.log("allQuestions: ", allQuestions)
  //console.log("categories: ", categories)

  // Update tally of questions for each category
  // on page but alos whenever the questions or category state changes
  useEffect(() => {
    if (categories) {
      categories.forEach((categoryObj: any) => {
        allQuestions.forEach((question: any) => {
          if (question.category === categoryObj.name) {
            categoryObj.tally++
          }
        })
      })
    }
  }, [allQuestions, categories])

  // EXPORT FEATURE USING REACT_CSV LIBRARY
  /* 
  const questionsToExport = [...allQuestions]

  const exportColumnHeaders = [
    { label: "ID", key: "id" },
    { label: "CATEGORY", key: "category" },
    { label: "DIFF", key: "difficulty" },
    { label: "TYPE", key: "type" },
    { label: "QUESTION", key: "question" },
    { label: "Correct_Answer", key: "correct_answer" },
    { label: "Incorrect_Answer_01", key: "incorrect_answers[0]" },
    { label: "Incorrect_Answer_02", key: "incorrect_answers[1]" },
    { label: "Incorrect_Answer_03", key: "incorrect_answers[2]" }
  ]

  const csvExport = {
    filename: "Exportion.csv",
    headers: exportColumnHeaders,
    data: questionsToExport
  } */

  // CATEGORIES

  function EditCategoryHandler(catObj: CategoryObj) {
    setTgtCategory(catObj)
    setEditCategoryModalIsOpen(true)
    // IF YOU EDIT - need to find all questions with the old name and update it to be the new name
  }

  function DeleteCategoryHandler(catObj: CategoryObj) {
    setTgtCategory(catObj)
    setDeleteCategoryModalIsOpen(true)
    // IF YOU DELETE - need to find all cats with that name and delete or uncat
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

  return (
    <Section>
      <SectionText style={{ textAlign: "center" }}>Manage All Categories and Questions</SectionText>

      <SectionNarrow>
        <TitleArea>
          <SectionTitle2>Categories ({categories.length})</SectionTitle2>
          <Link href="/addCategory">
            <a>Add+</a>
          </Link>
        </TitleArea>

        <ul className="categoryList">
          {categories.sort().map(category => {
            return (
              <ListItem key={category.id}>
                <div>
                  <p className="categoryItem">
                    {category.name} ({category.tally})
                  </p>
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

      <br />
      <br />
      <br />
      <br />

      <TitleArea>
        <SectionTitle2>Questions ({allQuestions.length})</SectionTitle2>
        {/* <CSVLink {...csvExport}>Export to CSV</CSVLink> */}
        <Link href="/addQ">
          <a>Add+</a>
        </Link>
      </TitleArea>

      <ul className="question">
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("GSSP on Manage")
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    }
  }

  /* Get Cats and Qs */
  let client
  try {
    client = await connectToDatabase()
  } catch (error) {
    console.log(error)
    return
  }
  let categoryData: {}[] = []
  let questionData: {}[] = []
  try {
    categoryData = await getCategoryObjs(client)
    questionData = await getAllQuestions(client)
  } catch (error) {
    console.log(error)
  }
  client.close()
  /* END Get Cats and Qs */

  return {
    props: {
      session,
      categoryData,
      questionData
    }
  }
}

export default AdminPage
