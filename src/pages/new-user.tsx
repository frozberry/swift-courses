import { Box, Container, LinearProgress, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import NewPasswordForm from "../components/forms/NewPasswordForm"
import Image from "next/image"

const Page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { session } = router.query as { session: string }

  return (
    <>
      {loading && <LinearProgress />}
      <Container maxWidth="xs" sx={{ mt: 4 }}>
        <Typography variant="h3" sx={{ mb: 2, textAlign: "center" }}>
          Congratulations on enrolling!
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Image width={256} height={256} alt="Welcome" src="/medal.png" />
        </Box>
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" sx={{ textAlign: "center" }}>
            Set your password to continue to your account
          </Typography>
        </Box>

        <NewPasswordForm setLoading={setLoading} sessionId={session} />
      </Container>
    </>
  )
}

export default Page
