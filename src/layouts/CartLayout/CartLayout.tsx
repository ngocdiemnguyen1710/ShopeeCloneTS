import React from 'react'
import { Outlet } from 'react-router-dom'
import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'

const CartLayout = () => {
  return (
    <>
      <CartHeader />
      <Outlet />
      <Footer />
    </>
  )
}

export default CartLayout
