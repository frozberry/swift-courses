import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import LoginForm from "../../components/forms/LoginForm"
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

export const createUser = async (
  name: string,
  email: string,
  ff: boolean | undefined,
  pp: boolean | undefined,
  kotc: boolean | undefined,
  password = "123"
): Promise<User> => {
  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, ff, pp, kotc, passwordHash },
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
