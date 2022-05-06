import { ExamSession } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import { ServerError } from "../../../lib/types"
import {
  createExamSession,
  deleteUsersExamSession,
  findUsersExamSession,
} from "../../../services/server/examSessionService"

type PostBody = {
  examId: string
}

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<ExamSession | null>
) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const examSession = await findUsersExamSession(userId)
  res.send(examSession)
}

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<ExamSession | ServerError>
) => {
  const { examId }: PostBody = req.body
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const existing = await findUsersExamSession(userId)
  if (existing) {
    res.status(400).send({
      type: "existingExamSession",
      message: "User already has an exam session",
    })
    return
  }

  const examSession = await createExamSession(userId, examId)
  res.send(examSession)
}

const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  await deleteUsersExamSession(userId)
  res.status(200).end()
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      GET(req, res)
      break
    case "POST":
      POST(req, res)
      break
    case "DELETE":
      DELETE(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
