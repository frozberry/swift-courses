import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authAdminSession from "../../../lib/authAdminSession"
import { ServerError } from "../../../lib/types"
import {
  createUser,
  findUserByEmail,
  getUsers,
} from "../../../services/server/userService"

type PostBody = {
  parentName: string
  email: string
  password: string
}

const GET = async (req: NextApiRequest, res: NextApiResponse<User[]>) => {
  const { unauthorized, response } = await authAdminSession(req, res)
  if (unauthorized) return response

  const users = await getUsers()
  res.send(users)
}

const POST = async (
  req: NextApiRequest,
  res: NextApiResponse<string | ServerError>
) => {
  const { parentName, email, password }: PostBody = req.body

  const existingUser = await findUserByEmail(email)

  if (existingUser) {
    return res.status(400).send({
      type: "userAlreadyExists",
      message: "Account already exists, maybe you meant to log in?",
    })
  }

  const user = await createUser(parentName, email, password)
  res.send(user)
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
