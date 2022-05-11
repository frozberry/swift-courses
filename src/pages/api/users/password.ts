import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import authUserSession from "../../../lib/authUserSession"
import { ServerError } from "../../../lib/types"
import {
  changePassword,
  validatePassword,
} from "../../../services/server/accountService"
import { stripe } from "../../../services/server/stripeService"
import {
  findUserByEmail,
  findUserById,
} from "../../../services/server/userService"

type PostBody = {
  sessionId: string
  password: string
}

type PutBody = {
  currentPassword: string
  newPassword: string
}

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sessionId, password }: PostBody = req.body

  const session = await stripe.checkout.sessions.retrieve(sessionId)
  const { customer } = session as { customer: string }

  const stripeCustomer = (await stripe.customers.retrieve(
    customer
  )) as Stripe.Customer
  const { email } = stripeCustomer
  const user = (await findUserByEmail(email!)) as User

  if (user.passwordSet) {
    return res.status(400).send({
      type: "passwordAlreadySet",
      message: "Account has already been created, please try loggin in",
    })
  }

  if (password.length < 3) {
    return res.status(400).send({
      type: "passwordTooShort",
      message: "Password must be at least 3 characters long",
    })
  }

  await changePassword(user.id, password)
  res.status(200).end(email)
}

const PUT = async (req: NextApiRequest, res: NextApiResponse<ServerError>) => {
  const { currentPassword, newPassword }: PutBody = req.body

  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const user = (await findUserById(userId)) as User

  if (newPassword.length < 3) {
    return res.status(400).send({
      type: "passwordTooShort",
      message: "Password must be at least 3 characters long",
    })
  }

  const passwordCorrect = await validatePassword(
    currentPassword,
    user.passwordHash as string
  )

  if (!passwordCorrect) {
    return res.status(400).send({
      type: "incorrectPassword",
      message: "Password is incorrect",
    })
  }

  await changePassword(user.id, newPassword)
  res.status(200).end()
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      POST(req, res)
      break
    case "PUT":
      PUT(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
