import { User } from ".prisma/client"
import { Box, Container, Grid, Toolbar, Typography } from "@mui/material"
import Link from "next/link"
import Header from "../components/header/Header"
import LinkButton from "../components/LinkButton"
import useAuthQuery from "../hooks/useAuthQuery"
import { getUserSelf } from "../services/client/accountClient"

type Course = {
  name: string
  description: string
  img: string
  lockedImg: string
  link: string
  owned: boolean
}

const LandingPage = () => {
  const { data, escape, component } = useAuthQuery("self", getUserSelf)
  if (escape) return component

  const user = data as User
  const courses: Course[] = [
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
      owned: user.kotc,
    },
  ]

  return (
    <>
      <Header />
      <Toolbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Box key={course.name} sx={{ display: "flex", my: 2 }}>
              <Box sx={{ maxWidth: "100%" }}>
                <Box sx={{ width: 400 }}>
                  <Link href={course.link} passHref>
                    <img
                      src={course.owned ? course.img : course.lockedImg}
                      alt={course.name}
                      style={{ maxWidth: "100%", cursor: "pointer" }}
                    />
                  </Link>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  px: 4,
                }}
              >
                <Typography variant="h5">{course.name}</Typography>
                <Typography>{course.description}</Typography>
                <Box>
                  {course.owned ? (
                    <LinkButton href={course.link} text="View course" />
                  ) : (
                    <LinkButton href={course.link} text="Unlock course" />
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default LandingPage
