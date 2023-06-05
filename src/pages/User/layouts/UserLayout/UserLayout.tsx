import UserSideNav from '../../components/UserSideNav'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='bg-contain-gray py-5'>
      <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-12'>
          <div className='md:col-span-3 lg:col-span-2'>
            <UserSideNav />
          </div>
          <div className='md:col-span-9 lg:col-span-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLayout
