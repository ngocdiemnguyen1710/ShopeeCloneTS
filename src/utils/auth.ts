import { User } from 'src/types/users.type'

export const setAccessTokenLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessTokenLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const setProfileFromLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileFromLS = () => {
  const profileLs = localStorage.getItem('profile')
  return profileLs ? JSON.parse(profileLs) : null
}
