import { Box, Container, LinearProgress, Typography } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useReward } from "react-rewards"
import NewPasswordForm from "../components/forms/NewPasswordForm"
import { useSession } from "../hooks/useSession"
import { MySession } from "../lib/types"

const Page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { sessionId } = router.query as { sessionId: string }
  const { reward } = useReward("rewardId", "confetti", {
    lifetime: 5000,
    spread: 100,
    decay: 0.96,
    elementCount: 50,
  })
  const { session } = useSession() as { session: MySession }
  useEffect(() => {
    reward()
  })

  if (session) {
    router.push("/")
  }

  return (
    <>
      {loading && <LinearProgress />}
      <Container maxWidth="xs" sx={{ mt: 4 }}>
        <Typography variant="h3" sx={{ mb: 2, textAlign: "center" }}>
          Congratulations on enrolling!
        </Typography>
        <Box sx={{ textAlign: "center" }} id="rewardId">
          <Image width={256} height={256} alt="Welcome" src="/medal.png" />
        </Box>
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Set your password to continue to your account
          </Typography>
        </Box>

        <NewPasswordForm setLoading={setLoading} sessionId={sessionId} />
      </Container>
    </>
  )
}

export default Page
