import MenuIcon from "@mui/icons-material/Menu"
import { Box, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { HeaderLink } from "./HeaderComponents"

const FullSize = () => {
  return (
    <Box sx={{ display: { xs: "none", sm: "initial" } }}>
      <HeaderLink link="/pricing">Pricing</HeaderLink>
      <HeaderLink link="/contact">Contact</HeaderLink>
      <HeaderLink link="/login">Log in</HeaderLink>
      <HeaderLink link="/signup" emphasis={true}>
        Get Started
      </HeaderLink>
    </Box>
  )
}

const Mobile = () => {
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
          <HeaderLink link="/pricing">Pricing</HeaderLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <HeaderLink link="/contact">Contact</HeaderLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <HeaderLink link="/login">Log in</HeaderLink>
        </MenuItem>
      </Menu>
    </Box>
  )
}

const LoggedOut = () => (
  <>
    <FullSize />
    <Mobile />
  </>
)

export default LoggedOut
