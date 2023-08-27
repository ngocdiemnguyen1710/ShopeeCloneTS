import { User } from 'src/types/users.type'

export const LocalStorageEventTarget = new EventTarget()

export const setAccessTokenLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const setRefreshTokenLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getAccessTokenLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshTokenLS = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearLSEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEvent)
}

export const setProfileFromLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = () => {
  const profileLs = localStorage.getItem('profile')
  return profileLs ? JSON.parse(profileLs) : null
}
