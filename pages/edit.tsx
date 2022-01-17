import { useRouter } from "next/router"
import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"

import { SectionNarrow } from "../styles/GlobalComponents"

const Edit = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        router.replace("/auth")
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <SectionNarrow>
      <h6 style={{ textAlign: "right" }}>Username</h6>
      <h1>Edit</h1>
      <p>This page is meant for admins to be able to CRUD categories and questions.</p>
      <br />
      <p>Categories List with Summary Totals</p>
      <p>Question List Details</p>
      <h4>Features coming soon include:</h4>
      <ul>
        <li>See all the existing questions and categories to make edits if necesssary.</li>
        <li>Totals for categories</li>
        <li>CRUD all questions and categories here? Need to be able to edit existing questions.</li>
      </ul>
      <p></p>
      <p></p>
    </SectionNarrow>
  )
}

export default Edit
