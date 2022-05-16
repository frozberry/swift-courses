import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import dayjs from "dayjs"
import { prisma } from "../../prisma/client"

export const getUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany()
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
export const toggleUserField = async (
  userId: string,
  field: string
): Promise<User | null> => {
  if (!["admin", "ff", "pp", "kotc"].includes(field)) {
    console.log(field)
    throw new Error(`Invalid field: ${field}`)
  }

  const existingUser = (await findUserById(userId)) as User

  const data = {
    admin: field === "admin" ? !existingUser.admin : undefined,
    ff: field === "ff" ? !existingUser.ff : undefined,
    pp: field === "pp" ? !existingUser.pp : undefined,
    kotc: field === "kotc" ? !existingUser.kotc : undefined,
  }

  const user = await prisma.user.update({ where: { id: userId }, data })
  return user
}

export const fufillCourse = async (
  name: string,
  email: string,
  id: string,
  ff: boolean | undefined,
  pp: boolean | undefined,
  kotc: boolean | undefined
) => {
  const ffDate = ff ? new Date() : undefined
  const ppDate = pp ? new Date() : undefined
  const kotcDate = kotc ? new Date() : undefined

  const savedUser = await prisma.user.update({
    where: { email: email! },
    data: {
      stripeId: id,
      ff,
      pp,
      kotc,
      ffDate,
      ppDate,
      kotcDate,
    },
  })

  if (!savedUser.name) {
    await prisma.user.update({
      where: { email: email! },
      data: {
        name,
      },
    })
  }
  return
}

export const createUser = async (
  name: string,
  email: string,
  stripeId: string,
  ff: boolean | undefined,
  pp: boolean | undefined,
  kotc: boolean | undefined
): Promise<User> => {
  const password = Math.random().toString(36).slice(2, 12)
  const passwordHash = await bcrypt.hash(password, 10)

  const ffDate = ff ? new Date() : undefined
  const ppDate = pp ? new Date() : undefined
  const kotcDate = kotc ? new Date() : undefined

  const user = await prisma.user.create({
    data: {
      name,
      email,
      stripeId,
      ff,
      pp,
      kotc,
      passwordHash,
      ffDate,
      ppDate,
      kotcDate,
    },
  })

  return user
}

export const deleteUser = async (id: string): Promise<boolean> => {
  const user = await findUserById(id)
  if (!user) {
    return false
  }

  await prisma.user.delete({ where: { id } })
  return true
}

export const updateActiveDates = async (user: User) => {
  const today = new Date()
  const alreadyLoggedToday = user.activeDates.some((activeDates) =>
    dayjs(activeDates).isSame(today)
  )

  if (!alreadyLoggedToday) {
    await prisma.user.update({
      where: { id: user.id },
      data: { activeDates: [...user.activeDates, today] },
    })
  }
}
