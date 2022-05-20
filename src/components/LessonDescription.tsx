import { Box, Button, Typography } from "@mui/material"
import Anchor from "../components/Anchor"
import LinkButton from "../components/LinkButton"
import getNextLessonAndModule from "../lib/getNextLessonAndModule"
import { Course, Lesson, Module } from "../lib/types"

type Props = {
  lesson: Lesson
  module: Module
  course: Course
  courseName: string
}

const Page = ({ lesson, module, course, courseName }: Props) => {
  const { nextLesson, nextModule, isFinal } = getNextLessonAndModule(
    lesson,
    module,
    course
  )
  return (
    <Box>
      <Typography variant="h4" sx={{ mt: 3 }}>
        {lesson.name}
      </Typography>
      <Typography variant="h5" sx={{ mt: 1 }}>
        {module.name}
      </Typography>
      <Typography sx={{ mt: 1, mb: 2 }}>{lesson.description}</Typography>

      {lesson.pdfUrl && (
        <Anchor href={lesson.pdfUrl}>
          <Button>PDF Worksheet</Button>
        </Anchor>
      )}
      {lesson.checklistUrl && (
        <Anchor href={lesson.checklistUrl}>
          <Button>Swift Checklist</Button>
        </Anchor>
      )}

      {!isFinal && (
        <Box sx={{ mt: 4 }}>
          <LinkButton
            text="Next lesson"
            href={`/${courseName}?moduleId=${nextModule}&lessonId=${nextLesson}`}
          />
        </Box>
      )}
    </Box>
  )
}

export default Page
