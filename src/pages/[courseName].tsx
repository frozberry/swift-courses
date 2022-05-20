import { Box, Button, Container, Typography } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import transcript from "../../courses-data/transcripts/lesson1.json"
import Anchor from "../components/Anchor"
import DrawerHeader from "../components/drawer/DrawerHeader"
import LinkButton from "../components/LinkButton"
import VideoPlayer from "../components/VideoPlayer"
import useAuthQuery from "../hooks/useAuthQuery"
import { Course, CourseQuery } from "../lib/types"

const getCourse = async (course: string) => {
  const res = await axios.get(`/api/courses/${course}`)
  return res.data
}

const Page = () => {
  const router = useRouter()
  const videoRef = useRef(null)
  const { courseName, moduleId, lessonId } = router.query as CourseQuery
  const { data, escape, component } = useAuthQuery(courseName, () =>
    getCourse(courseName)
  )

  const [timestamp, setTimestamp] = useState(0)
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

  let nextModule
  let nextLesson

  const isFinal =
    module.id === course.modules.length && lesson.id === module.lessons.length

  if (lesson.id !== module.lessons.length) {
    nextLesson = lesson.id + 1
    nextModule = module.id
  } else {
    nextModule = module.id + 1
    nextLesson = 1
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
        {transcript.map((paragraph: any) => (
          <Box key={paragraph.start} sx={{ my: 2 }}>
            {paragraph.sentences.map((sentence: any) => (
              <>
                <Typography
                  key={sentence.start}
                  display="inline"
                  onClick={() => seekTo(sentence.start)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      sentence.start / 1000 < timestamp &&
                      sentence.end / 1000 > timestamp
                        ? "primary.light"
                        : null,
                    "&:hover": {
                      backgroundColor: "secondary.light",
                    },
                  }}
                >
                  {sentence.text}
                </Typography>
                {/* Prevents styling being applied to space */}
                <Typography display="inline"> </Typography>
              </>
            ))}
          </Box>
        ))}

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
                text="Next lesson"
                href={`/${courseName}?moduleId=${nextModule}&lessonId=${nextLesson}`}
              />
            </Box>
          )}
        </Container>
      </Container>
    </DrawerHeader>
  )
}

export default Page
