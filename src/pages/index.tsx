import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSession } from "../hooks/useSession"

const LandingPage = () => {
  const router = useRouter()
  const { session } = useSession()

  useEffect(() => {
    if (session) {
      router.push("/home")
    }
  }, [session, router])

  return (
    <div>
      <p>foo</p>
    </div>
  )
}

export default LandingPage
