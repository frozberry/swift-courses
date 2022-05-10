import { Button, Container, Divider, Toolbar, Typography } from "@mui/material"
import { User } from "@prisma/client"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import Header from "../../components/header/Header"
import useAuthQuery from "../../hooks/useAuthQuery"
import { findUserById, toggleUserField } from "../../services/client/userClient"

const Page = () => {
  const router = useRouter()
  const { id } = router.query as { id: string }
  const { data, escape, component } = useAuthQuery(id, () => findUserById(id))
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    (field: string) => toggleUserField(id, field),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(id)
        toast.success("Succesfully updated")
      },
    }
  )

  if (escape) return component

  const user = data as User

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
        onClick={() => mutate("ff")}
      >
        {user.ff ? "Remove access" : "Add access"}
      </Button>
      <Typography>Power Pathway: {user.pp ? "✔️" : "❌ "}</Typography>
      <Button
        sx={{ textTransform: "none", mb: 3 }}
        variant="contained"
        color={user.pp ? "warning" : "primary"}
        onClick={() => mutate("pp")}
      >
        {user.pp ? "Remove access" : "Add access"}
      </Button>
      <Typography>King of the Court: {user.kotc ? "✔️" : "❌ "}</Typography>
      <Button
        sx={{ textTransform: "none", mb: 3 }}
        variant="contained"
        color={user.kotc ? "warning" : "primary"}
        onClick={() => mutate("kotc")}
      >
        {user.kotc ? "Remove access" : "Add access"}
      </Button>
      <Typography>Admin: {user.admin ? "✔️" : "❌ "}</Typography>
      <Button
        sx={{ textTransform: "none", mb: 3 }}
        variant="contained"
        color={user.admin ? "warning" : "primary"}
        onClick={() => mutate("admin")}
      >
        {user.admin ? "Remove access" : "Add access"}
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
