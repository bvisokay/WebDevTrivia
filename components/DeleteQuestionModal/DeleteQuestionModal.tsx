import { QuestionOnClientTypes, ResponseType } from "../../lib/types"
import { BtnSmall } from "../../styles/GlobalComponents/Button"
import { Modal } from "../../styles/GlobalComponents"

interface DeleteModalPropTypes {
  allQuestions: QuestionOnClientTypes[]
  closeModalHandler: () => void
  setAllQuestions: (arg: QuestionOnClientTypes[]) => void
  tgtQuestion: QuestionOnClientTypes | undefined
}

const DeleteQuestionModal = (props: DeleteModalPropTypes) => {
  const actuallyDeleteQuestionInDB = (qToDelete: QuestionOnClientTypes) => {
    // send a patch request to an api route
    //send valid data
    fetch("/api/questions", {
      method: "DELETE",
      body: JSON.stringify(qToDelete.id),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json()
      })
      .then((data: ResponseType) => {
        // only update UI if the db operation was a success
        if (data.message == "success") {
          // update the UI
          const updatedQuestions = props.allQuestions.filter((item: QuestionOnClientTypes) => {
            if (item.id !== props.tgtQuestion?.id) {
              return item
            }
          })
          props.setAllQuestions([...updatedQuestions])
        }
      })
      .catch((err: unknown) => {
        throw { message: "Error", errors: err }
      })
  }

  const deleteHandler = () => {
    // delete in DB
    // probably don't need to send the entire questionObj
    // refactor to just send the id, and maybe the category?
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    actuallyDeleteQuestionInDB(props.tgtQuestion!)
    props.closeModalHandler()
  }

  return (
    <Modal>
      <p>Are you sure you want to delete this item?</p>
      <BtnSmall autoFocus onClick={props.closeModalHandler}>
        Cancel
      </BtnSmall>
      <BtnSmall onClick={deleteHandler}>Confirm</BtnSmall>
    </Modal>
  )
}

export default DeleteQuestionModal
