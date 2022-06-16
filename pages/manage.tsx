import { useRouter } from "next/router"
import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { CSVLink } from "react-csv"
import { GetServerSidePropsContext } from "next"
import { connectToDatabase, getCategoryObjs, getAllQuestions } from "../lib/db"

//comps
import Backdrop from "../components/Backdrop/Backdrop"
import DeleteCategoryModal from "../components/DeleteCategoryModal/DeleteCategoryModal"
import EditCategoryModal from "../components/EditCategoryModal/EditCategoryModal"
import DeleteQuestionModal from "../components/DeleteQuestionModal/DeleteQuestionModal"
import EditQuestionModal from "../components/EditQuestionModal/EditQuestionModal"

// styles
import { Section, SectionNarrow, ListItem, SectionTitle2, QuestionCardRow, TitleArea } from "../styles/GlobalComponents"
import { BtnSmall } from "../styles/GlobalComponents/Button"
import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"
import { FiEdit, FiTrash2, FiPlusSquare } from "react-icons/fi"
import { GrDocumentCsv } from "react-icons/gr"
import { BiImport } from "react-icons/bi"

const BtnContainer = styled.div`
  //border: 1px solid hotpink;
  display: flex;
  align-items: center;
  justify-content: center;
  //min-width: 100px;
  //margin: 0 auto;
  color: white;

  @media ${breakpoints.sm} {
    //border: 1px solid crimson;
    margin: 0 0 0 0.5rem;
  }

  /* New Q button */
  button {
    background-color: var(--cinco);
    color: white;
    border: none;
    border-radius: 0.25rem;
    margin: 0.1rem;
    padding: 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    /* on the list items not the title area */
    svg {
      font-size: 1rem;
    }
  }

  /* Plus and export icon */
  a svg {
    font-size: 1.25rem;
    color: white;
    margin: 0 0.25rem;

    @media ${breakpoints.sm} {
      font-size: 1.75rem;
    }

    @media ${breakpoints.md} {
      font-size: 2rem;
    }

    path {
      stroke: white;
    }
  }
`

interface CategoryObj {
  id: string
  name: string
  tally: number
}

