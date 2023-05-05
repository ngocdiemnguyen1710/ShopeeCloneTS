import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions } //Khai báo để có gợi ý
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Vui lòng điền vào mục này'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5-160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5-160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Vui lòng điền vào mục này'
    },

    maxLength: {
      value: 160,
      message: 'Độ dài từ 6-160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6-160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Vui lòng điền vào mục này'
    },

    maxLength: {
      value: 160,
      message: 'Độ dài từ 6-160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6-160 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Mật khẩu nhập lại không đúng. Vui lòng kiểm tra lại'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Vui lòng nhập vào mục này')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5-160 ký tự')
    .max(160, 'Độ dài từ 5-160 ký tự'),
  password: yup
    .string()
    .required('Vui lòng nhập vào mục này')
    .min(6, 'Độ dài từ 6-160 ký tự')
    .max(160, 'Độ dài từ 6-160 ký tự'),
  confirm_password: yup
    .string()
    .required('Vui lòng nhập vào mục này')
    .min(6, 'Độ dài từ 6-160 ký tự')
    .max(160, 'Độ dài từ 6-160 ký tự')
    .oneOf([yup.ref('password')], 'Mật khẩu nhập lại không đúng. Vui lòng nhập lại'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  })
})
export type Schema = yup.InferType<typeof schema>
