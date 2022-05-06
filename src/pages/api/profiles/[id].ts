import type { NextApiRequest, NextApiResponse } from "next"
import { UserProfile } from "../../../lib/types"
import { findProfileById } from "../../../services/server/profileService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<UserProfile | null>,
  id: string
) => {
  const user = await findProfileById(id)
  res.send(user)
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<UserProfile | null>
) => {
  const { id } = req.query as { id: string }

  switch (req.method) {
    case "GET":
      GET(req, res, id)
      break

    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