const AdminPage = (props: any) => {
  //categories state
  /* const [isLoading, setIsLoading] = useState(true)
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true) */
  const [categories, setCategories] = useState<CategoryObj[]>(props.categoryData)
  const [editCategoryModalIsOpen, setEditCategoryModalIsOpen] = useState(false)
  const [deleteCategoryModalIsOpen, setDeleteCategoryModalIsOpen] = useState(false)
  //questions state
  const [allQuestions, setAllQuestions] = useState<any>(props.questionData)
  const [questionsToExport, setQuestionsToExport] = useState<any>(props.questionData)
  const [editQuestionModalIsOpen, setEditQuestionModalIsOpen] = useState(false)
  const [deleteQuestionModalIsOpen, setDeleteQuestionModalIsOpen] = useState(false)
  const [catFilter, setCatFilter] = useState<string>("")

  // Tgt sent to modals
  const [tgtCategory, setTgtCategory] = useState<CategoryObj>()
  const [tgtQuestion, setTgtQuestion] = useState<{} | any>()

  //
  // Begin export using { CSVLink } from "react-csv"
  // let questionsToExport = [...allQuestions] // was the pre-filtering logic
  // update the Questions ot export if the filter is updated or allQuestions state changes
  useEffect(() => {
    setQuestionsToExport(() => {
      if (!catFilter) {
        return [...allQuestions]
      } else {
        let filteredQsToExport = allQuestions.filter((Q: any) => {
          if (catFilter && Q.category === catFilter) {
            return Q
          }
        })
        return [...filteredQsToExport]
      }
    })
  }, [catFilter, allQuestions])

  const exportColumnHeaders = [
    /* { label: "ID", key: "id" }, */
    { label: "category", key: "category" },
    /* { label: "DIFF", key: "difficulty" },
    { label: "TYPE", key: "type" }, */
    { label: "question", key: "question" },
    { label: "correct_answer", key: "correct_answer" },
    { label: "incorrect_answer_1", key: "incorrect_answers[0]" },
    { label: "incorrect_answer_2", key: "incorrect_answers[1]" },
    { label: "incorrect_answer_3", key: "incorrect_answers[2]" }
  ]
  const csvExport = {
    filename: "questions.csv",
    headers: exportColumnHeaders,
    data: questionsToExport
  }
  // End export
  //

  useEffect(() => {
    if (categories) {
      categories.forEach((categoryObj: any) => {
        categoryObj.tally = 0
        allQuestions.forEach((question: any) => {
          if (question.category === categoryObj.name) {
            categoryObj.tally++
          }
        })
      })
    }
  }, [allQuestions, categories])

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

  const catFilterHandler = (cat: string) => {
    setCatFilter(cat)
  }

  return (
    <Section>
      {/* <SectionTitle style={{ textAlign: "center" }}>Manage All Categories and Questions</SectionTitle> */}

      <SectionNarrow>
        <TitleArea>
          <SectionTitle2>Categories ({categories.length})</SectionTitle2>
          <BtnContainer>
            <Link href="/addCategory">
              <a>
                <FiPlusSquare />
              </a>
            </Link>
          </BtnContainer>
        </TitleArea>

        <ul className="categoryList">
          {categories
            .sort((a, b) => {
              if (a.name > b.name) {
                return 1
              } else {
                return -1
              }
            })
            .map(category => {
              return (
                <ListItem key={category.id}>
                  <div>
                    <p onClick={catFilterHandler.bind(null, category.name)} className="categoryItem">
                      {category.name} ({category.tally})
                    </p>
                  </div>
                  <BtnContainer>
                    <button onClick={EditCategoryHandler.bind(null, category)}>
                      <FiEdit />
                    </button>
                    <button onClick={DeleteCategoryHandler.bind(null, category)}>
                      <FiTrash2 />
                    </button>
                  </BtnContainer>
                </ListItem>
              )
            })}
        </ul>
      </SectionNarrow>

      <br />

      <TitleArea>
        <SectionTitle2>
          Questions{" "}
          {!catFilter ? (
            allQuestions.length
          ) : (
            <>
              <p>Filtering - {catFilter}</p>
              <BtnSmall onClick={() => setCatFilter("")}>Remove Filter</BtnSmall>
            </>
          )}
        </SectionTitle2>

        <BtnContainer>
          <Link href="/addQ">
            <a>
              <FiPlusSquare />
            </a>
          </Link>

          <CSVLink {...csvExport}>
            {/* <GrDocumentCsv /> */}
            <BtnSmall>Export</BtnSmall>
          </CSVLink>

          <Link href="/import">
            <a>
              <BtnSmall>Import</BtnSmall>
              {/* <BiImport /> */}
            </a>
          </Link>
        </BtnContainer>
      </TitleArea>

      <ul className="question">
        {allQuestions
          .filter((Q: any) => {
            if (!catFilter) {
              return Q
            }
            if (catFilter && Q.category === catFilter) {
              return Q
            }
          })
          .sort((a: any, b: any) => {
            if (a.createdDate < b.createdDate) {
              return 1
            } else {
              return -1
            }
          })
          .map((questionObj: any) => {
            return (
              <QuestionCardRow key={questionObj.id}>
                <div>
                  <div>
                    <p>
                      <strong>Q: </strong>
                      {questionObj.question}
                    </p>
                    <p>
                      <strong>A: </strong>
                      {questionObj.correct_answer}
                    </p>
                  </div>
                </div>
                <BtnContainer>
                  <button onClick={EditQuestionHandler.bind(null, questionObj)}>
                    <FiEdit />
                  </button>
                  <button onClick={DeleteQuestionHandler.bind(null, questionObj)}>
                    <FiTrash2 />
                  </button>
                </BtnContainer>
              </QuestionCardRow>
            )
          })}
        {/*    {allQuestions.map((questionObj: any) => {
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
        })} */}
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
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false
      }
    }
  }

  let client
  try {
    client = await connectToDatabase()
  } catch (err) {
    throw { message: "error", errors: err }
  }
  let categoryData: {}[] = []
  let questionData: {}[] = []
  try {
    categoryData = await getCategoryObjs(client)
    questionData = await getAllQuestions(client)

    categoryData.forEach((categoryObj: any) => {
      categoryObj.tally = 0
      questionData.forEach((question: any) => {
        if (question.category === categoryObj.name) {
          categoryObj.tally++
        }
      })
    })
  } catch (err) {
    throw { message: "error", errors: err }
  }
  client.close()

  return {
    props: {
      session,
      categoryData,
      questionData
    }
  }
}

export default AdminPage
