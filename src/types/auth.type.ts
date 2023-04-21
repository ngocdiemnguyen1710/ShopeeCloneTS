import { User } from './users.type'
import { ResponeApi } from './utils.type'

export type AuthRespone = ResponeApi<{
  access_token: string
  expire: string
  user: User
}>
