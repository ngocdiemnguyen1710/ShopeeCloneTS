import { User } from './users.type'
import { SuccessRespone } from './utils.type'

export type AuthRespone = SuccessRespone<{
  access_token: string
  expire: string
  user: User
}>
