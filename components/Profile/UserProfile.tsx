import { useContext } from "react"
import { GlobalDispatchContext } from "../../store/GlobalContext"
import ProfileForm from "./ProfileForm"
import { SectionTitle } from "../../styles/GlobalComponents"
import { ResponseType, UpdatePassTypes } from "../../lib/types"

const UserProfile = () => {
  const appDispatch = useContext(GlobalDispatchContext)

  async function changePasswordHandler(passwordData: UpdatePassTypes) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = (await response.json()) as ResponseType
    if (result.message !== "success") {
      appDispatch({ type: "flashMessage", value: "Password could not be updated" })
    }
    if (result.message === "success") {
      appDispatch({ type: "flashMessage", value: "Password updated" })
    }
  }

  return (
    <>
      <SectionTitle>Update Password</SectionTitle>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </>
  )
}

export default UserProfile
