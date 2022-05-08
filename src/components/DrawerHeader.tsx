import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Collapse } from "@mui/material"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Link from "next/link"
import { useState } from "react"
import Header from "../components/header/Header"
import { Course } from "../lib/types"

const drawerWidth = 240

type Props = {
  children: React.ReactNode
  course: Course
}

export default function ResponsiveDrawer({ children, course }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [open, setOpen] = useState(course.modules.map(() => false))

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleClick = (id: number) => {
    const newState = [...open]
    newState[id] = !newState[id]
    setOpen(newState)
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {course.modules.map((module) => (
          <Box key={module.name}>
            <ListItem
              button
              key={module.name}
              onClick={() => handleClick(module.id)}
            >
              <ListItemText primary={module.name} />
              <ListItemIcon>
                {open[module.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemIcon>
            </ListItem>

            {module.lessons.map((lesson) => {
              return (
                <Box key={lesson.id}>
                  <Collapse in={open[module.id]} timeout="auto" unmountOnExit>
                    <Link
                      href={`/${course.code}?moduleId=${module.id}&lessonId=${lesson.id}`}
                      passHref
                    >
                      <List component="div" disablePadding>
                        <ListItem button>
                          <ListItemText inset primary={lesson.name} />
                        </ListItem>
                      </List>
                    </Link>
                  </Collapse>
                </Box>
              )
            })}
          </Box>
        ))}
      </List>
    </div>
  )

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
          {drawer}
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
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
