import { useRouter } from "next/router"
import { QueryFunction, useQuery } from "react-query"
import Loading from "../components/Loading"
import { useSession } from "./useSession"

const NoUser = () => {
  const router = useRouter()
  router.push("/login")
  return null
}

type Payload = {
  data: any
  escape: boolean
  component: JSX.Element | null
}

const useAuthQuery = (
  key: string,
  queryFn: QueryFunction,
  allowInactive = false
) => {
  const query = useQuery(key, queryFn)
  const { session } = useSession()

  const isLoading = query.isLoading || session === undefined
  const isError = query.error

  const payload: Payload = {
    data: query.data,
    escape: false,
    component: null,
  }

  if (session === null) {
    payload.escape = true
    payload.component = <NoUser />
    return payload
  }

  if (isLoading) {
    payload.escape = true
    payload.component = <Loading />
    return payload
  }

  if (isError) {
    payload.escape = true
    payload.component = (
      // @ts-ignore
      <p>{query.error.message}.</p>
    )
    return payload
  }

  return payload
}

export default useAuthQuery
