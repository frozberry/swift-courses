import { User } from ".prisma/client"
import { Container, LinearProgress, Toolbar } from "@mui/material"
import { useState } from "react"
import getCoursesOverview from "../../courses-data/getOverview"
import CourseOverview from "../components/CourseOverview"
import Footer from "../components/Footer"
import Header from "../components/header/Header"
import useAuthQuery from "../hooks/useAuthQuery"
import { getUserSelf } from "../services/client/accountClient"

const LandingPage = () => {
  const [stripeLoading, setStripeLoading] = useState(false)

  const { data, escape, component } = useAuthQuery("self", getUserSelf)
  if (escape) return component

  const user = data as User
  const courses = getCoursesOverview(user)

  return (
    <>
      <Header />
      <Toolbar />
      {stripeLoading && <LinearProgress />}

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
