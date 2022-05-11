import MenuIcon from "@mui/icons-material/Menu"
import { Box, Menu, MenuItem } from "@mui/material"
import { signOut } from "next-auth/react"
import { useState } from "react"
import { HeaderButton, HeaderLink } from "./HeaderComponents"

type Props = {
  handleLogout: () => void
  isAdmin: boolean
}

const FullSize = ({ handleLogout, isAdmin }: Props) => {
  return (
    <Box sx={{ display: { xs: "none", sm: "initial" } }}>
      {isAdmin && <HeaderLink link="/admin">Admin</HeaderLink>}
      <HeaderLink link="/account">Account</HeaderLink>
      <HeaderButton onClick={handleLogout}>Log out</HeaderButton>
    </Box>
  )
}

const Mobile = ({ handleLogout, isAdmin }: Props) => {
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
        {isAdmin && (
          <MenuItem onClick={handleClose}>
            <HeaderLink link="/admin">Admin</HeaderLink>
          </MenuItem>
        )}
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

const LoggedIn = ({ isAdmin }: { isAdmin: boolean }) => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" })
  }
  return (
    <Box>
      <FullSize handleLogout={handleLogout} isAdmin={isAdmin} />
      <Mobile handleLogout={handleLogout} isAdmin={isAdmin} />
    </Box>
  )
}

export default LoggedIn
