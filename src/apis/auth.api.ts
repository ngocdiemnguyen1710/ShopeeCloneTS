import { AuthRespone } from 'src/types/auth.type'
import http from 'src/utils/http'
const authApi = {
  registerAccount: (body: { email: string; password: string }) => {
    return http.post<AuthRespone>('/register', body)
  },

  loginAccount: (body: { email: string; password: string }) => {
    return http.post<AuthRespone>('/login', body)
  },

  logoutAccount: () => {
    return http.post('/logout')
  }
}

export default authApi
