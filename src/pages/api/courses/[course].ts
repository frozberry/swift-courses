import { NextApiRequest, NextApiResponse } from "next"
import footworkFastlane from "../../../../courses-data/footworkFastlane"
import powerPathway from "../../../../courses-data/powerPathway"
import kotc from "../../../../courses-data/kotc"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse,
  course: string
) => {
  console.log(course)
  if (course === "ff") {
    res.send(footworkFastlane)
    return
  }
  if (course === "pp") {
    res.send(powerPathway)
    return
  }
  if (course === "kotc") {
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
