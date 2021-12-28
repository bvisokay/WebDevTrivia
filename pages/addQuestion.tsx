import { useState, useEffect } from "react"
import { getSession } from "next-auth/client"
// comps
import NewQuestionForm from "../components/input/NewQuestionForm"

const addQuestion = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        window.location.href = "/auth"
      } else {
        setIsLoading(false)
      }
    })
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  // redirect away if not logged in
  return (
    <div>
      <NewQuestionForm />
    </div>
  )
}

export default addQuestion
