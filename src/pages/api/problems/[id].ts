import type { NextApiRequest, NextApiResponse } from "next"
import authAdminSession from "../../../lib/authAdminSession"
import { deleteProblem } from "../../../services/server/problemService"

const DELETE = async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string
) => {
  const success = await deleteProblem(id)

  if (!success) {
    return res.status(405).end("problem not found")
  }

  res.status(200).end("problem deleted")
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string }
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response

  switch (req.method) {
    case "DELETE":
      DELETE(req, res, id)

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
