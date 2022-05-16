import { NextApiRequest } from "next"

const getCountry = (req: NextApiRequest) => {
  const country = req.headers["x-vercel-ip-country"] || "none"
  return country as string
}

export default getCountry
