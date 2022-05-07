import { Box, Container, Typography } from "@mui/material"
import { useRouter } from "next/router"
import ChangePasswordForm from "../components/forms/ChangePasswordForm"
import { useSession } from "../hooks/useSession"
import { MySession } from "../lib/types"

export default function App() {
  const router = useRouter()
  const { session } = useSession() as { session: MySession }
  if (session === null) {
    router.push("/login")
    return null
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2">Change password</Typography>
      </Box>
      <ChangePasswordForm />
    </Container>
  )
}
