import { NextApiRequest, NextApiResponse } from "next"
import footworkFastlane from "../../../../courses-data/footworkFastlane.json"
import powerPathway from "../../../../courses-data/powerPathway.json"
import kotc from "../../../../courses-data/kotc.json"
import authUserSession from "../../../lib/authUserSession"
import { findUserById } from "../../../services/server/userService"
import { User } from "@prisma/client"
import * as fs from "fs"
import { Course } from "../../../lib/types"

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

    // Add the transcript to the course data
    // Could be cleaner, but this works for now
    const ff = footworkFastlane as Course
    fs.readdir("./courses-data/transcripts", (err, files) => {
      files.forEach((file) => {
        const moduleNum = Number(file[0])
        const lessonNum = Number(file[2])
        fs.readFile(`./courses-data/transcripts/${file}`, (err, data) => {
          if (err) console.log(file)
          const transcript = JSON.parse(data.toString())

          ff.modules[moduleNum - 1].lessons[lessonNum - 1].transcript =
            transcript
        })
      })
    })

    res.send(ff)
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
