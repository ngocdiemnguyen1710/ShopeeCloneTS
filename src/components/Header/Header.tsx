import { Link } from 'react-router-dom'
import { FaFacebook } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { ArrowDown, AvatarDefault, Bell, Cart, Language, Logo, SearchIcon, Support } from '../IconSvg'
import Popper from '../Popper'
import { useMutation } from '@tanstack/react-query'
import { logoutAccount } from 'src/apis/auth.api'
import { useAuth } from 'src/contexts/auth.context'
import { path } from 'src/constants/path'

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useAuth()
  const logoutMutation = useMutation({
    mutationFn: logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
      <div className='container flex items-center justify-between py-1.5 text-white'>
        <nav className='flex items-center text-sm font-light'>
          <div className='border-r-2 border-[hsla(0,0%,100%,.22)] pr-1.5'>
            <Link to={'#'} className='hover:brightness-90'>
              <span>Kênh người bán</span>
            </Link>
          </div>
          {!isAuthenticated && (
            <div className='border-r-2 border-[hsla(0,0%,100%,.22)] px-1.5'>
              <Link to={'#'} className='hover:brightness-90'>
                <span>Trở thành Người bán Shopee</span>
              </Link>
            </div>
          )}
          <div className='border-r-2 border-[hsla(0,0%,100%,.22)] px-1.5'>
            <Link to={'#'} className='hover:brightness-90'>
              <span>Tải ứng dụng</span>
            </Link>
          </div>
          <div className='flex items-center gap-1 px-1.5'>
            <span>Kết nối</span>
            <Link to='#' className='mb-[-4px]'>
              <button>
                <FaFacebook className='h-4 w-4' />
              </button>
            </Link>
            <Link to='#' className='mb-[-4px]'>
              <button>
                <RiInstagramFill className='h-5 w-5' />
              </button>
            </Link>
          </div>
        </nav>
        <nav className='flex gap-1 text-sm'>
          <div className='pr-1.5'>
            <Link to={'#'} className='flex items-center hover:brightness-90'>
              <div>
                <Bell className='mr-1 w-3.5 fill-current' />
              </div>
              <span>Thông Báo</span>
            </Link>
          </div>
          <div className='px-1.5'>
            <Link to={'#'} className='flex items-center hover:brightness-90'>
              <Support className='mr-1 fill-current' />
              <span>Hỗ trợ</span>
            </Link>
          </div>

          <Popper iconLeft={<Language className='' />} iconRight={<ArrowDown className='ml-1' />} name={'Tiếng Việt'}>
            <ul className='flex min-w-[12.5rem] flex-col items-center justify-start rounded-sm bg-white text-[#333] shadow-md'>
              <li className='w-full cursor-pointer p-3 hover:text-main-orange'>
                <span className=''>Tiếng Việt</span>
              </li>
              <li className='w-full cursor-pointer p-3 hover:text-main-orange'>
                <span className=''>English</span>
              </li>
            </ul>
          </Popper>
          <div>
            {!isAuthenticated && (
              <div className='px-1.5'>
                <div className='flex items-center gap-1'>
                  <Link to={path.register} className='border-r border-[hsla(0,0%,100%,.22)] pr-2 hover:brightness-90'>
                    <span>Đăng Ký</span>
                  </Link>
                  <Link to={path.login} className='pl-1.5 hover:brightness-90'>
                    <span>Đăng Nhập</span>
                  </Link>
                </div>
              </div>
            )}
            {isAuthenticated && (
              <Popper
                iconLeft={<AvatarDefault className='stroke-[#c6c6c6]' />}
                name={profile?.email}
                className='h-5 w-5 rounded-full bg-[#f5f5f5] p-1'
              >
                <ul className='relative flex w-[9.375rem] flex-col items-center justify-start rounded-sm bg-white text-[#333] shadow-md'>
                  <li className='w-full cursor-pointer p-3 hover:bg-[#fafafa] hover:text-[#00bfa5]'>
                    <Link to={path.profile}>
                      <span className='capitalize'>Tài khoản của tôi</span>
                    </Link>
                  </li>
                  <li className='w-full cursor-pointer p-3 hover:bg-[#fafafa] hover:text-[#00bfa5]'>
                    <Link to=''>
                      <span className='capitalize '>Đơn mua</span>
                    </Link>
                  </li>
                  <li className='w-full cursor-pointer p-3 hover:bg-[#fafafa] hover:text-[#00bfa5]'>
                    <button onClick={handleLogout}>
                      <span className='capitalize'>Đăng xuất</span>
                    </button>
                  </li>
                </ul>
              </Popper>
            )}
          </div>
        </nav>
      </div>
      <div className='container mt-2 py-1.5'>
        <div className='relative z-0 grid grid-cols-11 gap-4'>
          <Link to='/' className='col-span-2'>
            <Logo className='h-11 fill-white' />
          </Link>
          <form className='col-span-8'>
            <div className='flex h-full items-center rounded-sm bg-white p-1'>
              <input className='flex-1 px-2 outline-none' placeholder='Deal 50%, Mua là có quà' />
              <button className='h-full rounded-sm bg-[#fb5533] px-6 hover:opacity-90'>
                <SearchIcon className='fill-white stroke-white' />
              </button>
            </div>
          </form>
          <Popper
            renderProp={
              <>
                <Link to='' className='relative col-start-11 ml-5 flex h-full cursor-pointer items-end'>
                  <Cart className='h-7 w-7' />
                </Link>
                <div className='absolute right-4 top-2 flex h-5 w-7 items-center justify-center rounded-full border-[0.125rem] border-[#ee4d2d] bg-white py-2'>
                  <span className='text-sm text-main-orange'>72</span>
                </div>
              </>
            }
          >
            <div className='w-[370px] rounded-sm bg-white shadow-md'>
              <div className=' w-full p-3 text-sm capitalize text-gray-300'>Sản phẩm mới thêm</div>
              <ul className='flex w-full flex-col items-center justify-start bg-white text-[#333]'>
                <li className='w-full cursor-pointer px-3 py-3 hover:bg-[#fafafa]'>
                  <Link to=''>
                    <div className='flex justify-between'>
                      <div className='flex'>
                        <div className='border-px h-11 w-11 flex-shrink-0 border-gray-1'>
                          <img src='' alt='' className='h-full w-full' />
                        </div>
                        <span className='... ml-2 max-w-[225px] flex-grow truncate text-sm'>
                          Kem nền BB O.TWO.O che khuyết điểm tự nhiên kiềm dầu không bết dính 60g với 4 màu tùy chọn
                        </span>
                      </div>
                      <div className='text-sm text-main-orange'>đ52.000</div>
                    </div>
                  </Link>
                </li>
                <li className='w-full cursor-pointer px-3 py-3 hover:bg-[#fafafa]'>
                  <Link to=''>
                    <div className='flex justify-between'>
                      <div className='flex'>
                        <div className='border-px h-11 w-11 flex-shrink-0 border-gray-1'>
                          <img src='' alt='' className='h-full w-full' />
                        </div>
                        <span className='... ml-2 max-w-[225px] flex-grow truncate text-sm'>
                          Kem nền BB O.TWO.O che khuyết điểm tự nhiên kiềm dầu không bết dính 60g với 4 màu tùy chọn
                        </span>
                      </div>
                      <div className='text-sm text-main-orange'>đ52.000</div>
                    </div>
                  </Link>
                </li>
                <li className='w-full cursor-pointer px-3 py-3 hover:bg-[#fafafa]'>
                  <Link to=''>
                    <div className='flex justify-between'>
                      <div className='flex'>
                        <div className='border-px h-11 w-11 flex-shrink-0 border-gray-1'>
                          <img src='' alt='' className='h-full w-full' />
                        </div>
                        <span className='... ml-2 max-w-[225px] flex-grow truncate text-sm'>
                          Kem nền BB O.TWO.O che khuyết điểm tự nhiên kiềm dầu không bết dính 60g với 4 màu tùy chọn
                        </span>
                      </div>
                      <div className='text-sm text-main-orange'>đ52.000</div>
                    </div>
                  </Link>
                </li>
              </ul>
              <div className='flex w-full items-center justify-between bg-[#fafafa] p-3'>
                <div className='text-xs text-gray-600'>67 Thêm vào giỏ hàng</div>
                <button className='rounded-sm bg-main-orange px-4 py-2 text-sm text-white'>Xem giỏ hàng</button>
              </div>
            </div>
          </Popper>
        </div>
        <div className='grid grid-cols-11'>
          <div className='col-start-3 mt-1 text-white'>
            <Link to='' className='mr-2 text-xs'>
              Blazer
            </Link>
            <Link to='' className='text-xs'>
              Blazer
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
