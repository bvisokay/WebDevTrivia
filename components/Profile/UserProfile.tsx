import ProfileForm from "./ProfileForm"
import { SectionTitle } from "../../styles/GlobalComponents"
import { ResponseType, UpdatePassTypes } from "../../lib/types"

const UserProfile = () => {
  async function changePasswordHandler(passwordData: UpdatePassTypes) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = (await response.json()) as ResponseType
    console.log(data)
  }

  return (
    <>
      <SectionTitle>Update Password</SectionTitle>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </>
  )
}

export default UserProfile
