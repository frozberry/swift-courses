import type { NextApiRequest, NextApiResponse } from "next"
import { userIsOAuth } from "../../../services/server/userService"
import authUserSession from "../../../lib/authUserSession"

const GET = async (req: NextApiRequest, res: NextApiResponse<boolean>) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const isOAuth = await userIsOAuth(userId)
  res.send(isOAuth)
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
