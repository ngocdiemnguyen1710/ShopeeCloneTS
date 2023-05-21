import { useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Controls from 'src/components/controls/Controls'
import { path } from 'src/constants/path'
import { PurchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'

interface ExtendedPurchases extends Purchase {
  disabled: boolean
  checked: boolean
}
const Cart = () => {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchases[]>([])
  const { data: purchasesInCart } = useQuery({
    queryKey: ['purchases', { status: PurchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: PurchasesStatus.inCart })
  })
  const purchases = purchasesInCart?.data.data

  const isCheckAll = extendedPurchases.every((item) => item.checked)

  useEffect(() => {
    setExtendedPurchases(
      purchases?.map((purchase) => {
        return {
          ...purchase,
          disabled: false,
          checked: false
        }
      }) || []
    )
  }, [purchases])

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
            <div className='mb-3 rounded-sm bg-white px-2 text-[12px] sm:px-3 sm:text-[14px]'>
              {extendedPurchases?.map((prod, index) => {
                return (
                  <>
                    <div key={prod._id} className='grid grid-cols-12 items-center px-3 py-5 sm:px-7'>
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
                            to={`${path.product}/${generateNameId({ name: prod.product.name, id: prod.product._id })}`}
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
                            <Controls.QuantityController value={prod.buy_count} />
                          </div>
                          <div className='col-span-1 text-center text-main-orange'>
                            ₫{formatCurrency(prod.price * prod.buy_count)}
                          </div>
                          <div className='col-span-1 text-center hover:text-main-orange'>
                            <Controls.Button>Xóa</Controls.Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='border-t last:border-t-0'></div>
                  </>
                )
              })}
            </div>
          </div>
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
              <Controls.Button>Xóa</Controls.Button>
            </div>
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center'>
            <div className='flex items-center'>
              <div className='mr-1 text-[13px] sm:mr-4 sm:text-[16px]'>Tổng thanh toán (5 sản phẩm):</div>
              <div className='mr-1 sm:mr-4 sm:text-center'>
                <div className='text-lg text-main-orange sm:text-2xl'>₫{formatCurrency(178000)}</div>
                <div className='flex items-center text-[10px] sm:text-[14px]'>
                  <div className='mr-2 text-gray-800 sm:mr-4'>Tiết kiệm</div>
                  <div className='text-main-orange'>₫{formatCurrency(178000)}</div>
                </div>
              </div>
              <div className='flex h-8 w-20 items-center justify-center rounded-sm bg-main-orange hover:opacity-70 sm:h-10 sm:w-[13.125rem]'>
                <Controls.Button className='text-[14px] capitalize text-white'>Mua hàng</Controls.Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
