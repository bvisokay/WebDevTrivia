import React, { useRef } from "react"

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
    <>
      <h1>Add New Category</h1>
      <form onSubmit={newCategoryHandler}>
        <div className="form-control">
          <label htmlFor="">Category</label>
          <input aria-label="Category" type="text" ref={categoryInputRef} />
        </div>
        <button className="addQSubmit" type="submit">
          Submit
        </button>
      </form>
    </>
  )
}

export default NewQuestionForm
