import { BtnSmall } from "../../styles/GlobalComponents/Button"

const editHandler = () => {
  alert("edit handler function ran")
}

const EditCategoryModal = (props: any) => {
  return (
    <div className="modal">
      <p>Are you sure you want to delete this item?</p>
      <BtnSmall onClick={props.closeModalHandler}>Cancel</BtnSmall>
      <BtnSmall onClick={editHandler}>Confirm</BtnSmall>
    </div>
  )
}

export default EditCategoryModal
