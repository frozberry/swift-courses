import type { NextApiRequest, NextApiResponse } from "next"
import {
  sendContactMessageEmail,
  sendPasswordResetEmail,
} from "../../../services/server/emailService"
import { findUserByEmail } from "../../../services/server/userService"

type EmailBody = {
  email: string
}
type ContactBody = {
  name: string
  email: string
  message: string
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type } = req.query

  if (type === "password-reset") {
    const { email }: EmailBody = req.body
    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(401).end("email not found")
    }

    await sendPasswordResetEmail(user.id, user.email)

    res.status(200).end(`Password reset sent to ${user.email}`)
    return
  }

  if (type === "contact") {
    const { name, email, message }: ContactBody = req.body
    await sendContactMessageEmail(name, email, message)
    res.status(200).end("Contact email sent")
    return
  }

  res.status(400).end("Invalid query type")
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
