import { Typography, Container, Toolbar, Divider, Button } from "@mui/material"
import { User } from "@prisma/client"
import { useRouter } from "next/router"
import Header from "../../components/header/Header"
import useAuthQuery from "../../hooks/useAuthQuery"
import { findUserById } from "../../services/client/userClient"

const Page = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data, escape, component } = useAuthQuery(id, () => findUserById(id))
  if (escape) return component

  const user = data as User
  console.log(user)
  return (
    <Container sx={{ mt: 4 }}>
      <Header />
      <Toolbar />

      <Typography>{user.email}</Typography>
      <Typography>{user.name}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography>Footwork Fastlane: {user.ff ? "✔️" : "❌ "}</Typography>
      <Button
        sx={{ textTransform: "none", mb: 3 }}
        variant="contained"
        color={user.ff ? "warning" : "primary"}
      >
        {user.ff ? "Remove access" : "Add access"}
      </Button>
      <Typography>Power Pathway: {user.pp ? "✔️" : "❌ "}</Typography>
      <Button
        sx={{ textTransform: "none", mb: 3 }}
        variant="contained"
        color={user.pp ? "warning" : "primary"}
      >
        {user.pp ? "Remove access" : "Add access"}
      </Button>
      <Typography>King of the Court: {user.kotc ? "✔️" : "❌ "}</Typography>
      <Button
        sx={{ textTransform: "none", mb: 3 }}
        variant="contained"
        color={user.kotc ? "warning" : "primary"}
      >
        {user.kotc ? "Remove access" : "Add access"}
      </Button>
      <Typography>Admin: {user.admin ? "✔️" : "❌ "}</Typography>
      <Button
        sx={{ textTransform: "none", mb: 3 }}
        variant="contained"
        color={user.admin ? "warning" : "primary"}
      >
        {user.ff ? "Remove access" : "Add access"}
      </Button>
      <Typography>Logged in: {user.loggedIn ? "✔️" : "❌ "}</Typography>
      <Typography>{user.id}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography>Stripe ID: {user.stripeId}</Typography>
      <Typography>{user.createdAt}</Typography>
      <Typography>FF Date: {user.ffDate}</Typography>
      <Typography>PP Date: {user.ppDate}</Typography>
      <Typography>KotC Date: {user.kotcDate}</Typography>
    </Container>
  )
}

export default Page
