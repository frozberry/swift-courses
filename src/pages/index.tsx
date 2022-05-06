import { Box, Button, Container, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSession } from "../hooks/useSession"

const courses = [
  {
    name: "Footwork Fastlane",
    description: "foo",
    img: "url",
    lockedImg: "url",
    link: "/ff",
  },
  {
    name: "Power Pathway",
    description: "Learn to super-charge your smash and dominate your opponent.",
    img: "url",
    lockedImg: "url",
    link: "/ff",
  },
  {
    name: "King of the Court",
    description:
      "Learn to dictate the pace of rallies by injecting pace and using decisive acceleration.",
    img: "url",
    lockedImg: "pp",
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
      {courses.map((course) => (
        <Box key={course.name} sx={{ display: "flex", my: 4 }}>
          <Box>
            <Box sx={{ width: 400, height: 200, backgroundColor: "blue" }} />
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
    </Container>
  )
}

export default LandingPage
