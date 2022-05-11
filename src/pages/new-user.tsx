import { Typography, Container } from "@mui/material"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/router"
import NewPasswordForm from "../components/forms/NewPasswordForm"
import useAuthQuery from "../hooks/useAuthQuery"

const getCheckoutUser = async (sessionId: string) => {
  const res = await axios.get<User>(
    `/api/stripe/checkout?sessionId=${sessionId}`
  )
  return res.data
}

const Page = () => {
  const router = useRouter()
  const { session } = router.query as { session: string }
  const { data, escape, component } = useAuthQuery(
    session,
    () => getCheckoutUser(session),
    true
  )
  if (escape) return component
  const user = data as User

  return (
    <Container>
      <Typography>new-user</Typography>
      <NewPasswordForm email={user.email} />
    </Container>
  )
}

export default Page
