import React, { useState, useRef, useContext } from "react"
//import Papa from "papaparse"
import { parse, ParseResult } from "papaparse"
import { GlobalDispatchContext } from "../store/GlobalContext"
import { useRouter } from "next/router"
import { clientValidateQuestionsArray } from "../lib/util"

// styled comps
import { BtnPrimary } from "../styles/GlobalComponents/Button"
import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"
import { ImportedAndSetQuestionType, ResponseType } from "../lib/types"

const ImportContainer = styled.div`
  color: var(--color-text-secondary);
  background-color: var(--color-bg-tertiary);
  border-radius: var(--roundness);
  margin: 3rem 1rem;
  padding: 1rem;
  box-shadow: var(--box-shadow);
  width: var(--wrapper-width--narrow);
  border: var(--border-width) solid var(--primary);
  font-size: var(--font-size-sm);

  li {
    margin-left: 2rem;
    padding: 0.1rem;
    list-style-type: circle;
  }

  li:first-child {
    margin-top: 1rem;
  }

  input {
    cursor: pointer;
    border: var(--border-width) solid var(--primary);
    box-shadow: var(--box-shadow);
    border-radius: var(--roundness);
    font-size: 0.675rem;
    padding: 0.5rem;
    margin: 1rem 0.25rem 1rem 0.25rem;

    @media ${breakpoints.sm} {
      font-size: 0.9rem;
    }
  }

  /*  h2,
  p {
    margin-left: 0.5rem;
  }

  ul {
    font-size: var(--font-size-sm);
  } */
`

const Import = () => {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const appDispatch = useContext(GlobalDispatchContext)
  const router = useRouter()

  const resetFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  const requestHandler = async (arrayOfQuestions: ImportedAndSetQuestionType[]) => {
    try {
      const response = await fetch("/api/import-questions", {
        method: "POST",
        body: JSON.stringify(arrayOfQuestions),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = (await response.json()) as ResponseType
      if (data.message === "success") {
        setUploading(false)
        appDispatch({ type: "flashMessage", value: "Successfully imported questions" })
        void router.push("/manage")
        return
      } else {
        appDispatch({ type: "flashMessage", value: "There was a problem" })
        throw { message: "error", errors: "Import was not successful." }
      }
    } catch (err) {
      appDispatch({ type: "flashMessage", value: "Something went wrong" })
      setUploading(false)
      throw { message: "error", errors: err }
    }
  }

  //
  const importCsvHandler = () => {
    setUploading(true)
    const input = inputRef?.current
    const reader = new FileReader()

    if (input && !input.files) {
      appDispatch({ type: "flashMessage", value: "Please select a file to import" })
      setUploading(false)
      return
    }
    //eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-explicit-any
    const [file]: any = input!.files

    let csv: ParseResult<Record<string, string>>

    reader.onloadend = async event => {
      const csvString = event?.target?.result as string

      try {
        if (reader.error) {
          throw { message: "error", errors: reader.error }
        }
        if (!event) {
          throw { message: "error", errors: "Problem with the uploaded data" }
        }
        if (event && event.target && event.target.result) {
          //csv = parse(csvString, { header: true })
          parse(csvString, {
            header: true,
            complete: function (results: ParseResult<Record<string, string>>) {
              csv = results
            }
          })
        }

        if (csv && csv.data == null) {
          appDispatch({ type: "flashMessage", value: "Problem with the uploaded file format" })
          throw { message: "error", errors: "Problem with the uploaded data" }
        }

        resetFileInput()

        // need simple client-side validation here
        // make sure the file is not too large
        // see if there are nw attempted categories that do not yet exist

        // need to filter to remove last item to resolve issue caused by header row
        // need to map over csv.data to put into my format
        const arrayOfQuestions = csv.data
          .filter((item, index) => {
            if (index !== csv.data.length - 1) return item
          })
          .map(QRow => {
            return {
              type: "multiple",
              difficulty: "easy",
              category: QRow.category,
              question: QRow.question,
              correct_answer: QRow.correct_answer,
              incorrect_answers: [QRow.incorrect_answer_1, QRow.incorrect_answer_2, QRow.incorrect_answer_3]
            }
          })

        let vArrayOfQuestions: ImportedAndSetQuestionType[]

        interface ResultTypes {
          message: string
          data: ImportedAndSetQuestionType[]
        }

        const result: ResultTypes = clientValidateQuestionsArray(arrayOfQuestions)

        if (result.message !== "success") {
          throw { message: "error", errors: "client side validation failed" }
        }

        if (result.message === "success") {
          vArrayOfQuestions = result.data
          await requestHandler(vArrayOfQuestions)
        }
      } catch (err) {
        appDispatch({ type: "flashMessage", value: "Problem with the uploaded data" })
        throw { message: "Error", errors: err }
      }
    } // end onloadend function

    //if the http requst is commented uncomment the next lines
    setUploading(false)

    // Ensure there is a file selected
    if (!file) {
      appDispatch({ type: "flashMessage", value: "Please select a file to import" })
      setUploading(false)
      return { message: "error", errors: "Please select a file to import" }
    }

    if (file) {
      // this is what automaticaly calls onloadend
      //eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      reader.readAsText(file)
    }
  }

  return (
    <ImportContainer>
      <h2>Import Questions</h2>
      <p>Uploading Questions via a CSV file is suppported.</p>
      <ul>
        To ensure a successful import, please have the following column headings:
        <li>category</li>
        <li>question</li>
        <li>correct_answer</li>
        <li>incorrect_answer_1</li>
        <li>incorrrect_answer_2</li>
        <li>incorrect_answer_3</li>
      </ul>
      <input disabled={uploading} type="file" ref={inputRef} onChange={e => e.target.value} />
      <BtnPrimary onClick={importCsvHandler} disabled={uploading}>
        {uploading ? "Importing..." : "Import"}
      </BtnPrimary>
    </ImportContainer>
  )
}

export default Import
