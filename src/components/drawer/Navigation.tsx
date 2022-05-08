import { Box, List } from "@mui/material"
import Divider from "@mui/material/Divider"
import Toolbar from "@mui/material/Toolbar"
import { Course } from "../../lib/types"
import { MultipleModules, SingleModule } from "./Modules"

type Props = {
  course: Course
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
