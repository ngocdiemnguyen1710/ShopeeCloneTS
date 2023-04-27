import { Link } from 'react-router-dom'
import { StartBackground, StartFull } from 'src/components/IconSvg'

const ProductItem = () => {
  return (
    <Link
      to=''
      className='shadow-[0 0.0625rem 0.125rem 0 rgba(0,0,0,.1)] duration-50 relative inline-block rounded-sm bg-white hover:translate-y-[-1px] hover:shadow-sm'
    >
      <div className='relative w-full overflow-hidden pt-[100%]'>
        <img
          src='https://cf.shopee.vn/file/30556ff6dc49088323a0adc6c8e7b99c_tn'
          alt=''
          className='absolute left-0 top-0 h-full w-full object-contain'
        />
      </div>
      <div className='p-2 text-[rgba(0,0,0,.87)]'>
        <div className='line-clamp-2 min-h-[1.75rem] text-xs'>
          [Mã ELHA9 giảm 15% đơn 50K] SẠC CỰC NHANH - PIN SẠC DỰ PHÒNG 30000MAH MẶT GƯƠNG ĐEN HUYỀN THOẠI |Dũng 1
        </div>
        <div className='h-6'></div>
        <div className='flex h-5 items-center pt-1'>
          <div className='mr-1.5 line-through'>
            <span className='line-through-px text-[0.875rem] text-[rgba(0,0,0,.54)]'>₫15.000</span>
          </div>
          <div className='text-main-orange'>
            <span className='text-xs'>₫</span>
            <span className='text-base'>9.000</span>
          </div>
        </div>
        <div className='mt-3 flex h-5 items-center gap-1'>
          <div className='flex items-center'>
            <div className='relative'>
              <div className='absolute left-0 top-0 z-10 h-full w-[50%] overflow-hidden'>
                <StartFull className='h-2.5 w-2.5' />
              </div>
              <StartBackground className='h-2.5 w-2.5 fill-current text-gray-1' />
            </div>
          </div>
          <div className='text-xs'>Đã bán 28,6k</div>
        </div>
        <div className='mt-3 text-xs text-[rgba(0,0,0,.65)]'>TP. Hồ Chí Minh</div>
      </div>
      <div className='absolute right-0 top-0 bg-yellow-400/90 p-0.5 text-xs leading-tight'>
        <div className=''>
          <div className='text-center text-main-orange'>33%</div>
          <div className='text-white'>GIẢM</div>
        </div>
        <span className='absolute right-0 top-[34px] border-b-0 border-l-[18px] border-r-0 border-t-4 border-l-transparent border-t-yellow-400/90'></span>
        <span className='absolute left-0 top-[34px] border-b-0 border-l-0 border-r-[18px] border-t-4 border-r-transparent border-t-yellow-400/90'></span>
      </div>
    </Link>
  )
}

export default ProductItem
