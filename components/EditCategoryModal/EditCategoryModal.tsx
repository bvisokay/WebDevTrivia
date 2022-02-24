import { useState } from "react"
import { BtnSmall } from "../../styles/GlobalComponents/Button"
import { FormControl } from "../../styles/GlobalComponents"

const EditCategoryModal = (props: any) => {
  const [newCategoryName, setNewCategoryName] = useState<string>(props.tgtCategory)
  //console.log(props.tgtCategory)

  const actuallyUpdatecategoryInDB = (objToSend: any) => {
    // send a patch request to an api route
    //send valid data
    fetch("/api/categories", {
      method: "PATCH",
      body: JSON.stringify(objToSend),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        //console.log(data)
        if (data.message == "success") {
          // update successful so update the UI on Admin comp
          // categories is not an array of objects it is just an array of strings
          const updatedCategories = props.categories.map((item: any) => {
            if (item == objToSend.oldCategoryName) {
              return objToSend.newCategoryName
            } else {
              return item
            }
          })
          props.setCategories([...updatedCategories])
        }
      })
      .catch(err => console.log(err))
  }

  const cancelEditHandler = () => {
    // reset state back to default and close modal
    setNewCategoryName(props.tgtCategory)
    props.closeModalHandler()
  }

  const confirmEditHandler = () => {
    console.log(newCategoryName)
    // client side validation
    if (newCategoryName == "") {
      setNewCategoryName(props.tgtCategory)
      alert("New name can not be left empty")
    }
    if (newCategoryName.length <= 2) {
      setNewCategoryName(props.tgtCategory)
      alert("New name must be at least 3 characters.")
    }
    if (newCategoryName.length >= 41) {
      setNewCategoryName(props.tgtCategory)
      alert("New name cannot exceed 40 characters.")
    }
    // check that it is different
    if (newCategoryName == props.tgtCategory) {
      console.log("The new name cannot be the same as the current name.")
      props.closeModalHandler()
    }
    // define object to send in HTTP request
    // make sure the new category has no spaces on the ends or between
    // again, needed for query parameters
    const trimmedCategory = newCategoryName.trim().replace(/ /g, "-")
    const objToSend = {
      oldCategoryName: props.tgtCategory,
      newCategoryName: trimmedCategory
    }
    // if different send http request to update db
    actuallyUpdatecategoryInDB(objToSend)

    // close the modal
    props.closeModalHandler()
  }

  return (
    <div className="modal">
      <FormControl>
        <label htmlFor="">Edit Category Name</label>
        <input autoFocus aria-label="Category" type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
      </FormControl>
      <BtnSmall onClick={cancelEditHandler}>Cancel</BtnSmall>
      <BtnSmall onClick={confirmEditHandler}>Confirm</BtnSmall>
    </div>
  )
}

export default EditCategoryModal
