import { Course, Lesson, Module } from "./types"

const getNextLessonAndModule = (
  lesson: Lesson,
  module: Module,
  course: Course
) => {
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

  return { nextLesson, nextModule, isFinal }
}

export default getNextLessonAndModule
