import type { NextApiRequest, NextApiResponse } from "next"
import { getCustomerPortalUrl } from "../../../services/server/stripeService"

type PostBody = {
  customerId: string
}

type PostResponse = {
  url: string
}

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>
) => {
  const { customerId }: PostBody = req.body
  const url = await getCustomerPortalUrl(customerId)
  res.send({ url })
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
