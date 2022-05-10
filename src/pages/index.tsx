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
import getCoursesOverview from "../../courses-data/getOverview"
import Footer from "../components/Footer"
import Header from "../components/header/Header"
import LinkButton from "../components/LinkButton"
import useAuthQuery from "../hooks/useAuthQuery"
import { CourseCode } from "../lib/types"
import { getUserSelf } from "../services/client/accountClient"
import { stripeCheckout } from "../services/client/stripeClient"

const LandingPage = () => {
  const { data, escape, component } = useAuthQuery("self", getUserSelf)
  if (escape) return component

  const user = data as User
  const courses = getCoursesOverview(user)

  const handleCheckout = async (courseCode: CourseCode) => {
    // setStripeLoading(true)
    await stripeCheckout(courseCode)
  }

  return (
    <>
      <Header />
      <Toolbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* <Grid container spacing={3}> */}
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
                  <LinkButton href={course.link} text="View Course" />
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
        {/* </Grid> */}
        <Footer />
      </Container>
    </>
  )
}

export default LandingPage
