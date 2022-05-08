import { User } from ".prisma/client"
import { Box, Container, Grid, Toolbar, Typography } from "@mui/material"
import Link from "next/link"
import Header from "../components/header/Header"
import LinkButton from "../components/LinkButton"
import useAuthQuery from "../hooks/useAuthQuery"
import { getUserSelf } from "../services/client/accountClient"

const LandingPage = () => {
  const { data, escape, component } = useAuthQuery("self", getUserSelf)
  if (escape) return component

  const user = data as User
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
    <>
      <Header />
      <Toolbar />
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
    </>
  )
}

export default LandingPage
