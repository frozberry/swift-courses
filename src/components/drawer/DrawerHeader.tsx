import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import { useState } from "react"
import { Course } from "../../lib/types"
import Header from "../header/Header"
import Navigation from "./Navigation"

const drawerWidth = 240

type Props = {
  children: React.ReactNode
  course: Course
}

export default function ResponsiveDrawer({ children, course }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Header handleDrawerToggle={handleDrawerToggle} menu={true} />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Navigation course={course} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Navigation course={course} />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
