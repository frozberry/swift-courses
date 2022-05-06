import { GradedExam } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import { findGradedExamById } from "../../../services/server/gradedExamService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<GradedExam | null>,
  id: string
) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const gradedExam = await findGradedExamById(id)

  if (gradedExam?.userId !== userId) {
    return res.status(401).end("unauthorized")
  }

  res.send(gradedExam)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string }

  switch (req.method) {
    case "GET":
      GET(req, res, id)
      break

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
