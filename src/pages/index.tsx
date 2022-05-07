import { Box, Button, Container, Grid, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import LinkButton from "../components/LinkButton"
import { useSession } from "../hooks/useSession"

const LandingPage = () => {
  const router = useRouter()
  const { session } = useSession()

  useEffect(() => {
    if (session) {
      router.push("/home")
    }
  }, [session, router])

  const user = {
    ff: true,
    pp: false,
    kotc: false,
  }

  const courses = [
    {
      name: "Footwork Fastlane",
      description:
        "The A-Z footwork course to get you moving to all 6 corners of the court with blinding speed and accuracy.",
      img: "/ff.png",
      lockedImg: "/ff-locked.png",
      link: "/ff",
      owned: user.ff,
    },
    {
      name: "Power Pathway",
      description:
        "Learn to super-charge your smash and dominate your opponent.",
      img: "/pp.png",
      lockedImg: "/pp-locked.png",
      link: "/pp",
      owned: user.pp,
    },
    {
      name: "King of the Court",
      description:
        "Learn to dictate the pace of rallies by injecting pace and using decisive acceleration.",
      img: "/kotc.png",
      lockedImg: "/kotc-locked.png",
      link: "/kotc",
      owner: user.kotc,
    },
  ]

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Box key={course.name} sx={{ display: "flex", my: 4 }}>
            <Box sx={{ maxWidth: "100%" }}>
              <Box sx={{ width: 400, height: 200 }}>
                <Link href={course.link} passHref>
                  <img
                    src={course.owned ? course.img : course.lockedImg}
                    alt={course.name}
                    style={{ maxWidth: "100%", cursor: "pointer" }}
                  />
                </Link>
              </Box>
            </Box>
            <Box>
              <Typography>{course.name}</Typography>
              <Typography>{course.description}</Typography>
              {course.owned ? (
                <LinkButton href={course.link} text="View course" />
              ) : (
                <LinkButton href={course.link} text="Unlock course" />
              )}
            </Box>
          </Box>
        ))}
      </Grid>
    </Container>
  )
}

export default LandingPage
