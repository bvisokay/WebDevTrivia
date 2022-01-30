import { BtnSmall } from "../../styles/GlobalComponents/Button"

const DeleteCategoryModal = (props: any) => {
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
        //console.log(data)
        // if the db operation is successful then update the UI
        if (data.message == "success") {
          // update successful so update the UI on Admin comp
          // categories is not an array of objects it is just an array of strings
          const updatedCategories = props.categories.filter((item: any) => {
            item !== catToDelete
          })
          props.setCategories([...updatedCategories])
        }
      })
      .catch(err => console.log(err))
  }

  const confirmDeleteHandler = () => {
    // send http request passing the name of the category to delete
    actuallyDeleteCategoryInDB(props.tgtCategory)

    // close the modal
    props.closeModalHandler()
  }

  return (
    <div className="modal">
      <p>Are you sure you want to delete this item?</p>
      <BtnSmall onClick={props.closeModalHandler}>Cancel</BtnSmall>
      <BtnSmall onClick={confirmDeleteHandler}>Confirm</BtnSmall>
    </div>
  )
}

export default DeleteCategoryModal
