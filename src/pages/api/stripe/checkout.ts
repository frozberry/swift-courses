import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import { CourseCode } from "../../../lib/types"
import {
  createCheckoutSession,
  getCheckoutUser,
} from "../../../services/server/stripeService"
import { findUserById } from "../../../services/server/userService"

export type StripeCheckoutBody = {
  course: CourseCode
}
const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sessionId } = req.query
  if (!sessionId) return res.status(400).send("Missing sessionId")

  const data = await getCheckoutUser(sessionId as string)

  res.send(data)
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { course }: StripeCheckoutBody = req.body
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const user = await findUserById(userId)
  const session = await createCheckoutSession(user!, course, false)
  res.send(session)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      GET(req, res)
      break
    case "POST":
      POST(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
