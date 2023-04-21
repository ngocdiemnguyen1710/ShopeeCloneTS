import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import { loginAccount } from 'src/apis/auth.api'
import { Check, Eye, EyeSlash } from 'src/components/IconSvg'
import InputForm from 'src/components/InputForm'
import { ResponeApi } from 'src/types/utils.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils'

type FormData = Omit<Schema, 'confirm_password'>
const Login = () => {
  const [viewPassword, setViewPassword] = useState<boolean>(false)
  const loginSchema = schema.omit(['confirm_password'])
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosErrorUnprocessableEntity<ResponeApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className=' bg-main-orange'>
      <div className='container min-h-[600px] bg-register-img bg-contain bg-center bg-no-repeat'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-20'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-6 shadow-sm lg:ml-10' onSubmit={onSubmit} noValidate>
              <div className='text-xl'>Đăng nhập</div>
              <div className='mt-6'>
                <InputForm
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
                </InputForm>
              </div>
              <div className='mt-2'>
                <InputForm
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
                </InputForm>
              </div>
              <div className='mb-4 mt-8'>
                <button
                  className={`w-full rounded-sm py-2.5 text-sm uppercase text-white shadow-[0_1px_1px_rgba(0,0,0,.09)] hover:brightness-105 ${
                    errors?.email?.message || errors?.password?.message
                      ? 'cursor-not-allowed bg-main-orange opacity-75'
                      : 'bg-main-orange'
                  }`}
                >
                  Đăng nhập
                </button>
                <div className='mt-2 flex items-center justify-between text-xs text-blue-800'>
                  <button>Quên mật khẩu</button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      alert('Tính năng đang được cập nhật')
                    }}
                  >
                    Đăng nhập với SMS
                  </button>
                </div>
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
                <div className='mt-5 flex items-center justify-center text-sm'>
                  <p className='mr-1 text-gray-text'>Bạn mới biết đến Shopee?</p>{' '}
                  <Link to={'/register'} className='text-main-orange'>
                    Đăng ký
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

export default Login
