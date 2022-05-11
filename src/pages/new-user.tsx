import { Typography, Container } from "@mui/material"
import { useRouter } from "next/router"

const Page = () => {
  const router = useRouter()
  const { session } = router.query

  return (
    <Container>
      <Typography>new-user</Typography>
    </Container>
  )
}

export default Page
