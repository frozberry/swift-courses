import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authAdminSession from "../../../lib/authAdminSession"
import { getUsers, toggleUserField } from "../../../services/server/userService"

const GET = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response

  const users = await getUsers()
  res.send(users)
}

type PutProps = {
  field: string
  toggleUserId: string
}

const PUT = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { field, toggleUserId } = req.query as PutProps
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response

  const editedUser = await toggleUserField(toggleUserId, field)

  res.send(editedUser!)
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
