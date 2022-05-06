import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import { AccountPageData } from "../../../lib/types"
import { getUsersAccountPage } from "../../../services/server/userService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<AccountPageData>
) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const account = await getUsersAccountPage(userId)
  res.send(account)
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
