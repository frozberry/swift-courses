import MenuIcon from "@mui/icons-material/Menu"
import { Box, Menu, MenuItem } from "@mui/material"
import { signOut } from "next-auth/react"
import { useState } from "react"
import { HeaderButton, HeaderLink } from "./HeaderComponents"

type Props = {
  handleLogout: () => void
}

const FullSize = ({ handleLogout }: Props) => {
  return (
    <Box sx={{ display: { xs: "none", sm: "initial" } }}>
      <HeaderLink link="/results">Results</HeaderLink>
      <HeaderLink link="/stats">Stats</HeaderLink>
      <HeaderLink link="/account">Account</HeaderLink>
      <HeaderButton onClick={handleLogout}>Log out</HeaderButton>
    </Box>
  )
}

const Mobile = ({ handleLogout }: Props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ display: { xs: "initial", sm: "none" } }}>
      <MenuIcon
        fontSize="large"
        color="primary"
        sx={{ color: "black" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleMenu}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <HeaderLink link="/results">Results</HeaderLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <HeaderLink link="/stats">Stats</HeaderLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <HeaderLink link="/account">Account</HeaderLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <HeaderButton onClick={handleLogout}>Log out</HeaderButton>
        </MenuItem>
      </Menu>
    </Box>
  )
}

const LoggedIn = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/login` })
  }
  return (
    <Box>
      <FullSize handleLogout={handleLogout} />
      <Mobile handleLogout={handleLogout} />
    </Box>
  )
}

export default LoggedIn
