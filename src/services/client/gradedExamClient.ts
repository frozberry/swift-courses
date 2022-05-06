import { GradedExam } from "@prisma/client"
import axios from "axios"
import notifyError from "../../lib/notifyError"
import { ExamResultOverivew, ProblemSubmission } from "../../lib/types"

const url = "/api/graded-exams"

export const getUsersGradedExams = async () => {
  try {
    const res = await axios.get<GradedExam[]>(url)
    return res.data
  } catch (e) {
    notifyError(e)
  }
}

export const findGradedExamById = async (id: string) => {
  try {
    const res = await axios.get<GradedExam>(`${url}/${id}`)
    return res.data
  } catch (e) {
    notifyError(e)
  }
}

export const getExamResultsOverview = async () => {
  try {
    const res = await axios.get<ExamResultOverivew[]>(`${url}/overview`)
    return res.data
  } catch (e) {
    notifyError(e)
  }
}

export const submitExam = async (
  examSessionId: string,
  submissions: ProblemSubmission[]
) => {
  const data = { examSessionId, submissions }
  try {
    const res = await axios.post(url, data)
    return res.data
  } catch (e) {
    notifyError(e)
  }
}
