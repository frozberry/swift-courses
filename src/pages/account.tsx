import { Box, Container, Divider, Typography } from "@mui/material"
import { useRouter } from "next/router"
import ChangePasswordForm from "../components/forms/ChangePasswordForm"

export default function App() {
  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2">Change password</Typography>
      </Box>
      <ChangePasswordForm />
    </Container>
  )
}
