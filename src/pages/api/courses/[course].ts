import { User } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import footworkFastlane from "../../../../courses-data/footowkFastlane.json"
import kotc from "../../../../courses-data/kotc.json"
import powerPathway from "../../../../courses-data/powerPathway.json"
import authUserSession from "../../../lib/authUserSession"
import { findUserById } from "../../../services/server/userService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse,
  course: string
) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const user = (await findUserById(userId)) as User

  if (course === "ff") {
    if (!user.ff) {
      res.status(403).end("You do not have access to this course")
      return
    }

    res.send(footworkFastlane)
    return
  }
  if (course === "pp") {
    if (!user.pp) {
      res.status(403).end("You do not have access to this course")
      return
    }
    res.send(powerPathway)
    return
  }
  if (course === "kotc") {
    if (!user.kotc) {
      res.status(403).end("You do not have access to this course")
      return
    }
    res.send(kotc)
    return
  }

  res.status(400).end("Invalid course")
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { course } = req.query as { course: string }

  switch (req.method) {
    case "GET":
      GET(req, res, course)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
