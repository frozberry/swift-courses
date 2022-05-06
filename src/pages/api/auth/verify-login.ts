import type { NextApiRequest, NextApiResponse } from "next"
import { ServerError } from "../../../lib/types"
import { validatePassword } from "../../../services/server/accountService"
import { findUserByEmail } from "../../../services/server/userService"

type PostBody = {
  parentName: string
  email: string
  password: string
}

const POST = async (req: NextApiRequest, res: NextApiResponse<ServerError>) => {
  const { email, password }: PostBody = req.body

  const user = await findUserByEmail(email)

  if (!user) {
    return res.status(400).send({
      type: "noUser",
      message: "No user with that email exists",
    })
  }

  if (!user?.passwordHash) {
    return res.status(400).send({
      type: "notCredentialUser",
      message: "Account already exists, please sign in with Google",
    })
  }
  const passwordCorrect = await validatePassword(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(400).send({
      type: "invalidCredentials",
      message: "Incorrect email or password",
    })
  }

  res.status(200).end()
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
