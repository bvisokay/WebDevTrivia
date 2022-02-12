import ProfileForm from "./ProfileForm"
import { SectionTitle } from "../../styles/GlobalComponents"

const UserProfile = () => {
  async function changePasswordHandler(passwordData: any) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json()
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
