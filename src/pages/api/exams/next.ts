import { Exam } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import { getNextExam } from "../../../services/server/examService"

const GET = async (req: NextApiRequest, res: NextApiResponse<Exam | null>) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  // TODO fix this, should be graded exams
  const nextExam = await getNextExam(userId)

  res.send(nextExam)
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
