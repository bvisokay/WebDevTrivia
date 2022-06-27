//comps
import { BtnSmall } from "../../styles/GlobalComponents/Button"
//types
import { CategoryObj, QuestionOnClientTypes, ResponseType } from "../../lib/types"
//styles
import { IoWarning } from "react-icons/io5"
import styled from "styled-components"
import React from "react"

const ModalTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  svg {
    font-size: 1.25rem;
    color: orangered;
    margin-right: 0.5rem;
  }
`

interface DeleteCategoryModalProps {
  tgtCategory: CategoryObj
  closeModalHandler: () => void
  categories: CategoryObj[]
  setCategories: (arg: CategoryObj[]) => void
  //setCategories: (arg: React.Dispatch<React.SetStateAction<CategoryObj[]>>) => void
  catFilter: string
  setCatFilter: (arg: string) => void
  allQuestions: QuestionOnClientTypes[]
  //setAllQuestions: (arg: React.Dispatch<React.SetStateAction<QuestionOnClientTypes[]>>) => void
  setAllQuestions: (arg: QuestionOnClientTypes[]) => void
}

const DeleteCategoryModal = (props: DeleteCategoryModalProps) => {
  //
  //
  //
  console.log("props.tgtCategory: ", props.tgtCategory)
  console.log("props keys: ", Object.keys(props))
  //console.log("props.categories: ", props.categories)
  //
  //
  //

  const actuallyDeleteCategoryInDB = (catToDelete: string) => {
    // send a patch request to an api route
    //send valid data
    fetch("/api/categories", {
      method: "DELETE",
      body: JSON.stringify(catToDelete),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((data: ResponseType) => {
        // if the db operation is successful then update the UI
        if (data.message == "success") {
          // deletion of category successful so update the UI on Admin comp
          // categories
          const updatedCategories = props.categories.filter(item => {
            return item.name !== catToDelete
          })
          props.setCategories([...updatedCategories])
          // remove filter if it matches deleted category
          if (props.catFilter === catToDelete) {
            props.setCatFilter("")
          }
          // questions with deleted category need to be updated
          const updatedQuestions = props.allQuestions.filter(item => {
            if (item.category !== catToDelete) {
              return item
            }
          })
          console.log("updatedQuestions: ", updatedQuestions)
          props.setAllQuestions([...updatedQuestions])
        }
      })
      .catch(err => console.log(err))
  }

  const confirmDeleteHandler = () => {
    // send http request passing the name of the category to delete
    actuallyDeleteCategoryInDB(props.tgtCategory.name)

    // close the modal
    props.closeModalHandler()
  }

  return (
    <div className="modal">
      <ModalTitle>
        <IoWarning />
        <strong>Delete Category?</strong>
      </ModalTitle>
      <p>
        Delete {props.tgtCategory.tally === 1 ? `the one question` : `all ${props.tgtCategory.tally} questions`} in &apos;{props.tgtCategory.name}&apos;?
      </p>
      <p>This action cannot be undone.</p>
      <BtnSmall autoFocus onClick={props.closeModalHandler}>
        Cancel
      </BtnSmall>
      <BtnSmall onClick={confirmDeleteHandler}>Confirm</BtnSmall>
    </div>
  )
}

export default DeleteCategoryModal
