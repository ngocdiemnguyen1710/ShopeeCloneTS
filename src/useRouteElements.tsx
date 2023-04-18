import React from 'react'
import { useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'

const useRouteElements = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      element: <RegisterLayout />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/register',
          element: <Register />
        }
      ]
    }
  ])
  return routeElements
}

export default useRouteElements
