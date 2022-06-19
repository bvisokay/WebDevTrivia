import { useState, useRef, useContext } from "react"
import Papa from "papaparse"
import { GlobalDispatchContext } from "../store/GlobalContext"
import Router, { useRouter } from "next/router"
import { clientValidateQuestionsArray } from "../lib/util"

// styled comps
import { BtnPrimary } from "../styles/GlobalComponents/Button"
import styled from "styled-components"
import { breakpoints } from "../styles/breakpoints"

const ImportContainer = styled.div`
  color: white;
  background-color: var(--transparent-dark);
  border-radius: 0.5rem;
  margin: 0 auto;
  padding: 1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  input {
    cursor: pointer;
    border: 2px solid var(--primary);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 0.5rem;
    font-size: 0.675rem;
    padding: 0.5rem;
    margin: 0.5rem 0.25rem 0.25rem 0.25rem;

    @media ${breakpoints.sm} {
      font-size: 0.9rem;
    }
  }

  p {
    margin-left: 0.5rem;
  }
`

const Import = props => {
  //console.log("props.categories: ", props.categories) // front-end validation to see if categories exist
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef()
  const appDispatch = useContext(GlobalDispatchContext)
  const router = useRouter()

  //
  const resetFileInput = () => {
    inputRef.current.value = ""
  }

  //
  const requestHandler = async arrayOfQuestions => {
    // send request

    // CANNOT USE await in non-async function
    try {
      console.log("Sending Request")
      const response = await fetch("/api/import-questions", {
        method: "POST",
        body: JSON.stringify(arrayOfQuestions),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()
      console.log(data)
      // is api request set up to return a success message?
      if (data.message === "success") {
        setUploading(false)
        appDispatch({ type: "flashMessage", value: data.data ? data.data : "Successfully imported questions" })
        //router.push("/manage")
        return
      } else {
        appDispatch({ type: "flashMessage", value: "There was a problem" })
        throw { message: "error", errors: data.errors ? data.errors : `Import was not successful.` }
      }
    } catch (err) {
      appDispatch({ type: "flashMessage", value: "Something went wrong" })
      setUploading(false)
      throw { message: "error", errors: `${err.errors ? err.errors : `Catch Error: ${err}`}` }
    }
  }

  //
  const importCsvHandler = () => {
    setUploading(true)
    const input = inputRef?.current
    const reader = new FileReader()
    const [file] = input.files

    let csv
    reader.onloadend = async ({ target }) => {
      try {
        if (reader.error) {
          throw { message: "error", errors: `Error with upload: ${reader.error}` }
        }
        csv = Papa.parse(target.result, { header: true })

        if (csv.errors.length) {
          console.log("csv.errors: ", csv.errors)
          //file = null throws error that the file is read-only
          //throw { message: "error", errors: "Check the imported file and try again" }
        }

        if (csv.data == null) {
          console.log("csv.data is null...")
          appDispatch({ type: "flashMessage", value: "Problem with the uploaded file format" })
          throw { message: "error", errors: "Problem with the uploaded data" }
        }

        //console.log("csv: ", csv)
        console.log("csv.data: ", csv.data)

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
              category: QRow.category,
              question: QRow.question,
              correct_answer: QRow.correct_answer,
              incorrect_answers: [QRow.incorrect_answer_1, QRow.incorrect_answer_2, QRow.incorrect_answer_3]
            }
          })

        let vArrayOfQuestions

        const result = clientValidateQuestionsArray(arrayOfQuestions)

        if (result.message !== "success") {
          throw { message: "error", errors: "client side validation failed" }
        }

        if (result.message === "success") {
          vArrayOfQuestions = result.data
        }

        if (vArrayOfQuestions && vArrayOfQuestions.length) {
          //console.log("arrayOfQuestions: ", arrayOfQuestions)
          await requestHandler(vArrayOfQuestions)
        }
      } catch (err) {
        console.log(`Catch Error: ${err.errors ? err.errors : err}`)
        appDispatch({ type: "flashMessage", value: `Error: ${err.errors ? err.errors : err}` })
        return { message: "error", errors: "Problem with the uploaded data" }
      }
    } // end onloadend function

    //if the http requst is commented uncomment the next lines
    setUploading(false)

    // Ensure there is a file selected
    if (file == null) {
      appDispatch({ type: "flashMessage", value: "Please select a file to import" })
      setUploading(false)
    } else {
      // this is what automaticaly calls onloadend
      reader.readAsText(file)
    }
  }

  return (
    <ImportContainer>
      <p>Uploading Questions via a CSV file is suppported.</p>
      <p>To ensure a successful import, please have the following column headings: category, question, correct_answer, incorrect_answer_1, incorrrect_answer_2, incorrect_answer_3</p>
      <input ref={inputRef} disabled={uploading} type="file" onChange={e => e.target.value} />
      <BtnPrimary onClick={importCsvHandler} disabled={uploading}>
        {uploading ? "Importing..." : "Import"}
      </BtnPrimary>
    </ImportContainer>
  )
}

export default Import
