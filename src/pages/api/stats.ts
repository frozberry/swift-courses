import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../lib/authUserSession"
import { CategoryStatsData } from "../../lib/types"
import { getUsersGradedCategoriesWithAverage } from "../../services/server/gradedCategoryService"
import { findUserById } from "../../services/server/userService"

export type StatsPageData = {
  categoryData: CategoryStatsData
  score: number | null
}

// TODO this route is a quick hack
const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<StatsPageData>
) => {
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  const categoryData = await getUsersGradedCategoriesWithAverage(userId)
  const user = (await findUserById(userId)) as User

  const data = {
    categoryData,
    score: user.score,
  }

  res.send(data)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      GET(req, res)
      break
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
