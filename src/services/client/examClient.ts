import { Exam } from "@prisma/client"
import axios from "axios"
import notifyError from "../../lib/notifyError"

const url = "/api/exams"

export const getExams = async () => {
  try {
    const response = await axios.get<Exam[]>(url)
    return response.data
  } catch (e) {
    notifyError(e)
  }
}

export const findExamById = async (id: string) => {
  try {
    const response = await axios.get<Exam>(`${url}/${id}`)
    return response.data
  } catch (e) {
    notifyError(e)
  }
}

export const getNextExam = async () => {
  try {
    // I think this is being returned as an empty string instead of null
    const response = await axios.get<Exam | null>(`${url}/next`)
    return response.data
  } catch (e) {
    notifyError(e)
  }
}
