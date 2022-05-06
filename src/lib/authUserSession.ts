import { getSession } from "next-auth/react"
import { NextApiRequest, NextApiResponse } from "next/types"

const authUserSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    return {
      unauthorized: true,
      response: res.status(401).end("You must be logged in to do that"),
      userId: "",
    }
  }

  return { unauthorized: false, userId: session.id as string }
}

export default authUserSession
