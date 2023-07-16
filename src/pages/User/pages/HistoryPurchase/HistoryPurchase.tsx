import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import { ShieldIcon } from 'src/components/IconSvg'
import { path } from 'src/constants/path'
import { PurchasesStatus } from 'src/constants/purchase'
import { useQueryParams } from 'src/hooks/useQueryParams'
import { PurchaseListStatus, PurchaseStatus } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
const purchaseTabs = [
  { status: PurchasesStatus.all, name: 'Tất cả' },
  { status: PurchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: PurchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: PurchasesStatus.inProgress, name: 'Đang giao' },
  { status: PurchasesStatus.delivered, name: 'Đã giao' },
  { status: PurchasesStatus.cancelled, name: 'Đã hủy' }
]
const HistoryPurchase = () => {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || PurchasesStatus.all

  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseStatus })
  })

  const purchaseInCart = purchaseInCartData?.data.data

  const purchaseTabsLink = purchaseTabs.map((tab) => {
    return (
      <Link
        key={tab.status}
        to={{
          pathname: path.historyPurchase,
          search: createSearchParams({
            status: String(tab.status)
          }).toString()
        }}
        className={classNames('flex flex-1 items-center justify-center border-b-2 p-4 text-center', {
          'border-b border-main-orange text-main-orange': status === tab.status,
          'border-b-black/10 text-gray-900': status !== tab.status
        })}
      >
        {tab.name}
      </Link>
    )
  })
  return (
    <div className='ml-5'>
      <div className='sticky top-0 flex w-full rounded-t-sm bg-white shadow-sm'>{purchaseTabsLink}</div>
      <div className=''>
        {purchaseInCart?.map((purchase) => {
          return (
            <>
              <div key={purchase._id} className='mt-4 rounded-sm bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='h-20 w-20 flex-shrink-0 border'>
                    <img
                      src={purchase.product.image}
                      alt={purchase.product.name}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-1.5 text-sm'>x{purchase.buy_count}</div>
                  </div>
                  <div className='flex h-5 max-w-full items-center pt-1'>
                    <div className='mr-1.5 line-through'>
                      <span className='line-through-px text-[0.875rem]  text-[rgba(0,0,0,.54)]'>
                        ₫{formatCurrency(purchase.price_before_discount)}
                      </span>
                    </div>
                    <div className='w-20 truncate text-[0.875rem]  text-main-orange'>
                      <span className='text-xs'>₫</span>
                      <span className='text-base'>{formatCurrency(purchase.price)}</span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='relative h-0 w-full border-b border-dotted border-[rgba(0,0,0,.09)]'>
                <div className='absolute left-0 top-0 z-10 h-[0.4375rem] w-[0.4375rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5f5f5]'></div>
                <div className='absolute right-0 top-0 z-10 h-[0.4375rem] w-[0.4375rem] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#f5f5f5]'></div>
              </div>
              <div className='flex items-center justify-end bg-[#fffefb] px-6 pb-3 pt-6'>
                <ShieldIcon className='mr-1.5 text-[rgba(0,0,0,.8)]' />
                <p className='mr-2.5'>Thành tiền:</p>
                <div className='text-2xl text-main-orange'>₫{formatCurrency(purchase.price * purchase.buy_count)}</div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default HistoryPurchase
