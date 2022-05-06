import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next/types"
import { findUserById } from "../services/server/userService"

const authAdminSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      unauthorized: true,
      response: res.status(401).end("You must be logged in to do that"),
    }
  }

  const user = await findUserById(session.id as string)

  if (!user?.admin) {
    return {
      unauthorized: true,
      response: res.status(401).end("You must be admin to do that"),
    }
  }

  return {
    unauthorized: false,
  }
}

export default authAdminSession
