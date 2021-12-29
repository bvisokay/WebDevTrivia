import { useRouter } from "next/router"
import { getSession } from "next-auth/client"
import { useEffect, useState } from "react"

import UserProfile from "../components/profile/UserProfile"

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

  return <UserProfile />
}

export default Profile
