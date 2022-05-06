import type { NextApiRequest, NextApiResponse } from "next"
import authAdminSession from "../../../lib/authAdminSession"
import { UserProfile } from "../../../lib/types"
import { getProfiles } from "../../../services/server/profileService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<UserProfile[]>
) => {
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response

  const profiles = await getProfiles()
  res.send(profiles)
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
