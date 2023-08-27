import { User } from './users.type'
import { SuccessRespone } from './utils.type'

export type AuthRespone = SuccessRespone<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expire: number
  user: User
}>

export type RefreshTokenResponse = SuccessRespone<{ access_token: string }>
