import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import Profile from './pages/Profile'
import { useAuth } from './contexts/auth.context'
import { path } from './constants/path'

const useRouteElements = () => {
  const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }

  const RejectedRoute = () => {
    const { isAuthenticated } = useAuth()

    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }
  const routeElements = useRoutes([
    {
      path: path.home,
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: path.product,
          element: <ProductList />
        },
        {
          path: path.profile,
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <Profile />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          element: <RegisterLayout />,
          children: [
            {
              path: path.login,
              element: <Login />
            },
            {
              path: path.register,
              element: <Register />
            }
          ]
        }
      ]
    }
  ])
  return routeElements
}

export default useRouteElements
