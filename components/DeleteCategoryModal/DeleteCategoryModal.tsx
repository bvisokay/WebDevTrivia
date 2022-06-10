import { BtnSmall } from "../../styles/GlobalComponents/Button"

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
          const updatedQuestions = props.allQuestions.map((item: any) => {
            if (item.category.name == catToDelete) {
              return { ...item, category: "uncategorized" }
            } else {
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
      <p>Are you sure you want to delete {props.tgtCategory.name}?</p>
      <BtnSmall autoFocus onClick={props.closeModalHandler}>
        Cancel
      </BtnSmall>
      <BtnSmall onClick={confirmDeleteHandler}>Confirm</BtnSmall>
    </div>
  )
}

export default DeleteCategoryModal
