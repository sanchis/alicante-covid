import { parse } from 'date-fns'

export function dateParse (date) {
  return parse(date, 'yyyy-MM-dd', new Date())
}
