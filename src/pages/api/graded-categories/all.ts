import { GradedCategory } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { CategoryWithAverage } from "../../../lib/types"
import {
  getCatergoriesAverage,
  getGradedCategories
} from "../../../services/server/gradedCategoryService"

const GET = async (
  req: NextApiRequest,
  res: NextApiResponse<CategoryWithAverage[] | GradedCategory[]>
) => {
  const { average } = req.query

  // TODO not sure how this should be authed
  if (average === "true") {
    const averages = await getCatergoriesAverage()
    res.send(averages)
  }

  const gradedCategories = await getGradedCategories()
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
