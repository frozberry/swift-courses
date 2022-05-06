import { Box, Button, Container, Grid, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSession } from "../hooks/useSession"

const courses = [
  {
    name: "Footwork Fastlane",
    description:
      "The A-Z footwork course to get you moving to all 6 corners of the court with blinding speed and accuracy.",
    img: "/ff.png",
    lockedImg: "/ff-locked.png",
    link: "/ff",
  },
  {
    name: "Power Pathway",
    description: "Learn to super-charge your smash and dominate your opponent.",
    img: "/pp.png",
    lockedImg: "/pp-locked.png",
    link: "/ff",
  },
  {
    name: "King of the Court",
    description:
      "Learn to dictate the pace of rallies by injecting pace and using decisive acceleration.",
    img: "/kotc.png",
    lockedImg: "/kotc-locked.png",
    link: "/kotc",
  },
]

const LandingPage = () => {
  const router = useRouter()
  const { session } = useSession()

  useEffect(() => {
    if (session) {
      router.push("/home")
    }
  }, [session, router])

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Box key={course.name} sx={{ display: "flex", my: 4 }}>
            <Box sx={{ maxWidth: "100%" }}>
              <Box sx={{ width: 400, height: 200 }}>
                <img
                  src={course.img}
                  alt={course.name}
                  style={{ maxWidth: "100%" }}
                />
              </Box>
            </Box>
            <Box>
              <Typography>{course.name}</Typography>
              <Typography>{course.description}</Typography>
              <Link href="/ff" passHref>
                <Button color="primary" variant="contained">
                  View Course
                </Button>
              </Link>
            </Box>
          </Box>
        ))}
      </Grid>
    </Container>
  )
}

export default LandingPage
