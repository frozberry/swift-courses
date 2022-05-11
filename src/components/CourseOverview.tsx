import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"
import LinkButton from "../components/LinkButton"
import { CourseCode, CourseOverview } from "../lib/types"
import { stripeCheckout } from "../services/client/stripeClient"

type Props = {
  course: CourseOverview
  setStripeLoading: Dispatch<SetStateAction<boolean>>
}

const CourseComponent = ({ course, setStripeLoading }: Props) => {
  const handleCheckout = async (courseCode: CourseCode) => {
    try {
      setStripeLoading(true)
      await stripeCheckout(courseCode)
    } catch {
      toast.error("Sorry, an unexpected error occurred")
      setStripeLoading(false)
    }
  }
  return (
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
  )
}

export default CourseComponent
