import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import { CourseCode } from "../../../lib/types"
import { createCheckoutSession } from "../../../services/server/stripeService"
import { findUserById } from "../../../services/server/userService"

export type StripeCheckoutBody = {
  course: CourseCode
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { course }: StripeCheckoutBody = req.body
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const user = await findUserById(userId)
  const session = await createCheckoutSession(user!.email, course, false)
  res.send(session)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      POST(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
