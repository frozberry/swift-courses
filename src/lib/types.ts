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

/* ----------------------------------- App ---------------------------------- */
export type Course = {
  name: string
  id: number
  code: string
  modules: Module[]
}

export type Module = {
  name: string
  id: number
  lessons: Lesson[]
}

export type Lesson = {
  name: string
  url: string
  description: string
  id: number
  pdfUrl?: string
  checklistUrl?: string
}
