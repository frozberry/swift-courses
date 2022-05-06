import { GradedExam } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authAdminSession from "../../../lib/authAdminSession"
import { getGradedExams } from "../../../services/server/gradedExamService"

const GET = async (req: NextApiRequest, res: NextApiResponse<GradedExam[]>) => {
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response

  const gradedExams = await getGradedExams()
  res.send(gradedExams)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      GET(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
