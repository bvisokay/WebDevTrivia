import React, { useRef } from "react"
import { SectionNarrow, SectionTitle, FormControl } from "../../styles/GlobalComponents"
import { BtnTertiary } from "../../styles/GlobalComponents/Button"

const NewQuestionForm: React.FC = () => {
  const categoryInputRef = useRef<HTMLInputElement>(null)

  function newCategoryHandler(e: React.FormEvent) {
    e.preventDefault()

    // fetch user input
    const enteredCategory = categoryInputRef.current!.value

    // Trim and replace with dash, category ends up in url
    // How can we unreplace
    const trimmedCategory = enteredCategory.trim().replace(/ /g, "-")

    //send valid data
    fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(trimmedCategory),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        response.json()
      })
      .then(data => {
        console.log(data)
      })

    // clear form inputs
    categoryInputRef.current!.value = ""
  }

  return (
    <SectionNarrow>
      <SectionTitle>Add New Category</SectionTitle>
      <form onSubmit={newCategoryHandler}>
        <FormControl>
          <label htmlFor="">Category</label>
          <input aria-label="Category" type="text" ref={categoryInputRef} />
        </FormControl>
        <BtnTertiary>Submit</BtnTertiary>
      </form>
    </SectionNarrow>
  )
}

export default NewQuestionForm
