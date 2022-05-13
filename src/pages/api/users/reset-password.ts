import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { ServerError } from "../../../lib/types"
import { resetPassword } from "../../../services/server/accountService"

type PutBody = {
  newPassword: string
  token: string
}

const PUT = async (
  req: NextApiRequest,
  res: NextApiResponse<{ email: string } | ServerError>
) => {
  const { newPassword, token }: PutBody = req.body

  if (newPassword.length < 3) {
    return res.status(400).send({
      type: "passwordTooShort",
      message: "Password must be at least 3 characters",
    })
  }

  try {
    const email = await resetPassword(newPassword, token)
    res.send({ email })
  } catch (e) {
    res.status(400).send({
      type: "resetTokenExpired",
      message: "URL expired, please request a new reset email",
    })
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
