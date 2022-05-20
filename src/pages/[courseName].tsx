import { Box, Button, Container, Divider, Typography } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import transcript from "../../courses-data/transcripts/lesson1.json"
import Anchor from "../components/Anchor"
import DrawerHeader from "../components/drawer/DrawerHeader"
import LessonDescription from "../components/LessonDescription"
import LinkButton from "../components/LinkButton"
import Transcript from "../components/Transcript"
import VideoPlayer from "../components/VideoPlayer"
import useAuthQuery from "../hooks/useAuthQuery"
import getNextLessonAndModule from "../lib/getNextLessonAndModule"
import { Course, CourseQuery } from "../lib/types"

const getCourse = async (course: string) => {
  const res = await axios.get(`/api/courses/${course}`)
  return res.data
}

const Page = () => {
  const router = useRouter()
  const videoRef = useRef(null)
  const [timestamp, setTimestamp] = useState(0)
  const { courseName, moduleId, lessonId } = router.query as CourseQuery
  const { data, escape, component } = useAuthQuery(courseName, () =>
    getCourse(courseName)
  )
  const course = data as Course

  if (!(courseName === "ff" || courseName === "pp" || courseName === "kotc"))
    return null

  if (escape) return component

  if (!moduleId || !lessonId) {
    router.replace(`/${courseName}?moduleId=1&lessonId=1`)
    return null
  }

  const module = course.modules[Number(moduleId) - 1]
  const lesson = module.lessons[Number(lessonId) - 1]

  const seekTo = (time: number) => {
    setTimestamp(time / 1000)
    // @ts-ignore
    videoRef.current.seekTo(time / 1000)
  }

  return (
    <DrawerHeader course={course}>
      <Container sx={{ mt: 4, px: { xs: 0, sm: 2 } }}>
        <VideoPlayer
          url={lesson.url}
          videoRef={videoRef}
          setTimestamp={setTimestamp}
        />
        <LessonDescription
          lesson={lesson}
          module={module}
          course={course}
          courseName={courseName}
        />

        <Divider sx={{ my: 4 }} />

        <Container maxWidth="md">
          <Transcript
            transcript={transcript}
            seekTo={seekTo}
            timestamp={timestamp}
          />
        </Container>
      </Container>
    </DrawerHeader>
  )
}

export default Page
