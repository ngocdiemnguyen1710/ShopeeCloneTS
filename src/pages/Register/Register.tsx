import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { Check, Eye, EyeSlash } from 'src/components/IconSvg'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import omit from 'lodash/omit'
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { useAuth } from 'src/contexts/auth.context'
import Controls from 'src/components/controls/Controls'
import { path } from 'src/constants/path'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>

const Register = () => {
  const { setIsAuthenticated, setProfile } = useAuth()

  const [viewPassword, setViewPassword] = useState<boolean>(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState<boolean>(false)

  const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
      },
      onError: (error) => {
        if (isAxiosErrorUnprocessableEntity<ErrorRespone<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
          // if (formError?.email) {
          //   setError('email', {
          //     message: formError.email,
          //     type: 'Server'
          //   })
          // }
          // if (formError?.password) {
          //   setError('password', {
          //     message: formError.password,
          //     type: 'Server'
          //   })
          // }
        }
      }
    })
  })

  return (
    <div className=' bg-main-orange'>
      <Helmet>
        <title>Đăng kí | Shopee Clone</title>
        <meta name='description' content='Đây là dự án Shopee Clone' />
      </Helmet>
      <div className='container min-h-[600px] bg-register-img bg-center bg-no-repeat'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-20'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-6 shadow-sm lg:ml-10' onSubmit={onSubmit} noValidate>
              <div className='text-xl'>Đăng ký</div>
              <div className='mt-6'>
                <Controls.InputForm
                  type='email'
                  placeholder='Email'
                  register={register}
                  autoComplete='on'
                  errorMessage={errors?.email?.message}
                  name='email'
                >
                  <div className='bg-transparent px-4'>
                    {!errors?.email?.message && getValues('email') && <Check className='flex h-4 w-4 items-center' />}
                  </div>
                </Controls.InputForm>
              </div>
              <div className='mt-2'>
                <Controls.InputForm
                  type={viewPassword ? 'text' : 'password'}
                  placeholder='Mật khẩu'
                  register={register}
                  autoComplete='on'
                  errorMessage={errors?.password?.message}
                  name='password'
                >
                  <button
                    className='bg-transparent px-4'
                    onClick={(e) => {
                      e.preventDefault()
                      setViewPassword(!viewPassword)
                    }}
                  >
                    {viewPassword ? <Eye className={'h-4 w-4'} /> : <EyeSlash className={'h-4 w-4'} />}
                  </button>
                </Controls.InputForm>
              </div>
              <div className='mt-2'>
                <Controls.InputForm
                  type={viewConfirmPassword ? 'text' : 'password'}
                  placeholder='Nhập lại mật khẩu'
                  register={register}
                  autoComplete='on'
                  errorMessage={errors?.confirm_password?.message}
                  name='confirm_password'
                >
                  <button
                    className='bg-transparent px-4'
                    onClick={(e) => {
                      e.preventDefault()
                      setViewConfirmPassword(!viewConfirmPassword)
                    }}
                  >
                    {viewConfirmPassword ? <Eye className={'h-4 w-4'} /> : <EyeSlash className={'h-4 w-4'} />}
                  </button>
                </Controls.InputForm>
              </div>
              <div className='my-8'>
                <Controls.Button
                  className={`w-full rounded-sm py-2.5 text-sm uppercase text-white shadow-[0_1px_1px_rgba(0,0,0,.09)] hover:brightness-105 ${
                    errors?.email?.message ||
                    errors?.password?.message ||
                    errors?.confirm_password?.message ||
                    registerAccountMutation.isLoading
                      ? 'cursor-not-allowed bg-main-orange opacity-75'
                      : 'bg-main-orange'
                  }`}
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng ký
                </Controls.Button>
              </div>
              <div>
                <div className='flex items-center pb-3'>
                  <div className='h-px w-full flex-1 bg-[#dbdbdb]'></div>
                  <span className='px-4 text-xs uppercase text-gray-1'>hoặc</span>
                  <div className='h-px w-full flex-1 bg-[#dbdbdb]'></div>
                </div>
                <div className='flex items-center'>
                  <Controls.Button
                    className='m-1 flex h-[40px] w-full flex-1 items-center justify-center rounded-sm border border-gray-text hover:bg-slate-100'
                    onClick={(e) => {
                      e.preventDefault()
                      alert('Tính năng đang được cập nhật')
                    }}
                  >
                    <FaFacebook className='text-color-blue mr-2 h-[20px] w-[20px] text-blue-600' />{' '}
                    <span className='text-sm'>Facebook</span>
                  </Controls.Button>

                  <Controls.Button
                    className='m-1 flex h-[40px] w-full flex-1 items-center justify-center rounded-sm border border-gray-text hover:bg-slate-100'
                    onClick={(e) => {
                      e.preventDefault()
                      alert('Tính năng đang được cập nhật')
                    }}
                  >
                    <FcGoogle className='mr-2 h-[20px] w-[20px]' /> <span className='text-sm'>Google</span>
                  </Controls.Button>
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
                  <Link to={path.login} className='text-main-orange'>
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
