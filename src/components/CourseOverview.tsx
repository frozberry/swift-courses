import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import { Dispatch, SetStateAction } from "react"
import toast from "react-hot-toast"
import LinkButton from "../components/LinkButton"
import { CourseCode, CourseOverview } from "../lib/types"
import { stripeCheckout } from "../services/client/stripeClient"
import Image from "next/image"

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
    <Box
      key={course.name}
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        my: 2,
      }}
    >
      <Box sx={{ maxWidth: 400 }}>
        {course.owned ? (
          <Link href={course.link} passHref>
            <Box sx={{ cursor: "pointer" }}>
              <Image
                width={1920}
                height={1080}
                src={course.img}
                alt={course.name}
              />
            </Box>
          </Link>
        ) : (
          <Box>
            <Image
              width={1920}
              height={1080}
              src={course.lockedImg}
              alt={course.name}
              style={{ cursor: "pointer" }}
              onClick={() => handleCheckout(course.code)}
            />
          </Box>
        )}
        {/* </Box> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          px: {
            xs: 0,
            sm: 4,
          },
          py: {
            xs: 2,
            sm: 0,
          },
        }}
      >
        <Typography variant="h5">{course.name}</Typography>
        <Typography>{course.description}</Typography>
        <Box
          sx={{
            mt: { xs: 2, sm: 0 },
          }}
        >
          {course.owned ? (
            <LinkButton href={course.link} text="View Course" />
          ) : (
            <Button
              color="warning"
              variant="contained"
              sx={{
                textTransform: "none",
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
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
