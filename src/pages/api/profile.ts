import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../lib/authUserSession"
import { UserProfile } from "../../lib/types"
import {
  editProfile,
  findProfileById,
} from "../../services/server/profileService"

type PutBody = {
  firstName: string
  lastName: string
  dob: string
  gender: string
}

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<UserProfile | null>
) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const profile = await findProfileById(userId)
  res.send(profile)
}

const PUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const { firstName, lastName, dob, gender }: PutBody = req.body
  const profile = editProfile(userId, firstName, lastName, dob, gender)

  res.send(profile)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      GET(req, res)
      break
    case "PUT":
      PUT(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
