import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import userApi from 'src/apis/user.api'
import { Eye, EyeSlash } from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'
import { ErrorRespone } from 'src/types/utils.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosErrorUnprocessableEntity } from 'src/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

const ChangePassword = () => {
  const [viewPassword, setViewPassword] = useState<boolean>(false)
  const [viewNewPassword, setViewNewPassword] = useState<boolean>(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState<boolean>(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      confirm_password: '',
      new_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosErrorUnprocessableEntity<ErrorRespone<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData] as string,
              type: 'Server'
            })
          })
        }
      }
    }
  })
  return (
    <div className='shadow-[0 1px 2px 0 rgba(0,0,0,.13)] rounded-sm bg-white px-[1.6875rem] pb-[0.625rem] sm:ml-[1.6875rem]'>
      <div className='border-b border-[#efefef] py-[1.125rem]'>
        <h1 className='text-[1.125rem] font-medium capitalize'>Đổi mật khẩu</h1>
        <div className='mt-[0.1875rem] text-[0.875rem] leading-[#1.0625rem] text-main-black'>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>

      <form className='mr-auto mt-8 max-w-2xl pt-[1.875rem] text-[14px]' onSubmit={onSubmit}>
        <div className='pr-[3.125rem]'>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Mật khẩu cũ</div>
            <div className='w-[80%] pl-5'>
              <Controls.InputForm
                type={viewPassword ? 'text' : 'password'}
                className='w-full'
                name='password'
                register={register}
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu cũ'
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
          </div>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Mật khẩu mới</div>
            <div className='w-[80%] pl-5'>
              <Controls.InputForm
                type={viewNewPassword ? 'text' : 'password'}
                className='w-full'
                name='new_password'
                register={register}
                errorMessage={errors.new_password?.message}
                placeholder='Mật khẩu mới'
              >
                <button
                  className='bg-transparent px-4'
                  onClick={(e) => {
                    e.preventDefault()
                    setViewNewPassword(!viewNewPassword)
                  }}
                >
                  {viewNewPassword ? <Eye className={'h-4 w-4'} /> : <EyeSlash className={'h-4 w-4'} />}
                </button>
              </Controls.InputForm>
            </div>
          </div>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Nhập lại mật khẩu</div>
            <div className='w-[80%] pl-5'>
              <Controls.InputForm
                type={viewConfirmPassword ? 'text' : 'password'}
                className='w-full'
                name='confirm_password'
                register={register}
                errorMessage={errors.confirm_password?.message}
                placeholder='Nhập lại mật khẩu'
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
          </div>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'></div>
            <div className='w-[80%] pl-5'>
              <div className='flex h-[40px] w-[70px] items-center justify-center rounded-sm bg-main-orange hover:opacity-90'>
                <Controls.Button className='text-white' type='submit'>
                  Lưu
                </Controls.Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword
