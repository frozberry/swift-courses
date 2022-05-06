import { Category, GradedProblem } from "@prisma/client"
import _ from "lodash"
import { CategoryStatsData, CategoryWithAverage } from "../../lib/types"
import { prisma } from "../../prisma/client"

export const getGradedCategories = async () => {
  const gradedCatergories = await prisma.gradedCategory.findMany()
  return gradedCatergories
}

export const getUsersGradedCategories = async (userId: string) => {
  const gradedCatergories = await prisma.gradedCategory.findMany({
    where: {
      user: {
        id: userId,
      },
    },
  })
  return gradedCatergories
}

export const createUsersGradedCategories = async (userId: string) => {
  const existing = await getUsersGradedCategories(userId)
  if (existing.length === 0) {
    const categories = Object.values(Category)
    const data = categories.map((category) => {
      return {
        userId,
        category,
      }
    })

    await prisma.gradedCategory.createMany({ data })
  }
}

// The average score for each category across all students
export const getCatergoriesAverage = async () => {
  const gradedCategories = await prisma.gradedCategory.findMany({
    where: {
      // Greater than 0 attempts
      attempts: {
        gt: 0,
      },
    },
  })

  const categories = Object.values(Category)

  const categoriesAveraged: CategoryWithAverage[] = categories.map(
    (category) => {
      const mgc = gradedCategories.filter((gc) => gc.category === category)

      const totalAttempts = mgc.reduce((acc, gc) => gc.attempts + acc, 0)
      const totalCorrect = mgc.reduce((acc, gc) => gc.correct + acc, 0)
      return {
        average: (100 * totalCorrect) / totalAttempts,
        category: category,
      }
    }
  )

  return categoriesAveraged
}

// The users gradedCategories, with an extra field for the average
export const getUsersGradedCategoriesWithAverage = async (userId: string) => {
  const averages = await getCatergoriesAverage()
  const gradedCategories = await getUsersGradedCategories(userId)

  const merged = _.merge(
    _.keyBy(averages, "category"),
    _.keyBy(gradedCategories, "category")
  )
  const values: CategoryStatsData = _.values(merged)

  return values
}

export const updateGradedCategories = async (
  userId: string,
  gradedProblems: GradedProblem[]
) => {
  gradedProblems.forEach(async (gradedProblem) => {
    gradedProblem.categories.forEach(async (category) => {
      const correct = gradedProblem.correct === gradedProblem.selected
      const mark = correct ? 1 : 0

      await prisma.gradedCategory.update({
        where: {
          userId_category: {
            userId: userId,
            category,
          },
        },
        data: {
          attempts: {
            increment: 1,
          },
          correct: {
            increment: mark,
          },
        },
      })
    })
  })
  console.log("Grading categories done")
}
