import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { resetPassword } from "../../../services/server/accountService"

type PutBody = {
  newPassword: string
  token: string
}

// TODO this route doesn't work with sessions
const PUT = async (req: NextApiRequest, res: NextApiResponse<User | null>) => {
  const { newPassword, token }: PutBody = req.body

  if (newPassword.length < 3) {
    return res.status(400).end("password too short")
  }

  try {
    const updatedUser = await resetPassword(newPassword, token)
    res.send(updatedUser)
  } catch (e) {
    res.status(400).end("error")
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "PUT":
      PUT(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
