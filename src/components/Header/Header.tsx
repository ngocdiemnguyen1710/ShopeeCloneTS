import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { FaFacebook } from 'react-icons/fa'
import { RiInstagramFill } from 'react-icons/ri'
import { ArrowDown, AvatarDefault, Bell, Cart, Language, Logo, SearchIcon, Support } from '../IconSvg'
import Popper from '../Popper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { useAuth } from 'src/contexts/auth.context'
import { path } from 'src/constants/path'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Schema, schema } from 'src/utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { PurchasesStatus } from 'src/constants/purchase'
import purchaseApi from 'src/apis/purchase.api'
import { formatCurrency, generateNameId, handleLimitNumber } from 'src/utils/utils'
import NoCart from '../../assets/images/no-cart.png'

type FormData = Pick<Schema, 'name'>
const searchSchema = schema.pick(['name'])
const MAX_PURCHASE = 5
const Header = () => {
  const queryClient = useQueryClient()
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useAuth()
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(searchSchema)
  })

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

  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: PurchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: PurchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.product,
      search: createSearchParams(config).toString()
    })
  })

  const purchases = purchaseInCartData?.data.data
  return (
    <div className='bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
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
        <nav className='flex gap-1 text-sm'>
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
                iconLeft={<AvatarDefault className='stroke-[#c6c6c6]' />}
                name={profile?.email}
                className='h-5 w-5 rounded-full bg-[#f5f5f5] p-1'
              >
                <ul className='relative flex w-[9.375rem] flex-col items-center justify-start rounded-sm bg-white text-[#333] shadow-md'>
                  <li className='w-full cursor-pointer p-3 hover:bg-[#fafafa] hover:text-[#00bfa5]'>
                    <Link to={path.profile}>
                      <span className='capitalize'>Tài khoản của tôi</span>
                    </Link>
                  </li>
                  <li className='w-full cursor-pointer p-3 hover:bg-[#fafafa] hover:text-[#00bfa5]'>
                    <Link to=''>
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
              {purchases ? (
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
