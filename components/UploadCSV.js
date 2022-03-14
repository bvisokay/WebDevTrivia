import { useState, useRef } from "react"
import Papa from "papaparse"

// styled comps
import { SectionNarrow, SectionTitle } from "../styles/GlobalComponents"
import { BtnTertiary } from "../styles/GlobalComponents/Button"

const UploadCSV = () => {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef()

  const handleUploadCSV = () => {
    setUploading(true)
    const input = inputRef?.current
    const reader = new FileReader()
    const [file] = input.files

    reader.onloadend = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true })

      if (csv.data == null) {
        console.log("csv.data is null...")
      }

      //console.log(csv.data)

      // Don't need useEffect to send request
      // onloadend handles the when

      // need to handle a question with category that doesn't already exist

      // need simple client-side validation here

      // need to filter to remove last item to resolve issue caused by header row
      // need to map over csv.data to put into my format
      const arrayOfQuestions = csv.data
        .filter((item, index) => {
          if (index !== csv.data.length - 1) return item
        })
        .map(QRow => {
          return {
            category: QRow.CATEGORY,
            type: "multiple",
            difficulty: "easy",
            question: QRow.QUESTION,
            correct_answer: QRow.Correct_Answer,
            incorrect_answers: [QRow.Incorrect_Answer_01, QRow.Incorrect_Answer_02, QRow.Incorrect_Answer_03]
          }
        })

      // send request

      // CANNOT USE await in non-async function
      try {
        const response = await fetch("/api/questions", {
          method: "POST",
          body: JSON.stringify(arrayOfQuestions),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await response.json()
        // is api request set up to return a success message?
        if (data.message == "success") {
          console.log("Import was a success")
          setUploading(false)
        }
        console.log(data)
      } catch (e) {
        console.log("Importing file failed. " + e)
        setUploading(false)
      }
    }

    // this is what automaticaly calls onloadend
    if (file == null) {
      alert("Please select a file")
      setUploading(false)
    } else {
      reader.readAsText(file)
    }
  }

  return (
    <SectionNarrow>
      <SectionTitle>Upload a CSV</SectionTitle>
      <input ref={inputRef} disabled={uploading} type="file" />
      <BtnTertiary onClick={handleUploadCSV} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </BtnTertiary>
    </SectionNarrow>
  )
}

export default UploadCSV
