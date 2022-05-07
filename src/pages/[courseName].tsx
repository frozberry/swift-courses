import { Box, Button, Container, Typography } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/router"
import Anchor from "../components/Anchor"
import Header from "../components/header/Header"
import LinkButton from "../components/LinkButton"
import VideoPlayer from "../components/VideoPlayer"
import useAuthQuery from "../hooks/useAuthQuery"

const getCourse = async (course: string) => {
  const res = await axios.get(`/api/courses/${course}`)
  return res.data
}

type QueryProps = {
  courseName: string
  moduleId: string
  lessonId: string
}

type Course = {
  name: string
  id: number
  code: string
  modules: Module[]
}

type Module = {
  name: string
  id: number
  lessons: Lesson[]
}

type Lesson = {
  name: string
  url: string
  description: string
  id: number
  pdfUrl?: string
  checklistUrl?: string
}

const Page = () => {
  const router = useRouter()
  const { courseName, moduleId, lessonId } = router.query as QueryProps
  const { data, escape, component } = useAuthQuery(courseName, () =>
    getCourse(courseName)
  )
  const course = data as Course
  if (!(courseName === "ff" || courseName === "pp" || courseName === "kotc"))
    return null
  if (escape) return component
  if (!moduleId || !lessonId) {
    router.replace(`/${courseName}?moduleId=0&lessonId=0`)
    return null
  }

  const module = course.modules[Number(moduleId)]
  const lesson = module.lessons[Number(lessonId)]

  let nextModule
  let nextLesson

  const isFinal =
    module.id === course.modules.length - 1 &&
    lesson.id === module.lessons.length - 1

  if (lesson.id !== module.lessons.length - 1) {
    nextLesson = lesson.id + 1
    nextModule = module.id
  } else {
    nextModule = module.id + 1
    nextLesson = 0
  }

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <VideoPlayer url={lesson.url} />

        <Container maxWidth="lg">
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
                text="Next Lesson"
                href={`/${courseName}?moduleId=${nextModule}&lessonId=${nextLesson}`}
              />
            </Box>
          )}
        </Container>
      </Container>
    </>
  )
}

export default Page
