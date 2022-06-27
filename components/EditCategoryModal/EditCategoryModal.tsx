import { useState, useContext } from "react"
import { GlobalDispatchContext } from "../../store/GlobalContext"
//types
import { CategoryObj, QuestionOnClientTypes, ResponseType, UpdateCatNamesTypes } from "../../lib/types"
//styles
import { BtnSmall } from "../../styles/GlobalComponents/Button"
import { FormControl } from "../../styles/GlobalComponents"

interface EditCategoryModalProps {
  tgtCategory: CategoryObj
  closeModalHandler: () => void
  categories: CategoryObj[]
  setCategories: (arg: CategoryObj[]) => void
  catFilter: string
  setCatFilter: (arg: string) => void
  allQuestions: QuestionOnClientTypes[]
  setAllQuestions: (arg: QuestionOnClientTypes[]) => void
}

const EditCategoryModal = (props: EditCategoryModalProps) => {
  const appDispatch = useContext(GlobalDispatchContext)
  const [newCategoryName, setNewCategoryName] = useState<string>(props.tgtCategory.name)
  console.log("props.tgtCategory: ", props.tgtCategory)
  console.log("props keys: ", Object.keys(props))
  console.log("props.categories: ", props.categories)

  const actuallyUpdatecategoryInDB = (objToSend: UpdateCatNamesTypes) => {
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
      .then((data: ResponseType) => {
        //console.log(data)
        if (data.message == "success") {
          // update successful so update the UI on Admin comp
          // categories was originally just an array of strings
          // categories is now an array of objects
          const updatedCategories = props.categories.map((item: CategoryObj) => {
            if (item.name === objToSend.oldCategoryName) {
              item.name = objToSend.newCategoryName
              return item
            } else {
              return item
            }
          })
          console.log(updatedCategories)
          props.setCategories([...updatedCategories])
          // we also need to loop through questions and update those
          const updatedQuestions = props.allQuestions.filter((qObj: QuestionOnClientTypes) => {
            if (qObj.category === objToSend.oldCategoryName) {
              qObj.category = objToSend.newCategoryName
            }
            return qObj
          })
          console.log("updatedQuestions", updatedQuestions)
          props.setAllQuestions([...updatedQuestions])
          // remove filter if it matches deleted category
          if (props.catFilter === objToSend.oldCategoryName) {
            props.setCatFilter(objToSend.newCategoryName)
          }
          // Note: When a category is the current filter and is then edited successfully, the question tally total is lost and the filter, although updated, doesn't show the question
          // try to do the work here?
          console.log(props.categories)
        }
      })
      .catch(err => console.log(err))
  }

  const cancelEditHandler = () => {
    // reset state back to default and close modal
    setNewCategoryName(props.tgtCategory.name)
    props.closeModalHandler()
  }

  const confirmEditHandler = () => {
    console.log(newCategoryName)
    // client side validation
    if (newCategoryName == "") {
      setNewCategoryName(props.tgtCategory.name)
      appDispatch({ type: "flashMessage", value: "New name can not be left empty" })
    }
    if (newCategoryName.length <= 2) {
      setNewCategoryName(props.tgtCategory.name)
      appDispatch({ type: "flashMessage", value: "New name must be at least 3 characters" })
    }
    if (newCategoryName.length >= 41) {
      setNewCategoryName(props.tgtCategory.name)
      appDispatch({ type: "flashMessage", value: "New name cannot exceed 40 characters" })
    }
    // check that it is different
    if (newCategoryName == props.tgtCategory.name) {
      appDispatch({ type: "flashMessage", value: "New name cannot match the current name." })
      props.closeModalHandler()
    }
    // define object to send in HTTP request
    // make sure the new category has no spaces on the ends or between
    // again, needed for query parameters
    const trimmedCategory = newCategoryName.trim().toLowerCase().replace(/ /g, "-")
    const objToSend = {
      oldCategoryName: props.tgtCategory.name,
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
