import { User } from ".prisma/client"
import { Alert, Container, LinearProgress, Toolbar } from "@mui/material"
import { signOut } from "next-auth/react"
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
  if (data === "Oudated session ") {
    signOut()
    return null
  }
  if (escape) return component

  const user = data as User
  const courses = getCoursesOverview(user)

  const notAllCourses = !(user.ff && user.kotc && user.pp)

  return (
    <>
      <Header isAdmin={user.admin} />
      <Toolbar />

      {stripeLoading && <LinearProgress />}
      {notAllCourses && (
        <Alert variant="filled" severity="info">
          You are now eligible to unlock new courses
        </Alert>
      )}

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
