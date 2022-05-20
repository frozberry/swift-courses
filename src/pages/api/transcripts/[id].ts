import { NextApiRequest, NextApiResponse } from "next"
// import footworkFastlane from "../../../../courses-data/ff-transcript.json"
import axios from "axios"
import authUserSession from "../../../lib/authUserSession"

const config = {
  headers: {
    authorization: process.env.ASSEMBLY_KEY!,
  },
}

const GET = async (req: NextApiRequest, res: NextApiResponse, id: string) => {
  const { unauthorized, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const paragraphRes = await axios.get(
    `https://api.assemblyai.com/v2/transcript/${id}/paragraphs`,
    config
  )
  const sentenceRes = await axios.get(
    `https://api.assemblyai.com/v2/transcript/${id}/sentences`,
    config
  )

  const paragraphs = paragraphRes.data
  const sentences = sentenceRes.data

  const transcript = paragraphs.paragraphs.map((paragraph: any) => ({
    sentences: sentences.sentences
      .filter(
        (sentence: any) =>
          sentence.start >= paragraph.start && sentence.end <= paragraph.end
      )
      .map((sentence: any) => ({
        text: sentence.text,
        start: sentence.start,
        end: sentence.end,
      })),
  }))

  res.send(transcript)
  return
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string }

  switch (req.method) {
    case "GET":
      GET(req, res, id)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
