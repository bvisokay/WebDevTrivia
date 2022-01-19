import { BtnSmall } from "../../styles/GlobalComponents/Button"

const DeleteQuestionModal = (props: any) => {
  const actuallyDeleteQuestionInDB = (qToDelete: any) => {
    // send a patch request to an api route
    //send valid data
    fetch("/api/questions", {
      method: "DELETE",
      body: JSON.stringify(qToDelete),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        response.json()
      })
      .then(data => {
        //console.log(data)
      })
      .catch(err => console.log(err))
  }

  const deleteHandler = () => {
    console.log(props.tgtQuestion)

    // delete in DB
    // probably don't need to send the entire questionObj
    // refactor to just send the id, and maybe the category?
    actuallyDeleteQuestionInDB(props.tgtQuestion)
    // update the UI
    const updatedQuestions = props.allQuestions.filter((item: any) => {
      if (item.id !== props.tgtQuestion.id) {
        return item
      }
    })
    props.setAllQuestions([...updatedQuestions])

    // close the modal after deleting
    props.closeModalHandler()
  }

  return (
    <div className="modal">
      <p>Are you sure you want to delete this item?</p>
      <BtnSmall onClick={props.closeModalHandler}>Cancel</BtnSmall>
      <BtnSmall onClick={deleteHandler}>Confirm</BtnSmall>
    </div>
  )
}

export default DeleteQuestionModal
