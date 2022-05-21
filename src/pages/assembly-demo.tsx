import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  Typography,
} from "@mui/material"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import { useReward } from "react-rewards"
import CourseOverview from "../components/CourseOverview"
import Footer from "../components/Footer"
import Header from "../components/header/Header"
import LoadingButton from "@mui/lab/LoadingButton"
import { CourseOverview as CourseOverviewType } from "../lib/types"

const courses: CourseOverviewType[] = [
  {
    name: "Footwork Fastlane",
    description:
      "The A-Z footwork course to get you moving to all 6 corners of the court with blinding speed and accuracy.",
    img: "/ff.png",
    lockedImg: "/ff-locked.png",
    link: "/ff",
    owned: true,
    code: "ff",
  },
  {
    name: "Power Pathway",
    description: "Learn to super-charge your smash and dominate your opponent.",
    img: "/pp.png",
    lockedImg: "/pp-locked.png",
    link: "/pp",
    owned: true,
    code: "pp",
  },
  {
    name: "King of the Court",
    description:
      "Learn to dictate the pace of rallies by injecting pace and using decisive acceleration.",
    img: "/kotc.png",
    lockedImg: "/kotc-locked.png",
    link: "/kotc",
    owned: true,
    code: "kotc",
  },
]

const LandingPage = () => {
  const [stripeLoading, setStripeLoading] = useState(false)
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
    <>
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
            Welcome to the Swift Badminton membership site! Check out our video
            transcripts, powered by AssemblyAI.
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Click below for one-click login and VIP access, just for you :)
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

      <Container maxWidth="md" sx={{ mt: 4 }}>
        {courses.map((course) => (
          <CourseOverview
            key={course.code}
            course={course}
            setStripeLoading={setStripeLoading}
          />
        ))}
        <Footer />
      </Container>
    </>
  )
}

export default LandingPage
