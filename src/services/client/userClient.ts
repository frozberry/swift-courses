import { User } from "@prisma/client"
import axios from "axios"

export const getAllUsers = async () => {
  const res = await axios.get<User>("/api/users")
  return res.data
}

export const findUserById = async (id: string) => {
  const res = await axios.get<User>(`/api/users/${id}`)
  return res.data
}
