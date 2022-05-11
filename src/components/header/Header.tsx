import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import Link from "next/link"
import { useSession } from "../../hooks/useSession"
import { MySession } from "../../lib/types"
import LoggedIn from "./LoggedIn"

type Props = {
  handleDrawerToggle?: () => void
  menu?: boolean
  isAdmin?: boolean
}

const Header = ({
  handleDrawerToggle,
  menu = false,
  isAdmin = false,
}: Props) => {
  const { session } = useSession() as { session: MySession }
  console.log(session)

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
        {menu && (
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "black", mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Link href="/" passHref>
          <a style={{ textDecoration: "none" }}>
            <Box sx={{ cursor: "pointer" }}>
              <Typography
                color="textPrimary"
                sx={{ fontSize: 20, ml: 1, letterSpacing: 1, fontWeight: 700 }}
              >
                <b>Swift Badminton</b>
              </Typography>
            </Box>
          </a>
        </Link>

        {/* Somehow sets to the right of the app bar marginRight not needed here, but could play with positioning */}
        <section style={{ marginLeft: "auto", marginRight: 0 }}>
          <LoggedIn isAdmin={isAdmin} />
        </section>
      </Toolbar>
    </AppBar>
  )
}

export default Header
