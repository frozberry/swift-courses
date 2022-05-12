import {
  Typography,
  Container,
  Box,
  Button,
  Toolbar,
  Divider,
  TextField,
} from "@mui/material"
import { User } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import Header from "../../components/header/Header"
import useAuthQuery from "../../hooks/useAuthQuery"
import { getAllUsers } from "../../services/client/userClient"

const Page = () => {
  const [reversed, setReversed] = useState(false)
  const [search, setSearch] = useState("")
  const { data, escape, component } = useAuthQuery("allUsers", getAllUsers)
  if (escape) return component

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const users = data as User[]
  const admin = users.filter((user) => user.admin)

  const orderedUsers = reversed ? users.reverse() : users
  const searchUsers = orderedUsers.filter((user) => user.email.includes(search))
  const withAdmin = [...admin, ...searchUsers]
  return (
    <Container sx={{ mt: 4 }}>
      <Header />
      <Toolbar />
      <Box sx={{ mb: 2 }}>
        <TextField value={search} onChange={handleChange} />
      </Box>
      <Button
        variant="contained"
        onClick={() => setReversed(!reversed)}
        sx={{ mb: 2 }}
      >
        Reverse
      </Button>

      {withAdmin.map((user) => (
        <Link href={`/admin/${user.id}`} passHref key={user.id}>
          <a style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ cursor: "pointer" }}>
              <Typography>{user.email}</Typography>
              <Typography>{user.name}</Typography>
              <Typography>
                Footwork Fastlane: {user.ff ? "✔️" : "❌ "}
              </Typography>
              <Typography>Power Pathway: {user.pp ? "✔️" : "❌ "}</Typography>
              <Typography>
                King of the Court: {user.kotc ? "✔️" : "❌ "}
              </Typography>
              <Typography>
                Password set: {user.passwordSet ? "✔️" : "❌ "}
              </Typography>
              <Typography>Admin: {user.admin ? "✔️" : "❌ "}</Typography>
              <Divider sx={{ my: 4 }} />
            </Box>
          </a>
        </Link>
      ))}
    </Container>
  )
}

export default Page
