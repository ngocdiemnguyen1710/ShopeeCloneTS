import { Link, useLocation } from 'react-router-dom'
import { Logo } from '../IconSvg'

const HeaderRegister = () => {
  const location = useLocation()
  const path = location.pathname
  return (
    <header className='py-6'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <nav className='flex items-center'>
            <Link to={'/'}>
              <Logo className='mt-[-10px] h-8 fill-main-orange lg:h-11' />
            </Link>
            <div className='ml-5 text-xl lg:text-2xl'>{path.indexOf('/login') > -1 ? 'Đăng nhập' : 'Đăng ký'}</div>
          </nav>
          <div className='text-sm text-main-orange'>Bạn cần giúp đỡ ?</div>
        </div>
      </div>
    </header>
  )
}

export default HeaderRegister
