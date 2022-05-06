import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "../../hooks/useSession"
import LoggedIn from "./LoggedIn"
import LoggedOut from "./LoggedOut"

const Header = () => {
  const { session } = useSession()

  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Toolbar>
        <Link href={session ? "/home" : "/"} passHref>
          <Box
            sx={{
              display: "inline",
              cursor: "pointer",
              py: 1,
            }}
          >
            <Image
              src="/rose.png"
              alt="Bloom"
              width={32}
              height={32}
              priority
            />
          </Box>
        </Link>

        <Link href={session ? "/home" : "/"} passHref>
          <Box sx={{ cursor: "pointer" }}>
            <Typography
              color="textPrimary"
              sx={{ fontSize: 24, ml: 1, letterSpacing: 1, fontWeight: 700 }}
            >
              <b>Bloom</b>
            </Typography>
          </Box>
        </Link>

        {/* Somehow sets to the right of the app bar marginRight not needed here, but could play with positioning */}
        <section style={{ marginLeft: "auto", marginRight: 0 }}>
          {session ? <LoggedIn /> : <LoggedOut />}
        </section>
      </Toolbar>
    </AppBar>
  )
}

export default Header
