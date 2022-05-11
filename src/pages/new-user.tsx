import { Typography, Container } from "@mui/material"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/router"
import NewPasswordForm from "../components/forms/NewPasswordForm"
import useAuthQuery from "../hooks/useAuthQuery"

const Page = () => {
  const router = useRouter()
  const { session } = router.query as { session: string }

  return (
    <Container>
      <Typography>new-user</Typography>
      <NewPasswordForm sessionId={session} />
    </Container>
  )
}

export default Page
