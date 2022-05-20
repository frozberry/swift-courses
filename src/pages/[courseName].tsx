import { Container, Divider } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import DrawerHeader from "../components/drawer/DrawerHeader"
import LessonDescription from "../components/LessonDescription"
import Transcript from "../components/Transcript"
import VideoPlayer from "../components/VideoPlayer"
import useAuthQuery from "../hooks/useAuthQuery"
import { Course, CourseQuery, Lesson } from "../lib/types"

const getTranscript = async (lesson: Lesson) => {
  const res = await axios.get(`/api/transcripts/${lesson.transcriptId}`)
  return res.data
}

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

  const module = course?.modules[Number(moduleId) - 1]
  const lesson = module?.lessons[Number(lessonId) - 1]

  const { data: transcript } = useAuthQuery(
    moduleId + lessonId,
    () => getTranscript(lesson),
    false,
    !!course
  )

  if (!(courseName === "ff" || courseName === "pp" || courseName === "kotc"))
    return null

  if (escape) return component

  if (!moduleId || !lessonId) {
    router.replace(`/${courseName}?moduleId=1&lessonId=1`)
    return null
  }

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

        {lesson.transcriptId && (
          <>
            <Divider sx={{ my: 4 }} />
            <Transcript
              transcript={transcript}
              seekTo={seekTo}
              timestamp={timestamp}
            />
          </>
        )}
      </Container>
    </DrawerHeader>
  )
}

export default Page
