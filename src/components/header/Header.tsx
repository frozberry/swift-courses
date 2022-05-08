import { AppBar, Box, Toolbar, Typography } from "@mui/material"
import Link from "next/link"
import LoggedIn from "./LoggedIn"

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        // Display above drawer
        zIndex: (theme: any) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Link href="/" passHref>
          <Box sx={{ cursor: "pointer" }}>
            <Typography
              color="textPrimary"
              sx={{ fontSize: 20, ml: 1, letterSpacing: 1, fontWeight: 700 }}
            >
              <b>Swift Badminton</b>
            </Typography>
          </Box>
        </Link>

        {/* Somehow sets to the right of the app bar marginRight not needed here, but could play with positioning */}
        <section style={{ marginLeft: "auto", marginRight: 0 }}>
          <LoggedIn />
        </section>
      </Toolbar>
    </AppBar>
  )
}

export default Header
