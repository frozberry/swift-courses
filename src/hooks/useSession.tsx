import { useQuery } from "react-query"
import { MySession } from "../lib/types"

export async function fetchSession() {
  const res = await fetch("/api/auth/session")
  const session = await res.json()
  if (Object.keys(session).length) {
    return session
  }
  return null
}

export function useSession() {
  const query = useQuery(["session"], fetchSession, {
    staleTime: 60 * 1000 * 60 * 3, // 3 hours
  })
  const { data } = query
  return { session: data as MySession }
}
