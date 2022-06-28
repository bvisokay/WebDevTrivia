import { useRouter } from "next/router"
import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"

import AuthForm from "../components/AuthForm/AuthForm"

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getSession()
      .then(session => {
        if (session) {
          void router.replace("/")
        } else {
          setIsLoading(false)
        }
      })
      .catch((err: unknown) => {
        throw { message: "Error", errors: err }
      })
  }, [router])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return <AuthForm />
}

export default AuthPage
