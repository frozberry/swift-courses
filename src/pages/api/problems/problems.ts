import { Problem } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authAdminSession from "../../../lib/authAdminSession"
import { getProblems } from "../../../services/server/problemService"

const GET = async (req: NextApiRequest, res: NextApiResponse<Problem[]>) => {
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response

  const problems = await getProblems()
  res.send(problems)
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
