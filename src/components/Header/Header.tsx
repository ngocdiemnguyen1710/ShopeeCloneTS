import { Link } from 'react-router-dom'
import { FaFacebook } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { ArrowDown, AvatarDefault, Bell, Cart, Language, Logo, SearchIcon, Support } from '../IconSvg'

const Header = () => {
  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
      <div className='container flex items-center justify-between py-1.5 text-white '>
        <nav className='flex items-center text-sm font-light'>
          <div className='border-r-2 border-[hsla(0,0%,100%,.22)] pr-1.5'>
            <Link to={'#'} className='hover:brightness-90'>
              <span>Kênh người bán</span>
            </Link>
          </div>
          <div className='border-r-2 border-[hsla(0,0%,100%,.22)] px-1.5'>
            <Link to={'#'} className='hover:brightness-90'>
              <span>Trở thành Người bán Shopee</span>
            </Link>
          </div>
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
        <nav className='flex text-sm'>
          <div className='pr-1.5'>
            <Link to={'#'} className='flex items-center hover:brightness-90'>
              <Bell className='mr-1 w-3.5 fill-current' />
              <span>Thông Báo</span>
            </Link>
          </div>
          <div className='px-1.5'>
            <Link to={'#'} className='flex items-center hover:brightness-90'>
              <Support className='mr-1 fill-current' />
              <span>Hỗ trợ</span>
            </Link>
          </div>
          <div className='px-1.5'>
            <Link to={'#'} className='flex items-center hover:brightness-90'>
              <Language className='mr-1' />
              <span>Tiếng Việt</span>
              <ArrowDown className='ml-1' />
            </Link>
          </div>
          <div className='px-1.5'>
            {/* <div className='flex items-center gap-1'>
              <Link to={'#'} className='border-r border-[hsla(0,0%,100%,.22)] pr-2 hover:brightness-90'>
                <span>Đăng Ký</span>
              </Link>
              <Link to='#' className='pl-1.5 hover:brightness-90'>
                <span>Đăng Nhập</span>
              </Link>
            </div> */}

            <Link to={'#'} className='flex items-center gap-1 hover:brightness-90'>
              <div className='h-5 w-5 rounded-full bg-[#f5f5f5] p-1'>
                <AvatarDefault className='stroke-[#c6c6c6]' />
              </div>
              <span>zinbu99</span>
            </Link>
          </div>
        </nav>
      </div>
      <div className='container mt-2 py-1.5'>
        <div className='grid grid-cols-11 gap-4'>
          <Link to='/' className='col-span-2'>
            <Logo className='h-11 fill-white' />
          </Link>
          <form className='col-span-8'>
            <div className='flex h-full items-center rounded-sm bg-white p-1'>
              <input className='flex-1 px-2  outline-none' placeholder='Deal 50%, Mua là có quà' />
              <button className='h-full rounded-sm bg-[#fb5533] px-6 hover:opacity-90'>
                <SearchIcon className=' fill-white stroke-white' />
              </button>
            </div>
          </form>
          <Link to='' className='relative col-start-11 ml-5 flex items-end'>
            <Cart className=' h-7 w-7' />
            <div className='absolute right-5 top-2.5 flex h-5 w-7 items-center justify-center rounded-full border-[0.125rem] border-[#ee4d2d] bg-white py-2'>
              <span className='text-sm text-main-orange'>72</span>
            </div>
          </Link>
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
