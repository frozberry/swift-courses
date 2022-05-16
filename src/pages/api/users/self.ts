import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import getCountry from "../../../lib/getCountry"
import {
  findUserById,
  updateOnLogin,
} from "../../../services/server/userService"

const GET = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { unauthorized, response, userId } = await authUserSession(req, res)
  if (unauthorized) return response
  const country = getCountry(req)

  const user = await findUserById(userId)
  if (user) {
    await updateOnLogin(user!, country)
  }

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
