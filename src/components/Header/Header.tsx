import { Link, useNavigate } from 'react-router-dom'
import { Cart, Logo, SearchIcon } from '../IconSvg'
import Popper from '../Popper'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from 'src/contexts/auth.context'
import { path } from 'src/constants/path'
import { PurchasesStatus } from 'src/constants/purchase'
import purchaseApi from 'src/apis/purchase.api'
import { formatCurrency, generateNameId, handleLimitNumber } from 'src/utils/utils'
import NoCart from '../../assets/images/no-cart.png'
import NavHeader from '../NavHeader'
import useSearchProducts from 'src/hooks/useSearchProducts'

const MAX_PURCHASE = 5
const Header = () => {
  const { isAuthenticated } = useAuth()
  const { onSubmitSearch, register } = useSearchProducts()
  const navigate = useNavigate()

  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: PurchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: PurchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchases = purchaseInCartData?.data.data
  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
      <NavHeader />
      <div className='container mt-2 py-1.5'>
        <div className='relative z-10 grid grid-cols-11 gap-4'>
          <Link to='/' className='col-span-2'>
            <Logo className='h-11 fill-white' />
          </Link>
          <form className='col-span-8' onSubmit={onSubmitSearch}>
            <div className='flex h-full items-center rounded-sm bg-white p-1'>
              <input
                className='flex-1 px-2 outline-none'
                type='text'
                placeholder='Deal 50%, Mua là có quà'
                {...register('name')}
              />
              <button className='h-full rounded-sm bg-[#fb5533] px-6 hover:opacity-90'>
                <SearchIcon className='fill-white stroke-white' />
              </button>
            </div>
          </form>
          <Popper
            renderProp={
              <>
                <Link to='' className='relative col-start-11 ml-5 flex h-full cursor-pointer items-end'>
                  <Cart className='h-7 w-7' />
                </Link>

                {purchases !== undefined && purchases.length > 0 && (
                  <div className='absolute right-3 top-2 flex h-5 w-8 items-center justify-center rounded-full border-[0.125rem] border-[#ee4d2d] bg-white'>
                    <span className='text-sm text-main-orange'>{handleLimitNumber(purchases.length)}</span>
                  </div>
                )}
              </>
            }
          >
            <div className='rounded-sm bg-white shadow-md'>
              {purchases && purchases.length > 0 ? (
                <div className='w-[370px]'>
                  <div className='w-full p-3 text-[0.875rem] capitalize text-gray-300'>Sản phẩm mới thêm</div>
                  <ul className='flex w-full flex-col items-center justify-start bg-white text-[#333]'>
                    {purchases?.slice(0, MAX_PURCHASE).map((purchase) => {
                      return (
                        <li className='w-full px-3 py-3 hover:bg-[#fafafa]' key={purchase._id}>
                          <button
                            onClick={() =>
                              navigate(
                                `${path.product}/${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`
                              )
                            }
                          >
                            <div className='flex justify-between'>
                              <div className='flex'>
                                <div className='h-11 w-11 flex-shrink-0 overflow-hidden border border-gray-1 '>
                                  <img
                                    src={purchase.product.image}
                                    alt={purchase.product.name}
                                    className='h-full w-full'
                                  />
                                </div>
                                <span className='... ml-2 max-w-[220px] flex-grow truncate text-[0.875rem]'>
                                  {purchase.product.name}
                                </span>
                              </div>
                              <div className='text-[0.875rem] text-main-orange'>₫{formatCurrency(purchase.price)}</div>
                            </div>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                  <div className='flex w-full items-center justify-between bg-[#fafafa] p-3'>
                    <div className='text-xs text-gray-600'>
                      {purchases.length > MAX_PURCHASE ? purchases.length - MAX_PURCHASE : 0} Thêm vào giỏ hàng
                    </div>
                    <Link to={path.cart} className='rounded-sm bg-main-orange px-4 py-2 text-sm text-white'>
                      Xem giỏ hàng
                    </Link>
                  </div>
                </div>
              ) : (
                <div className='flex h-[350px] w-[350px] flex-col items-center justify-center'>
                  <img src={NoCart} alt='no-cart' className='h-24 w-24' />
                  <div className='mt-3 text-center text-sm capitalize'>Chưa có sản phẩm</div>
                </div>
              )}
            </div>
          </Popper>
        </div>
        <div className='grid grid-cols-11'>
          <div className='col-start-3 mt-1 text-white'>
            <Link to='' className='mr-2 text-xs'>
              Blazer
            </Link>
            <Link to='' className='text-xs'>
              Blazer
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
