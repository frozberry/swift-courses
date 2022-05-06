import { ExamWithProblems, ProblemSubmission } from "../../lib/types"

// Creates gradedProblems by combining the problem with the students submission
export const constructGradedProblems = (
  exam: ExamWithProblems,
  submissions: ProblemSubmission[]
) => {
  const gradedProblems = exam.problems.map((problem) => {
    const submission = submissions.find((submission) => {
      return submission.problemId === problem.id
    })
    const gradedProblem = {
      //TODO string conversion might not be needed
      num: problem.num,
      question: problem.question,
      multi: problem.multi,
      correct: problem.correct,
      selected: submission?.selected.toString(),
      options: problem.options,
      unit: problem.unit,
      img: problem.img,
      categories: problem.categories,

      problem: {
        connect: { id: problem.id },
      },
    }
    return gradedProblem
  })

  return gradedProblems
}
