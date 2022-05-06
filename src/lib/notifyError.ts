import axios, { AxiosError } from "axios"
import { signIn } from "next-auth/react"
import Router from "next/router"
import toast from "react-hot-toast"
import { ServerError } from "./types"

const notifyError = (e: any) => {
  if (axios.isAxiosError(e)) {
    const error = e as AxiosError<ServerError>

    if (error?.response?.data.type === "notCredentialUser") {
      signIn("google", { callbackUrl: "/home" })
      return
    }

    if (error?.response?.data.type === "existingExamSession") {
      Router.push("/session")
      return
    }

    toast.error(error.response?.data.message as string)
    return
  }

  toast.error("Unexpected error")
}

export default notifyError
