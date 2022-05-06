import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import _ from "lodash"
import { AccountPageData } from "../../lib/types"
import { prisma } from "../../prisma/client"
import { getUsersGradedExams } from "./gradedExamService"

export const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany()
  return users
}

export const getSubbedUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({
    where: { subEnds: { not: null } },
  })
  return users
}

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { id } })
  return user
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { email } })
  return user
}

export const createUser = async (
  parentName: string,
  email: string,
  password: string
): Promise<string> => {
  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name: parentName.trim(), email: email.trim(), passwordHash },
  })

  // TODO no longer needs to send token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    // eslint-disable-next-line
    process.env.JWT_SECRET!
  )

  return token
}

export const deleteUser = async (id: string): Promise<boolean> => {
  const user = await findUserById(id)
  if (!user) {
    return false
  }

  await prisma.user.delete({ where: { id } })
  return true
}

export const userIsOAuth = async (id: string): Promise<boolean> => {
  const user = await findUserById(id)
  if (user?.passwordHash) {
    return false
  }
  return true
}

export const updateUserScore = async (userId: string) => {
  console.log("Updating users score")
  const gradedExams = await getUsersGradedExams(userId, false)

  const firstAttempts = gradedExams.filter(
    (gradedExam) => gradedExam.firstAttempt
  )
  const score = _.meanBy(firstAttempts, (gradedExam) => gradedExam.percent)

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      score,
    },
  })
}

export const getUsersAccountPage = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      dob: true,
      gender: true,
      passwordHash: true,
      stripeId: true,
    },
  })
  if (!user) throw new Error("User does not exist")

  const isOAuth = !user?.passwordHash

  const account: AccountPageData = {
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    gender: user.gender,
    stripeId: user.stripeId,
    isOAuth,
  }

  return account
}
