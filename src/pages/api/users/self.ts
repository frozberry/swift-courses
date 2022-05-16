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
  // Happens when I manually change the db, and user's browswer has saved the old cookies
  // Causing loading screen to infitely loop, with no way to sign out
  if (!user) {
    return res.status(200).end("Outdated session")
  }
  await updateOnLogin(user!, country)

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
