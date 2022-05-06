import { GradedCategory } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import authUserSession from "../../../lib/authUserSession"
import { CategoryStatsData } from "../../../lib/types"
import {
  getUsersGradedCategories,
  getUsersGradedCategoriesWithAverage,
} from "../../../services/server/gradedCategoryService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<CategoryStatsData | GradedCategory[]>
) => {
  const { average } = req.query
  const { unauthorized, userId, response } = await authUserSession(req, res)
  if (unauthorized) return response

  if (average === "true") {
    const averages = await getUsersGradedCategoriesWithAverage(userId)
    res.send(averages)
    return
  }

  const gradedCategories = await getUsersGradedCategories(userId)
  res.send(gradedCategories)
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
