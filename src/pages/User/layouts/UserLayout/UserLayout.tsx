import UserSideNav from '../../components/UserSideNav'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
      <UserSideNav />
      <Outlet />
    </>
  )
}

export default UserLayout
