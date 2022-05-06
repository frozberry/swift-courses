import { Prisma, Problem } from "@prisma/client"
import { prisma } from "../../prisma/client"

export const getProblems = async (): Promise<Problem[]> => {
  const problems = await prisma.problem.findMany()
  return problems
}

export const findProblemById = async (id: string): Promise<Problem | null> => {
  const problem = await prisma.problem.findUnique({ where: { id } })
  return problem
}

export const deleteProblem = async (id: string): Promise<boolean> => {
  const problem = await findProblemById(id)
  if (!problem) {
    return false
  }

  await prisma.problem.delete({ where: { id } })
  return true
}

// Constructs the problems from input JSON
export const constructProblems = (
  inputProblems: any[]
): Prisma.ProblemCreateInput[] => {
  const problems = inputProblems.map((problem, i) => ({
    ...problem,
    num: i + 1,
    correct: problem.correct.toString(),
  }))
  return problems
}
