export interface SuccessRespone<Data> {
  message: string
  data: Data
}

export interface ErrorRespone<Data> {
  message: string
  data?: Data
}

//Cú pháp -? loại bỏ undefined key optional ?
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
