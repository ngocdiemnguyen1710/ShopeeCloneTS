import axios, { AxiosError, HttpStatusCode } from 'axios'
import config from 'src/constants/config'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosErrorUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumSignificantDigits: 1 })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i,${id}`
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i,')
  return arr[arr.length - 1]
}

export const handleLimitNumber = (status: number | string) => {
  if (Number(status) > 0 && Number(status) < 99) {
    return status
  }
  if (Number(status) > 99) {
    return (status = '99+')
  }
}

export const getAvatarUrl = (avatarName?: string) => {
  return `${config.baseUrl}images/${avatarName}`
}
