import { ExamWithProblems, ProblemSubmission } from "./types"

const seedAnswers = (exam: ExamWithProblems): ProblemSubmission[] => {
  const seedAnswers = exam.problems.map((p: any) => {
    const correct = Math.random() < 0.8
    const wrongAns = p.multi ? p.options[0] : "1"
    return {
      selected: correct ? p.correct : wrongAns,
      problemId: p.id,
    }
  })
  return seedAnswers
}

export default seedAnswers
