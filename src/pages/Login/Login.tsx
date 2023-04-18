import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className=' bg-main-orange'>
      <div className='mx-auto min-h-[600px] max-w-6xl bg-register-img bg-contain bg-center bg-no-repeat px-4'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-20'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-6 shadow-sm lg:ml-10'>
              <div className='text-xl'>Đăng nhập</div>
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
              <div className='mb-4 mt-8'>
                <button className='w-full rounded-sm bg-main-orange py-2.5 text-sm uppercase text-white shadow-[0_1px_1px_rgba(0,0,0,.09)] hover:brightness-105'>
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
