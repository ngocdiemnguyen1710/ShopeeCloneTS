import { Link, NavLink } from 'react-router-dom'
import { AvatarDefault, EditIcon } from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'
import { path } from 'src/constants/path'
import SaleIcon from '../../../../assets/images/user/icon-sale.png'
import UserIcon from '../../../../assets/images/user/icon-user.png'
import PurchaseIcon from '../../../../assets/images/user/icon-purchase.png'

const UserSideNav = () => {
  return (
    <>
      <div className='flex items-center border-b py-[15px]'>
        <div className='flex items-center'>
          <div className='flex h-[50px] w-[50px] items-center justify-center rounded-full border'>
            <AvatarDefault className='h-6 w-6 stroke-[#c6c6c6]' />
          </div>
          <div className=' flex flex-col items-start pl-3.5'>
            <p className='min-h-4 mb-[5px] truncate text-[14px] font-semibold text-[#333]'>zinbu99</p>
            <div className='flex items-center'>
              <Controls.Button>
                <EditIcon />
              </Controls.Button>
              <p className='text-[14px] capitalize text-[#888]'>Sửa hồ sơ</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[27px] text-[14px]'>
        <Link to={path.product} className='mb-4 mr-4 flex items-center'>
          <div className='h-5 w-5'>
            <img src={SaleIcon} alt='sale' className='h-full w-full' />
          </div>
          <span className='ml-[12px] font-medium capitalize text-[rgba(0,0,0,.87)] hover:text-main-orange'>
            6.6 branded flash sale
          </span>
        </Link>
        <Link to={path.profile} className='mb-4 mr-4 flex items-center'>
          <div className='h-5 w-5'>
            <img src={UserIcon} alt='sale' className='h-full w-full' />
          </div>
          <span className='ml-[12px] font-medium capitalize text-[rgba(0,0,0,.87)] hover:text-main-orange'>
            tài khoản của tôi
          </span>
        </Link>
        <div className='mb-4 ml-6 flex flex-col'>
          <NavLink to={path.profile} className='mb-4'>
            <span className='ml-[12px] font-medium capitalize text-[rgba(0,0,0,.87)] hover:text-main-orange'>
              Hồ sơ
            </span>
          </NavLink>
          <NavLink to={path.changePassword}>
            <span className='ml-[12px] font-medium capitalize text-[rgba(0,0,0,.87)] hover:text-main-orange'>
              Đổi mật khẩu
            </span>
          </NavLink>
        </div>
        <Link to={path.historyPurchase} className='mb-4 mr-4 flex items-center'>
          <div className='h-5 w-5'>
            <img src={PurchaseIcon} alt='sale' className='h-full w-full' />
          </div>
          <span className='ml-[12px] font-medium capitalize text-[rgba(0,0,0,.87)] hover:text-main-orange'>
            đơn mua
          </span>
        </Link>
      </div>
    </>
  )
}

export default UserSideNav
