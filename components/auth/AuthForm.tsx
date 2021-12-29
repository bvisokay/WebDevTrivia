import React, { useState, useRef } from "react"
import { signIn } from "next-auth/client"
import { useRouter } from "next/router"

async function createUser(email: string, password: string) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json"
    }
  })

  const data = response.json()

  if (!response.ok) {
    throw new Error("Something went wrong...")
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

    const enteredEmail = emailInputRef.current!.value
    const enteredPassword = passwordInputRef.current!.value

    // add client-side validation here

    if (isLogin) {
      // log user in with redirect to prevent redirect on login error
      const result = await signIn("credentials", { redirect: false, email: enteredEmail, password: enteredPassword })
      if (!result!.error) {
        router.replace("/addQuestion")
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
    <section>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className="formControl">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className="formControl">
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} />
        </div>
        <div>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button type="button" className="toggle" onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
