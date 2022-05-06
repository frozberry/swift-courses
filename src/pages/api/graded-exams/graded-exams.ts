import { GradedExam } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import { ProblemSubmission } from "../../../lib/types"
import {
  getUsersGradedExams,
  submitExam,
} from "../../../services/server/gradedExamService"

type PostBody = {
  examSessionId: string
  submissions: ProblemSubmission[]
}

const GET = async (req: NextApiRequest, res: NextApiResponse<GradedExam[]>) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const gradedExams = await getUsersGradedExams(userId, true)
  res.send(gradedExams)
}

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<GradedExam | null>
) => {
  const { examSessionId, submissions }: PostBody = req.body

  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const gradedExam = await submitExam(userId, examSessionId, submissions)
  res.send(gradedExam)
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
