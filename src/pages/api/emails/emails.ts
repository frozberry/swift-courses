import type { NextApiRequest, NextApiResponse } from "next"
import {} from "../../../services/server/emailService"
import sendPasswordResetEmailAWS from "../../../services/server/emailServiceAWS"
import { findUserByEmail } from "../../../services/server/userService"

type EmailBody = {
  email: string
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type } = req.query

  if (type === "password-reset") {
    const { email }: EmailBody = req.body
    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(401).send({
        type: "emailNotFound",
        message: "Email address does not exist",
      })
    }

    await sendPasswordResetEmailAWS(user.id, user.email)

    res.status(200).send(`Password reset sent to ${user.email}`)
    return
  }

  res.status(400).send("Invalid query type")
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
