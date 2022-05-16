import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import {
  findUserById,
  updateActiveDates,
} from "../../../services/server/userService"

const GET = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { unauthorized, response, userId } = await authUserSession(req, res)
  if (unauthorized) return response

  const user = await findUserById(userId)
  await updateActiveDates(user!)
  res.send(user as User)
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
