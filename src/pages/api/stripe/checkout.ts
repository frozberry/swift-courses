import type { NextApiRequest, NextApiResponse } from "next"
import { createCheckoutSession } from "../../../services/server/stripeService"

export type StripeCheckoutBody = {
  item: string
  email: string
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { item, email }: StripeCheckoutBody = req.body
  const session = await createCheckoutSession(item, email)
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
