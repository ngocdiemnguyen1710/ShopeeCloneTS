import React from 'react'
import { Link } from 'react-router-dom'
import Popper from '../Popper'
import { ArrowDown, AvatarDefault, Bell, Language, Support } from '../IconSvg'
import { RiInstagramFill } from 'react-icons/ri'
import { FaFacebook } from 'react-icons/fa'
import { useAuth } from 'src/contexts/auth.context'
import { path } from 'src/constants/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { PurchasesStatus } from 'src/constants/purchase'
import { getAvatarUrl } from 'src/utils/utils'

const NavHeader = () => {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useAuth()
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: authApi.logoutAccount,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: PurchasesStatus.inCart }] })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='container relative z-20 flex items-center justify-between py-1.5 text-white '>
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
      <nav className='flex items-center gap-1 text-sm'>
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
              src={profile?.avatar}
              name={profile?.email}
              className='h-5 w-5 overflow-hidden rounded-full bg-[#f5f5f5]'
            >
              <ul className='relative flex w-[9.375rem] flex-col items-center justify-start rounded-sm bg-white text-[#333] shadow-md'>
                <li className='w-full cursor-pointer p-3 hover:bg-[#fafafa] hover:text-[#00bfa5]'>
                  <Link to={path.profile}>
                    <span className='capitalize'>Tài khoản của tôi</span>
                  </Link>
                </li>
                <li className='w-full cursor-pointer p-3 hover:bg-[#fafafa] hover:text-[#00bfa5]'>
                  <Link to={path.historyPurchase}>
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
  )
}

export default NavHeader
