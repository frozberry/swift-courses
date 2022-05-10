import { User } from ".prisma/client"
import { LocalGasStation } from "@mui/icons-material"
import {
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material"
import Link from "next/link"
import Header from "../components/header/Header"
import LinkButton from "../components/LinkButton"
import useAuthQuery from "../hooks/useAuthQuery"
import { CourseCode } from "../lib/types"
import { getUserSelf } from "../services/client/accountClient"
import { stripeCheckout } from "../services/client/stripeClient"

type Course = {
  name: string
  description: string
  img: string
  lockedImg: string
  link: string
  owned: boolean
  code: CourseCode
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
      code: "ff",
    },
    {
      name: "Power Pathway",
      description:
        "Learn to super-charge your smash and dominate your opponent.",
      img: "/pp.png",
      lockedImg: "/pp-locked.png",
      link: "/pp",
      owned: user.pp,
      code: "pp",
    },
    {
      name: "King of the Court",
      description:
        "Learn to dictate the pace of rallies by injecting pace and using decisive acceleration.",
      img: "/kotc.png",
      lockedImg: "/kotc-locked.png",
      link: "/kotc",
      owned: user.kotc,
      code: "kotc",
    },
  ]

  const handleCheckout = async (courseCode: CourseCode) => {
    // setStripeLoading(true)
    await stripeCheckout(courseCode)
  }

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
                  {course.owned ? (
                    <Link href={course.link} passHref>
                      <img
                        src={course.owned ? course.img : course.lockedImg}
                        alt={course.name}
                        style={{ maxWidth: "100%", cursor: "pointer" }}
                      />
                    </Link>
                  ) : (
                    <img
                      src={course.owned ? course.img : course.lockedImg}
                      alt={course.name}
                      style={{ maxWidth: "100%", cursor: "pointer" }}
                      onClick={() => handleCheckout(course.code)}
                    />
                  )}
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
                    <Button
                      color="warning"
                      variant="contained"
                      sx={{ textTransform: "none" }}
                      size="large"
                      onClick={() => handleCheckout(course.code)}
                    >
                      Unlock Course
                    </Button>
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
