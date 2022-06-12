import { BtnSmall } from "../../styles/GlobalComponents/Button"
import { IoWarning } from "react-icons/io5"
import styled from "styled-components"

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

const DeleteCategoryModal = (props: any) => {
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
      .then(data => {
        // if the db operation is successful then update the UI
        if (data.message == "success") {
          // deletion of category successful so update the UI on Admin comp
          // categories
          const updatedCategories = props.categories.filter((item: any) => {
            return item.name !== catToDelete
          })
          props.setCategories([...updatedCategories])
          // questions with deleted category need to be updated
          const updatedQuestions = props.allQuestions.filter((item: any) => {
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
