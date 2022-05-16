import { NextApiRequest } from "next"

const getCountry = async (req: NextApiRequest) => {
  const country = req.headers["x-vercel-ip-country"] || "none"
  return country
}

export default getCountry
