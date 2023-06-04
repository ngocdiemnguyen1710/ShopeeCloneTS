import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { keyBy } from 'lodash'
import { ChangeEvent, useEffect, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Controls from 'src/components/controls/Controls'
import { path } from 'src/constants/path'
import { PurchasesStatus } from 'src/constants/purchase'
import { useCart } from 'src/contexts/cart.context'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import NoCart from '../../assets/images/no-cart.png'

const Cart = () => {
  const { extendedPurchases, setExtendedPurchases } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const { data: purchasesInCart, refetch } = useQuery({
    queryKey: ['purchases', { status: PurchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: PurchasesStatus.inCart })
  })
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center'
      })
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const purchases = purchasesInCart?.data.data
  const isCheckAll = useMemo(() => extendedPurchases.every((item) => item.checked), [extendedPurchases])
  const checkedPurchases = useMemo(() => extendedPurchases.filter((item) => item.checked), [extendedPurchases])
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const choosePurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchases?.map((purchase) => {
          const isChoosePurchaseIdFromLocation = choosePurchaseIdFromLocation === purchase._id

          return {
            ...purchase,
            disabled: false,
            checked: isChoosePurchaseIdFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchases, choosePurchaseIdFromLocation, setExtendedPurchases])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])
  const handleCheck = (productIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[productIndex].checked = e.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isCheckAll
      }))
    )
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }

  return (
    <div className='min-h-[100vh] bg-contain-gray sm:p-3'>
      <div className='sm:container'>
        <div className='min-w-[1000px]'>
          <div className='overflow-auto'>
            <div className='mb-3 mt-3 grid h-[55px] grid-cols-12 items-center bg-white px-5 text-[14px] sm:px-10'>
              <div className='col-span-6'>
                <div className='shadow-[0 1px 1px 0 rgba(0,0,0,.05)] flex items-center rounded-sm'>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    className='shadow-[inset 0 2px 0 0 rgba(0,0,0,.02)] mr-4 h-4 w-4 accent-main-orange'
                    checked={isCheckAll}
                    onChange={handleCheckAll}
                  />
                  <div className='capitalize text-[rgba(0,0,0,.8)]'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 gap-2 capitalize text-[#888]'>
                  <div className='col-span-2 text-center'>Đơn giá</div>
                  <div className='col-span-1 text-center'>Số Lượng</div>
                  <div className='col-span-1 text-center'>Số Tiền</div>
                  <div className='col-span-1 text-center'>Thao Tác</div>
                </div>
              </div>
            </div>
            {purchases && purchases?.length > 0 ? (
              <>
                <div className='mb-3 rounded-sm bg-white px-2 text-[12px] sm:px-3 sm:text-[14px]'>
                  {extendedPurchases?.map((prod, index) => {
                    return (
                      <div key={index}>
                        <div className='grid grid-cols-12 items-center border-b px-3 py-5 sm:px-7'>
                          <div className='col-span-6'>
                            <div className='flex items-center'>
                              <input
                                type='checkbox'
                                name=''
                                id=''
                                className='shadow-[inset 0 2px 0 0 rgba(0,0,0,.02)] mr-4 h-4 w-4 accent-main-orange'
                                checked={prod.checked}
                                onChange={handleCheck(index)}
                              />
                              <img
                                src={prod.product.image}
                                alt=''
                                className='mr-2 h-10 w-10 bg-contain bg-[50%] bg-no-repeat sm:h-20 sm:w-20'
                              />
                              <Link
                                to={`${path.product}/${generateNameId({
                                  name: prod.product.name,
                                  id: prod.product._id
                                })}`}
                                className='line-clamp-2 w-[150px] sm:w-[250px]'
                              >
                                {prod.product.name}
                              </Link>
                            </div>
                          </div>
                          <div className='col-span-6'>
                            <div className='grid grid-cols-5 items-center gap-2'>
                              <div className='col-span-2 flex items-center gap-2 text-center'>
                                <div className='text-[rgba(0,0,0,.54)] line-through'>
                                  ₫{formatCurrency(prod.price_before_discount)}
                                </div>
                                <div>₫{formatCurrency(prod.price)}</div>
                              </div>
                              <div className='col-span-1 text-center'>
                                <Controls.QuantityController
                                  value={prod.buy_count}
                                  max={prod.product.quantity}
                                  onIncrease={(value) => handleQuantity(index, value, value <= prod.product.quantity)}
                                  onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                  onType={handleTypeQuantity(index)}
                                  onFocusOut={(value) =>
                                    handleQuantity(
                                      index,
                                      value,
                                      value >= 1 &&
                                        value <= prod.product.quantity &&
                                        value !== (purchases as Purchase[])[index]?.buy_count
                                    )
                                  }
                                  disabled={prod.disabled}
                                />
                              </div>
                              <div className='col-span-1 text-center text-main-orange'>
                                ₫{formatCurrency(prod.price * prod.buy_count)}
                              </div>
                              <div className='col-span-1 text-center hover:text-main-orange'>
                                <Controls.Button onClick={handleDelete(index)}>Xóa</Controls.Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className='sticky bottom-0 z-10 flex flex-col border-t bg-white px-3 py-5 shadow-sm sm:flex-row sm:justify-between sm:px-7'>
                  <div className='flex sm:items-center'>
                    <input
                      type='checkbox'
                      name=''
                      id=''
                      className='shadow-[inset 0 2px 0 0 rgba(0,0,0,.02)] mr-8 h-4 w-4 accent-main-orange'
                      checked={isCheckAll}
                      onChange={handleCheckAll}
                    />
                    <button className='mr-8 text-center text-[13px] sm:text-[16px]' onClick={handleCheckAll}>
                      <div className='capitalize'>Chọn tất cả</div>
                      <div>({extendedPurchases.length})</div>
                    </button>
                    <div className='text-[13px] sm:text-[16px]'>
                      <Controls.Button onClick={handleDeleteManyPurchases}>Xóa</Controls.Button>
                    </div>
                  </div>
                  <div className='flex flex-col sm:flex-row sm:items-center'>
                    <div className='flex items-center'>
                      <div className='mr-1 text-[13px] sm:mr-4 sm:text-[16px]'>
                        Tổng thanh toán ({checkedPurchasesCount} sản phẩm):
                      </div>
                      <div className='mr-1 sm:mr-4 sm:text-center'>
                        <div className='text-lg text-main-orange sm:text-2xl'>
                          ₫{formatCurrency(totalCheckedPurchasePrice)}
                        </div>
                        <div className='flex items-center text-[10px] sm:text-[14px]'>
                          <div className='mr-2 text-gray-800 sm:mr-4'>Tiết kiệm</div>
                          <div className='text-main-orange'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                        </div>
                      </div>
                      <div className='flex h-8 w-20 items-center justify-center rounded-sm bg-main-orange hover:opacity-70 sm:h-10 sm:w-[13.125rem]'>
                        <Controls.Button
                          className='text-[14px] capitalize text-white'
                          onClick={handleBuyPurchases}
                          disabled={buyProductsMutation.isLoading}
                        >
                          Mua hàng
                        </Controls.Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='flex  flex-col items-center justify-center'>
                  <img src={NoCart} alt='no-cart' className='h-24 w-24' />
                  <div className='my-3 text-center text-sm font-bold capitalize text-gray-400'>
                    Giỏ hàng của bạn còn trống
                  </div>
                  <div className='flex h-8 w-10 items-center justify-center rounded-sm bg-main-orange hover:opacity-70 sm:h-10 sm:w-[10.125rem]'>
                    <Controls.Button
                      className='text-[14px] uppercase text-white'
                      onClick={() => navigate(path.product)}
                    >
                      Mua hàng
                    </Controls.Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
