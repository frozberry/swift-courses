import axios from "axios"
import notifyError from "../../lib/notifyError"
import { CategoryStatsData } from "../../lib/types"

const url = "/api/graded-categories"

export const getCategoriesStats = async () => {
  try {
    const response = await axios.get<CategoryStatsData>(`${url}?average=true`)
    return response.data
  } catch (e) {
    notifyError(e)
  }
}
