import React, { useRef } from "react"

type userProfileProps = {
  onChangePassword: ({}) => void
}

const ProfileForm = (props: userProfileProps) => {
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const oldPasswordRef = useRef<HTMLInputElement>(null)

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    const enteredNewPassword = newPasswordRef.current!.value
    const enteredOldPassword = oldPasswordRef.current!.value
    // add validation
    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    })
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="old-password">Old Password</label>
        <input aria-label="Old Password" type="password" ref={oldPasswordRef} placeholder="Old password" />
      </div>
      <div className="form-control">
        <label htmlFor="new-password">New Password</label>
        <input aria-label="New Password" type="password" ref={newPasswordRef} placeholder="New password" />
      </div>
      <button className="changePW">Change Password</button>
    </form>
  )
}

export default ProfileForm
