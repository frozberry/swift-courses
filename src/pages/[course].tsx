import { Typography, Container } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/router"
import useAuthQuery from "../hooks/useAuthQuery"

const get = async () => {
  const res = await axios.get("/api/courses/ff")
  return res.data
}

const Page = () => {
  const router = useRouter()
  const { course } = router.query

  const { data, escape, component } = useAuthQuery("ff", get)
  if (escape) return component

  return (
    <Container>
      <Typography>{course}</Typography>
    </Container>
  )
}

export default Page
