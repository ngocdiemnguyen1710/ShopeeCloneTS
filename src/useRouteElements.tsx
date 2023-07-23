import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import { useAuth } from './contexts/auth.context'
import { path } from './constants/path'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/layouts/UserLayout'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ProductList = lazy(() => import('./pages/ProductList'))
const HomePage = lazy(() => import('./pages/HomePage'))
const ProductDetail = lazy(() => import('./pages/ProductList/ProductDetail'))
const Cart = lazy(() => import('./pages/Cart'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))
const NotFound = lazy(() => import('./pages/NotFound'))
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
          element: (
            <Suspense>
              <HomePage />
            </Suspense>
          )
        },
        {
          path: path.product,
          element: (
            <Suspense>
              <ProductList />
            </Suspense>
          )
        },
        {
          path: path.productDetail,
          element: (
            <Suspense>
              <ProductDetail />
            </Suspense>
          )
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: path.user,
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense>
                      <ChangePassword />
                    </Suspense>
                  )
                },
                {
                  path: path.historyPurchase,
                  element: (
                    <Suspense>
                      <HistoryPurchase />
                    </Suspense>
                  )
                }
              ]
            },
            {
              path: path.cart,
              element: (
                <Suspense>
                  <Cart />
                </Suspense>
              )
            },
            {
              path: '*',
              element: (
                <Suspense>
                  <NotFound />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: <CartLayout />,
          children: [
            {
              index: true,
              element: (
                <Suspense>
                  <Cart />
                </Suspense>
              )
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
              element: (
                <Suspense>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return routeElements
}

export default useRouteElements
