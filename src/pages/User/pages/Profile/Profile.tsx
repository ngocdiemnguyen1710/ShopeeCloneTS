import { AvatarDefault } from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'

const Profile = () => {
  return (
    <div className='shadow-[0 1px 2px 0 rgba(0,0,0,.13)] ml-[1.6875rem] rounded-sm bg-white px-[1.6875rem] pb-[0.625rem]'>
      <div className='border-b border-[#efefef] py-[1.125rem]'>
        <h1 className='text-[1.125rem] font-medium capitalize'>Hồ sơ của tôi</h1>
        <div className='mt-[0.1875rem] text-[0.875rem] leading-[#1.0625rem] text-main-black'>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <div className='flex flex-col-reverse items-start pt-[1.875rem] text-[14px] sm:flex-row'>
        <form className='flex-1 pr-[3.125rem]'>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Tên</div>
            <div className='w-[80%] pl-5'>
              <Controls.InputForm className='w-full' />
            </div>
          </div>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Email</div>
            <div className='w-[80%] pl-5'>nn***************@gmail.com</div>
          </div>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Số điện thoại</div>
            <div className='w-[80%] pl-5'>
              <Controls.InputForm className='w-full' />
            </div>
          </div>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Địa chỉ</div>
            <div className='w-[80%] pl-5'>
              <Controls.InputForm className='w-full' />
            </div>
          </div>
          <div className='flex items-center pb-[30px]'>
            <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Ngày sinh</div>
            <div className='w-[80%] pl-5'>
              <div className='flex justify-between'>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3 outline-none'>
                  <option value=''>Ngày</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3 outline-none'>
                  <option value=''>Tháng</option>
                </select>
                <select className='h-10 w-[32%] rounded-sm border border-black/10 px-3 outline-none'>
                  <option value=''>Năm</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className='flex w-[17.5rem] justify-center md:border-l md:border-l-[#efefef]'>
          <div className='flex flex-col items-center'>
            <div className='my-[1.25rem] flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#efefef]'>
              <AvatarDefault className='h-[50px] w-[50px] stroke-[#c6c6c6]' />
            </div>
            <input type='file' className='hidden' accept='.jpg, .jpeg, .png' />
            <div className='shadow-[0 1px 1px 0 rgba(0,0,0,.03)] first-letter:h flex h-[40px] w-[104px] justify-center border border-[rgba(0,0,0,.09)] hover:bg-slate-50'>
              <Controls.Button className='capitalize'>Chọn ảnh</Controls.Button>
            </div>
            <div className='mt-3 text-[0.875rem] leading-5 text-[#999]'>
              <p>Dung lượng file tối đa 1 MB</p>
              <p>Định dạng:.JPEG, .PNG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
