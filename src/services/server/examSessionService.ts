import { prisma } from "../../prisma/client"
import { getUsersGradedExams } from "./gradedExamService"

export const findExamSessionById = async (id: string) => {
  const examSession = await prisma.examSession.findUnique({
    where: {
      id,
    },
  })
  return examSession
}

export const findUsersExamSession = async (userId: string) => {
  const examSession = await prisma.examSession.findUnique({
    where: {
      userId,
    },
  })

  return examSession
}

export const createExamSession = async (userId: string, examId: string) => {
  // Check if it's their first attempt
  const gradedExams = await getUsersGradedExams(userId, false)
  const existing = gradedExams.find(
    (gradedExam) => gradedExam.examId === examId
  )
  const firstAttempt = !existing

  const examSession = await prisma.examSession.create({
    data: {
      firstAttempt,
      userId,
      examId,
    },
  })
  return examSession
}

export const deleteUsersExamSession = async (userId: string) => {
  await prisma.examSession.delete({
    where: {
      userId,
    },
  })
}
