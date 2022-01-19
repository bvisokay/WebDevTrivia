import { BtnSmall } from "../../styles/GlobalComponents/Button"

const deleteHandler = () => {
  alert("delete handler function ran")
}

const DeleteCategoryModal = (props: any) => {
  return (
    <div className="modal">
      <p>Are you sure you want to delete this item?</p>
      <BtnSmall onClick={props.closeModalHandler}>Cancel</BtnSmall>
      <BtnSmall onClick={deleteHandler}>Confirm</BtnSmall>
    </div>
  )
}

export default DeleteCategoryModal
