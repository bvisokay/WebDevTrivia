import React, { useRef } from "react"
import { UpdatePassTypes } from "../../lib/types"
import { FormControl } from "../../styles/GlobalComponents"
import { BtnPrimary } from "../../styles/GlobalComponents/Button"

type userProfileProps = {
  onChangePassword: (arg: UpdatePassTypes) => Promise<void>
}

const ProfileForm = (props: userProfileProps) => {
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const oldPasswordRef = useRef<HTMLInputElement>(null)

  function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const enteredNewPassword = newPasswordRef.current!.value
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const enteredOldPassword = oldPasswordRef.current!.value
    // add validation
    void props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    })
  }

  return (
    <form onSubmit={submitHandler}>
      <FormControl>
        <label htmlFor="old-password">Old Password</label>
        <input aria-label="Old Password" type="password" ref={oldPasswordRef} placeholder="Old password" />
      </FormControl>
      <FormControl>
        <label htmlFor="new-password">New Password</label>
        <input aria-label="New Password" type="password" ref={newPasswordRef} placeholder="New password" />
      </FormControl>
      <BtnPrimary>Change Password</BtnPrimary>
    </form>
  )
}

export default ProfileForm
