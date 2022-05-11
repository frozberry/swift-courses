import axios, { AxiosError } from "axios"
import Router from "next/router"
import toast from "react-hot-toast"
import { ServerError } from "./types"

const notifyError = (e: any) => {
  if (axios.isAxiosError(e)) {
    const error = e as AxiosError<ServerError>

    if (error?.response?.data.type === "passwordAlreadySet") {
      toast.error(error.response?.data.message as string)
      Router.push("/login")
      return
    }

    toast.error(error.response?.data.message as string)
    return
  }

  toast.error("Unexpected error")
}

export default notifyError
