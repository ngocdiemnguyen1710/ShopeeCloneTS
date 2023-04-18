import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className=' bg-main-orange'>
      <div className='mx-auto min-h-[600px] max-w-6xl bg-register-img bg-contain bg-center bg-no-repeat px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-20'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-6 shadow-sm lg:ml-10'>
              <div className='text-xl'>Đăng ký</div>
              <div className='mt-6'>
                <input
                  type='email'
                  name='email'
                  className='w-full rounded-sm border border-gray-300 p-2.5 text-sm outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                />
                {/* <div className='mt-1 min-h-[1rem] text-sm text-red-600'></div> */}
              </div>
              <div className='mt-3'>
                <input
                  type='Password'
                  name='password'
                  className='w-full rounded-sm border border-gray-300 p-2.5 text-sm outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Mật khẩu'
                />
                {/* <div className='mt-1 min-h-[1rem] text-sm text-red-600'></div> */}
              </div>
              <div className='mt-3'>
                <input
                  type='Password'
                  name='re-password'
                  className='w-full rounded-sm border border-gray-300 p-2.5 text-sm outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Nhập lại mật khẩu'
                />
                {/* <div className='mt-1 min-h-[1rem] text-sm text-red-600'></div> */}
              </div>
              <div className='my-8'>
                <button className='w-full rounded-sm bg-main-orange py-2.5 text-sm uppercase text-white shadow-[0_1px_1px_rgba(0,0,0,.09)] hover:brightness-105'>
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
