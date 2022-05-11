import { Box, Container, LinearProgress, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { useState } from "react"
import NewPasswordForm from "../components/forms/NewPasswordForm"

const Page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { session } = router.query as { session: string }

  return (
    <>
      {loading && <LinearProgress />}
      <Container maxWidth="xs">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2">Set your password</Typography>
        </Box>

        <NewPasswordForm setLoading={setLoading} sessionId={session} />
      </Container>
    </>
  )
}

export default Page
