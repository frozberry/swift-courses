import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ResetPasswordToken } from "../../lib/types"
import { prisma } from "../../prisma/client"
import { findUserByEmail } from "./userService"

/* ---------------------------------- Login --------------------------------- */
export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await findUserByEmail(email.trim())
  if (!user) {
    return null
  }

  const passwordCorrect = await validatePassword(
    password,
    user.passwordHash as string
  )
  if (!passwordCorrect) {
    return null
  }

  return user
}

/* -------------------------------- Password -------------------------------- */
export const validatePassword = async (
  password: string,
  passwordHash: string
) => {
  const correct = await bcrypt.compare(password, passwordHash)
  return correct
}

export const changePassword = async (userId: string, password: string) => {
  const passwordHash = await bcrypt.hash(password, 10)
  const updatedUser = prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  })
  return updatedUser
}

export const resetPassword = async (password: string, token: string) => {
  // eslint-disable-next-line
  const reset = jwt.verify(token, process.env.JWT_SECRET!) as ResetPasswordToken

  if (Date.now() > reset.expires) {
    throw new Error("token expired")
  }

  const updatedUser = await changePassword(reset.id, password)
  return updatedUser
}

export const passwordResetUrl = (userId: string): string => {
  const oneDay = 1000 * 60 * 60 * 24
  const token = jwt.sign(
    {
      id: userId,
      expires: Date.now() + oneDay,
    },
    // eslint-disable-next-line
    process.env.JWT_SECRET!
  )
  const url = `${process.env.NEXT_PUBLIC_URL}/reset-password/${token}`
  return url
}
