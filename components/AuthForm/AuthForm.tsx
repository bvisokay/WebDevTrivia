import React, { useState, useRef } from "react"
import { signIn } from "next-auth/client"
import { useRouter } from "next/router"

import { SectionNarrow, FormControl, SectionTitle } from "../../styles/GlobalComponents"
import { BtnPrimary } from "../../styles/GlobalComponents/Button"
import { ResponseType } from "../../lib/types"

async function createUser(email: string, password: string) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json"
    }
  })

  const data = (await response.json()) as ResponseType

  if (!response.ok) {
    throw { message: "failure", errors: "something went wrong" }
  }

  return data
}

const AuthForm = () => {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const [isLogin, setIsLogin] = useState(true)

  const router = useRouter()

  function switchAuthModeHandler() {
    setIsLogin(prevState => !prevState)
  }

  async function submitHandler(event: React.FormEvent) {
    event.preventDefault()

    //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const enteredEmail = emailInputRef.current!.value
    //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const enteredPassword = passwordInputRef.current!.value

    // add client-side validation here

    if (isLogin) {
      // log user in with redirect to prevent redirect on login error
      const result = await signIn("credentials", { redirect: false, email: enteredEmail, password: enteredPassword })
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (!result!.error) {
        void router.replace("/manage")
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <SectionNarrow>
      <SectionTitle>{isLogin ? "Login" : "Sign Up"}</SectionTitle>
      <form onSubmit={void submitHandler}>
        <FormControl light={true}>
          <label htmlFor="email">Email</label>
          <input autoFocus autoComplete="off" type="email" id="email" required ref={emailInputRef} />
        </FormControl>
        <FormControl light={true}>
          <label htmlFor="password">Password</label>
          <input autoComplete="off" type="password" id="password" required ref={passwordInputRef} />
        </FormControl>
        <div>
          <BtnPrimary>{isLogin ? "Login" : "Create Account"}</BtnPrimary>
          <BtnPrimary onClick={switchAuthModeHandler}>{isLogin ? "Create new account" : "Login with existing account"}</BtnPrimary>
        </div>
      </form>
    </SectionNarrow>
  )
}

export default AuthForm
