import ProfileForm from "./ProfileForm"
import { SectionNarrow } from "../../styles/GlobalComponents"

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
    <SectionNarrow>
      <h2>Your User Profile</h2>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </SectionNarrow>
  )
}

export default UserProfile
