import { Exam, ExamSession } from "@prisma/client"
import axios from "axios"
import notifyError from "../../lib/notifyError"

const url = "/api/exam-sessions"

export const findUsersExamSession = async () => {
  try {
    const response = await axios.get<ExamSession>(url)
    return response.data
  } catch (e) {
    notifyError(e)
  }
}

export const createExamSession = async (examId: string) => {
  const data = {
    examId,
  }
  try {
    const response = await axios.post<ExamSession>(url, data)
    return response.data
  } catch (e) {
    notifyError(e)
  }
}

export const findActiveExam = async () => {
  const examSession = await findUsersExamSession()

  if (examSession) {
    try {
      const res = await axios.get<Exam>(`/api/exams/${examSession.examId}`)
      return {
        examSession,
        exam: res.data,
      }
    } catch (e) {
      notifyError(e)
    }
  }

  return null
}

export const deleteExamSession = async () => {
  try {
    const res = await axios.delete(url)
    return res.data
  } catch (e) {
    notifyError(e)
  }
}
