import { Exam } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import authAdminSession from "../../../lib/authAdminSession"
import { ProblemJson } from "../../../lib/types"
import {
  createExamFromJson,
  getExams
} from "../../../services/server/examService"

type PostBody = {
  problems: ProblemJson[]
}

const GET = async (req: NextApiRequest, res: NextApiResponse<Exam[]>) => {
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response

  const exams = await getExams()
  res.send(exams)
}

const POST = async (req: NextApiRequest, res: NextApiResponse<Exam | null>) => {
  const { problems }: PostBody = req.body
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response

  const exam = await createExamFromJson(problems)
  res.send(exam)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      GET(req, res)
      break
    case "POST":
      POST(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
