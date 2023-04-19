import { Link, useLocation } from 'react-router-dom'
import { Logo } from '../IconSvg'

const HeaderRegister = () => {
  const location = useLocation()
  const path = location.pathname
  return (
    <header className='py-5'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          <nav className='flex items-end'>
            <Link to={'/'}>
              <Logo className='lg:h11 h-8 fill-main-orange' />
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
