import { useRouter } from "next/router"
import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"
import Link from "next/link"

import UserProfileComp from "../components/Profile/UserProfile"

import { SectionNarrow, SectionTitle, SectionText } from "../styles/GlobalComponents"

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    getSession()
      .then(session => {
        if (!session) {
          void router.replace("/auth")
        } else {
          setIsLoading(false)
        }
      })
      .catch(err => {
        console.log("There was an error")
        console.log(err)
      })
  }, [router])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <SectionNarrow>
      <SectionTitle>Hey There!</SectionTitle>
      <SectionText>
        Manage all question and categories{" "}
        <Link href="/admin">
          <a className="textLink">here</a>
        </Link>
        .
      </SectionText>

      <UserProfileComp />
    </SectionNarrow>
  )
}

export default Profile
