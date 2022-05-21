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
import Image from "next/image"
import LoginForm from "../components/forms/LoginForm"
import { LoadingButton } from "@mui/lab"

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
        email: "assembly@swiftbadminton.com",
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
          <Box sx={{ mt: 2 }}>
            <Image
              src="/assembly.png"
              alt="AssemblyAI"
              width={376}
              height={76}
            />
          </Box>
          <Typography sx={{ mt: 2 }}>
            Welcome to the Swift Badminton membership site! Our video
            transcripts are powered by AssmeblyAI.
          </Typography>

          <Typography sx={{ mt: 2 }}>
            One click login for your VIP account, just for you :)
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
