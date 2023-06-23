import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import { AvatarDefault } from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'
import { userSchema } from 'src/utils/rules'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-hot-toast'
import { useAuth } from 'src/contexts/auth.context'
import { setProfileFromLS } from 'src/utils/auth'

type FormData = Pick<userSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
const Profile = () => {
  const { setProfile } = useAuth()
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data

  const updateProfileMutation = useMutation(userApi.updateProfile)

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    const res = await updateProfileMutation.mutateAsync({ ...data, date_of_birth: data?.date_of_birth?.toISOString() })
    setProfile(res.data.data)
    setProfileFromLS(res.data.data)
    refetch()
    toast.success(res.data.message)
  })
  return (
    <div className='shadow-[0 1px 2px 0 rgba(0,0,0,.13)] rounded-sm bg-white px-[1.6875rem] pb-[0.625rem] sm:ml-[1.6875rem]'>
      <div className='border-b border-[#efefef] py-[1.125rem]'>
        <h1 className='text-[1.125rem] font-medium capitalize'>Hồ sơ của tôi</h1>
        <div className='mt-[0.1875rem] text-[0.875rem] leading-[#1.0625rem] text-main-black'>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form className='flex flex-col-reverse items-start pt-[1.875rem] text-[14px] sm:flex-row' onSubmit={onSubmit}>
        <div className='flex-1 pr-[3.125rem]'>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Tên</div>
            <div className='w-[80%] pl-5'>
              <Controls.InputForm
                className='w-full'
                name='name'
                register={register}
                errorMessage={errors.name?.message}
                placeholder='Tên'
              />
            </div>
          </div>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Email</div>
            <div className='w-[80%] pl-5'>nn***************@gmail.com</div>
          </div>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Số điện thoại</div>
            <div className='w-[80%] pl-5'>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <Controls.InputNumber
                    className='w-full'
                    classNameInput='w-full rounded-sm p-2.5 text-sm outline-none border border-gray-300'
                    {...field}
                    onChange={field.onChange}
                    errorMessage={errors.phone?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Địa chỉ</div>
            <div className='w-[80%] pl-5'>
              <Controls.InputForm
                className='w-full'
                name='address'
                register={register}
                errorMessage={errors.address?.message}
                placeholder='Địa chỉ'
              />
            </div>
          </div>
          <Controller
            control={control}
            name='date_of_birth'
            render={({ field }) => {
              return (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )
            }}
          />
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
        <div className='flex w-[17.5rem] justify-center md:border-l md:border-l-[#efefef]'>
          <div className='flex flex-col items-center'>
            <div className='my-[1.25rem] flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#efefef]'>
              <AvatarDefault className='h-[50px] w-[50px] stroke-[#c6c6c6]' />
            </div>
            <input type='file' className='hidden' accept='.jpg, .jpeg, .png' />
            <div className='shadow-[0 1px 1px 0 rgba(0,0,0,.03)] first-letter:h flex h-[40px] w-[104px] justify-center border border-[rgba(0,0,0,.09)] hover:bg-slate-50'>
              <Controls.Button className='capitalize' type='button'>
                Chọn ảnh
              </Controls.Button>
            </div>
            <div className='mb-3 mt-3 text-[0.875rem] leading-5 text-[#999]'>
              <p>Dung lượng file tối đa 1 MB</p>
              <p>Định dạng:.JPEG, .PNG</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile
