import { Exam } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authAdminSession from "../../../lib/authAdminSession"
import { deleteExam, findExamById } from "../../../services/server/examService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<Exam | null>,
  id: string
) => {
  // TODO auth the user has an active session
  // const { unauthorized, response } = await authAdminSession(req, res)
  // if (unauthorized) return response

  const exam = await findExamById(id)
  res.send(exam)
}

const DELETE = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response

  const success = await deleteExam(id)

  if (!success) {
    return res.status(405).end("exam not found")
  }

  res.status(200).end("exam deleted")
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string }

  switch (req.method) {
    case "GET":
      GET(req, res, id)
      break

    case "DELETE":
      DELETE(req, res, id)

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
