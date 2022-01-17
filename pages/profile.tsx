import { useRouter } from "next/router"
import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"

import UserProfileComp from "../components/Profile/UserProfile"

import { SectionNarrow } from "../styles/GlobalComponents"

const Profile = () => {
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
      <h2>Hello User</h2>
      <p>This is your profile page</p>
      <p>See all the user-specific content here </p>
      <p>CRUD all questions and categories here? Need to be able to edit existing questions.</p>
      <UserProfileComp />
    </SectionNarrow>
  )
}

export default Profile
