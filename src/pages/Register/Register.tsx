import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { getRules } from 'src/utils/rules'
import { Check, Eye, EyeSlash } from 'src/components/IconSvg'

interface FormData {
  email: string
  password: string
  confirm_password: string
}
const Register = () => {
  const [viewPassword, setViewPassword] = useState<boolean>(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()
  console.log(getValues('email'))
  const rules = getRules(getValues)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className=' bg-main-orange'>
      <div className='container min-h-[600px] bg-register-img bg-contain bg-center bg-no-repeat'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-20'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-6 shadow-sm lg:ml-10' onSubmit={onSubmit} noValidate>
              <div className='text-xl'>Đăng ký</div>
              <div className='mt-6'>
                <div
                  className={`flex items-center border border-gray-300 focus:border-gray-500 focus:shadow-sm ${
                    errors?.email?.message && 'border-error-box bg-error-input focus:border-error-box'
                  }`}
                >
                  <input
                    type='email'
                    className='w-full flex-1 rounded-sm bg-transparent p-2.5 text-sm outline-none'
                    placeholder='Email'
                    {...register('email', rules.email)}
                  />
                  <div className='bg-transparent px-4'>
                    {!errors?.email?.message && getValues('email') && <Check className='flex h-4 w-4 items-center' />}
                  </div>
                </div>
                {errors?.email?.message && (
                  <div className='mt-1 min-h-[1.25rem] text-xs text-red-600'>{errors?.email?.message}</div>
                )}
              </div>
              <div className='mt-2'>
                <div
                  className={`flex items-center border border-gray-300 focus:border-gray-500 focus:shadow-sm ${
                    errors?.password?.message && 'border-error-box bg-error-input focus:border-error-box'
                  }`}
                >
                  <input
                    type={viewPassword ? 'text' : 'password'}
                    autoComplete='on'
                    className='w-full flex-1 rounded-sm bg-transparent p-2.5 text-sm outline-none'
                    placeholder='Mật khẩu'
                    {...register('password', rules.password)}
                  />
                  <button
                    className='bg-transparent px-4'
                    onClick={(e) => {
                      e.preventDefault()
                      setViewPassword(!viewPassword)
                    }}
                  >
                    {viewPassword ? <Eye className={'h-4 w-4'} /> : <EyeSlash className={'h-4 w-4'} />}
                  </button>
                </div>

                {errors?.password?.message && (
                  <div className='mt-1 min-h-[1.25rem] text-xs text-red-600'>{errors?.password?.message}</div>
                )}
              </div>
              <div className='mt-2'>
                <div
                  className={`flex items-center border border-gray-300 focus:border-gray-500 focus:shadow-sm ${
                    errors?.confirm_password?.message && 'border-error-box bg-error-input focus:border-error-box'
                  }`}
                >
                  <input
                    type={viewConfirmPassword ? 'text' : 'password'}
                    autoComplete='on'
                    className='w-full flex-1 rounded-sm bg-transparent p-2.5 text-sm outline-none'
                    placeholder='Mật khẩu'
                    {...register('confirm_password', rules.confirm_password)}
                  />
                  <button
                    className='bg-transparent px-4'
                    onClick={(e) => {
                      e.preventDefault()
                      setViewConfirmPassword(!viewConfirmPassword)
                    }}
                  >
                    {viewConfirmPassword ? <Eye className={'h-4 w-4'} /> : <EyeSlash className={'h-4 w-4'} />}
                  </button>
                </div>
                {errors?.confirm_password?.message && (
                  <div className='mt-1 min-h-[1.25rem] text-xs text-red-600'>{errors?.confirm_password?.message}</div>
                )}
              </div>
              <div className='my-8'>
                <button
                  className={`w-full rounded-sm py-2.5 text-sm uppercase text-white shadow-[0_1px_1px_rgba(0,0,0,.09)] hover:brightness-105 ${
                    errors?.email?.message || errors?.password?.message || errors?.confirm_password?.message
                      ? 'cursor-not-allowed bg-main-orange opacity-75'
                      : 'bg-main-orange'
                  }`}
                >
                  Đăng ký
                </button>
              </div>
              <div>
                <div className='flex items-center pb-3'>
                  <div className='h-px w-full flex-1 bg-[#dbdbdb]'></div>
                  <span className='px-4 text-xs uppercase text-gray-1'>hoặc</span>
                  <div className='h-px w-full flex-1 bg-[#dbdbdb]'></div>
                </div>
                <div className='flex items-center'>
                  <button
                    className='m-1 flex h-[40px] w-full flex-1 items-center justify-center rounded-sm border border-gray-text hover:bg-slate-100'
                    onClick={(e) => {
                      e.preventDefault()
                      alert('Tính năng đang được cập nhật')
                    }}
                  >
                    <FaFacebook className='text-color-blue mr-2 h-[20px] w-[20px] text-blue-600' />{' '}
                    <span className='text-sm'>Facebook</span>
                  </button>
                  <button
                    className='m-1 flex h-[40px] w-full flex-1 items-center justify-center rounded-sm border border-gray-text hover:bg-slate-100'
                    onClick={(e) => {
                      e.preventDefault()
                      alert('Tính năng đang được cập nhật')
                    }}
                  >
                    <FcGoogle className='mr-2 h-[20px] w-[20px]' /> <span className='text-sm'>Google</span>
                  </button>
                </div>
                <div className='mb-5 mt-4 text-center text-xs'>
                  <p>Bằng việc đăng kí, bạn đã đồng ý với Shopee về</p>
                  <p>
                    <span className='text-main-orange'>Điều khoản dịch vụ</span>
                    {''} & {''}
                    <span className='text-main-orange'>Chính sách bảo mật</span>
                  </p>
                </div>
                <div className='flex items-center justify-center text-sm'>
                  <p className='mr-1 text-gray-text'>Bạn đã có tài khoản?</p>{' '}
                  <Link to={'/login'} className='text-main-orange'>
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
