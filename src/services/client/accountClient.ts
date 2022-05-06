import axios from "axios"
import toast from "react-hot-toast"
import notifyError from "../../lib/notifyError"
import { AccountPageData } from "../../lib/types"

export const signup = async (
  parentName: string,
  email: string,
  password: string
) => {
  const data = {
    parentName,
    email,
    password,
  }
  const res = await axios.post<string>("/api/users", data)

  return res.data
}

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const data = {
    currentPassword,
    newPassword,
  }

  await axios.put("/api/users/password", data)
  toast.success("Password updated successfully")

  return
}

export const isUserOAuth = async () => {
  try {
    const res = await axios.get<boolean>("/api/users/oauth")
    return res.data
  } catch (e) {
    notifyError(e)
  }
}

export const getAccountPageData = async () => {
  try {
    const res = await axios.get<AccountPageData>("/api/users/account")
    return res.data
  } catch (e) {
    notifyError(e)
  }
}

export const checkUserActive = async () => {
  try {
    const res = await axios.get<{ active: boolean }>("/api/users/active")
    return res.data
  } catch (e) {
    notifyError(e)
  }
}
