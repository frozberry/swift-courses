import { Category, GradedCategory, Prisma } from "@prisma/client"

/* ----------------------------- UserWithoutDate ---------------------------- */
const userWithoutDate = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    gender: true,
    admin: true,
    profilePicture: true,
    score: true,
    gradedExams: true,
    gradedCategories: true,
  },
})

export type UserWithoutDate = Prisma.UserGetPayload<typeof userWithoutDate>

/* ------------------------------- UserProfile ------------------------------ */
const userProfile = Prisma.validator<Prisma.UserArgs>()({
  select: {
    firstName: true,
    lastName: true,
    dob: true,
    gender: true,
    profilePicture: true,
    score: true,
  },
})

export type UserProfile = Prisma.UserGetPayload<typeof userProfile>

/* ---------------------------- ExamWithProblems ---------------------------- */
const examWithProblems = Prisma.validator<Prisma.ExamArgs>()({
  include: {
    problems: true,
  },
})

export type ExamWithProblems = Prisma.ExamGetPayload<typeof examWithProblems>

/* ---------------------- GradedExamWithGradedProblems ---------------------- */
const gradedExamWithGradedProblems = Prisma.validator<Prisma.GradedExamArgs>()({
  include: {
    gradedProblems: true,
  },
})

export type GradedExamWithGradedProblems = Prisma.GradedExamGetPayload<
  typeof gradedExamWithGradedProblems
>
/* --------------------------- GradedExamWithExam --------------------------- */
const gradedExamWithExam = Prisma.validator<Prisma.GradedExamArgs>()({
  include: {
    exam: true,
  },
})

export type GradedExamWithExam = Prisma.GradedExamGetPayload<
  typeof gradedExamWithExam
>

/* -------------------------------- Numbered -------------------------------- */
// Generic type for Exams and GradedExams
export type Numbered = {
  num: number
}

/* --------------------------- CategoryWithAverage -------------------------- */
export type CategoryWithAverage = {
  category: Category
  average: number
}

/* --------------------------- ResetPasswordToken --------------------------- */
export type ResetPasswordToken = {
  id: string
  expires: number
}

/* -------------------------------- ServerError -------------------------------- */
export type ServerError = {
  type: string
  message: string
}

/* --------------------------- ExamResultOverview --------------------------- */
export type ExamResultOverivew = {
  examId: string
  num: number
  attempts: GradedExamWithExam[]
}

/* --------------------------------- Session -------------------------------- */
export type MySession = {
  id: string
  expires: string
  user: SessionUser
}

type SessionUser = {
  name: string | null
  email: string
  image: string | null
}

/* ------------------------------- ProblemJson ------------------------------ */
export type ProblemJson = {
  question: string
  correct: string | number
  categories: Category[]
  options?: string[]
  multi?: boolean
  unit?: string
  img?: string
}

/* ---------------------------- ProblemSubmission --------------------------- */
export type ProblemSubmission = {
  problemId: string
  selected: string
}

export type ViewOptions = "all" | "correct" | "incorrect"

export type AccountPageData = {
  firstName: string | null
  lastName: string | null
  dob: Date | null
  gender: string | null
  stripeId: string | null
  isOAuth: boolean
}

export type RadarData = {
  category: string
  ["Your child"]: number
  Average: number
}

export type CategoryStatsData = (CategoryWithAverage & GradedCategory)[]
