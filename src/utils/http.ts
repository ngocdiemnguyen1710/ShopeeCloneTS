import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-hot-toast'
import { AuthRespone, RefreshTokenResponse } from 'src/types/auth.type'
import {
  clearLS,
  getAccessTokenLS,
  getRefreshTokenLS,
  setAccessTokenLS,
  setProfileFromLS,
  setRefreshTokenLS
} from './auth'
import config from 'src/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorRespone } from 'src/types/utils.type'

// Purchase: 1-3
//Me: 2-5
//Refresh token cho purchase: 3-4
//Gọi lại purchase: 4-6
//Refresh token mới cho Me: 5-6
//Gọi lại Me: 6
class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenLS()
    this.refreshToken = getRefreshTokenLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10, // 10s
        'expire-refresh-token': 60 * 60 // 1h
      }
    })
    // Add a request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthRespone
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenLS(this.accessToken)
          setRefreshTokenLS(this.refreshToken)
          setProfileFromLS(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        //Chỉ toast những lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        //Lỗi Unauthorized (401) có rất nhiều trường hợp
        //-Token không đúng
        //-Không truyền token
        //-Token hết hạn

        //Nếu là lỗi 401
        if (isAxiosUnauthorizedError<ErrorRespone<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
          const { url } = config
          //Trường hợp token hết hạn và request đó không phải là của request refresh token
          //thì chúng ta mới tiến hành gọi refresh token

          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              if (config.headers) config.headers.authorization = access_token
              //tiếp tục gọi lại request cũ bị lỗi
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }

          // Còn những trường hợp như token ko đúng
          // Không truyền token
          // Token hết hạn nhưng gọi refresh token bị fail
          // Tiến hành xóa local storage và toast message
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error?.response?.data?.data?.message || (error.response?.data.message as string))
        }
        return Promise.reject(error)
      }
    )
  }

  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
