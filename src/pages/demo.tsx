import { LoadingButton } from "@mui/lab"
import {
  Box,
  Container,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { useReward } from "react-rewards"
import LoginForm from "../components/forms/LoginForm"

const Page = () => {
  const [loading, setLoading] = useState(false)

  const { reward } = useReward("rewardId", "confetti", {
    lifetime: 5000,
    spread: 100,
    decay: 0.96,
    elementCount: 50,
  })

  const onClick = async () => {
    setLoading(true)
    reward()

    setTimeout(async () => {
      await signIn("credentials", {
        email: "demo@swiftbadminton.com",
        password: process.env.NEXT_PUBLIC_DEMO_PASSWORD,
        callbackUrl: "/ff",
      })
    }, 1500)
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2">Log in</Typography>
      </Box>

      <Dialog open={true} sx={{ mb: 30 }}>
        <DialogContent>
          <Box sx={{ mt: 2 }}>{/* @ts-ignore */}</Box>
          <Typography sx={{ mt: 2 }}>
            Welcome to the Swift Badminton membership site! Click below for easy
            one-click login, just for you :)
          </Typography>
          <LoadingButton
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", mt: 2, fontFamily: "none" }}
            fullWidth
            size="large"
            onClick={onClick}
            id="rewardId"
            loading={loading}
          >
            ❤️
          </LoadingButton>
        </DialogContent>
      </Dialog>
      <LoginForm setLoading={setLoading} />

      <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
        <Link href="/forgot-password">Forgot password?</Link>
      </Typography>
    </Container>
  )
}

export default Page
