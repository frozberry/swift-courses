import { PlayLesson } from "@mui/icons-material"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Box, Collapse, List, ListItem } from "@mui/material"
import Divider from "@mui/material/Divider"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Toolbar from "@mui/material/Toolbar"
import Link from "next/link"
import { useState } from "react"
import { Course } from "../lib/types"

type Props = {
  course: Course
}

const MultipleModules = ({ course }: Props) => {
  const [open, setOpen] = useState(course.modules.map(() => false))

  const handleClick = (id: number) => {
    const newState = [...open]
    newState[id] = !newState[id]
    setOpen(newState)
  }

  return (
    <>
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
    </>
  )
}

const SingleModule = ({ course }: { course: Course }) => {
  return (
    <>
      {course.modules[0].lessons.map((lesson) => (
        <Box key={lesson.id}>
          <ListItem button>
            <ListItemText primary={lesson.name} />
          </ListItem>
        </Box>
      ))}
    </>
  )
}

const Navigation = ({ course }: Props) => {
  return (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {course.code === "kotc" ? (
          <SingleModule course={course} />
        ) : (
          <MultipleModules course={course} />
        )}
      </List>
    </Box>
  )
}

export default Navigation