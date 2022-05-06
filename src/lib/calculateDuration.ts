import dayjs from "dayjs"

export const calculateDuration = (start: Date) => {
  return dayjs(start).millisecond() - dayjs().millisecond()
}
