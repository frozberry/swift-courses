import { useRouter } from "next/router"
import { QueryFunction, useQuery } from "react-query"
import Loading from "../components/Loading"
import { checkUserActive } from "../services/client/accountClient"
import { useSession } from "./useSession"

const NoUser = () => {
  const router = useRouter()
  router.push("/login")
  return null
}

const NoSub = () => {
  const router = useRouter()
  router.push("/select-plan")
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

  // Only check user is active every 3 hours to reduce api calls
  const activeQuery = useQuery("active", checkUserActive, {
    staleTime: 3 * 60 * 60 * 1000,
  })

  const isLoading =
    query.isLoading || activeQuery.isLoading || session === undefined

  const isError = query.error || activeQuery.error

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

  // If user subscription is invalid on a page that requires a valid sub
  if (!activeQuery?.data?.active && !allowInactive) {
    payload.escape = true
    payload.component = <NoSub />
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
