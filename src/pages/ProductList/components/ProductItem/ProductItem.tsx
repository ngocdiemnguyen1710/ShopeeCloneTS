import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'
import ProductRating from '../ProductRating'
import { path } from 'src/constants/path'

interface Props {
  product: ProductType
}
const ProductItem = ({ product }: Props) => {
  return (
    <Link
      to={`${path.product}/${product._id}`}
      className='shadow-[0 0.0625rem 0.125rem 0 rgba(0,0,0,.1)] duration-50 relative flex flex-col overflow-hidden rounded-sm bg-white hover:translate-y-[-1px] hover:shadow-sm'
    >
      <div className='relative w-full pt-[100%]'>
        <img src={product.image} alt={product.name} className='absolute left-0 top-0 h-full w-full object-contain' />
      </div>
      <div className='p-2 text-[rgba(0,0,0,.87)]'>
        <div className='line-clamp-2 min-h-[1.75rem] text-xs'>{product.name}</div>
        <div className='max-h-6'></div>
        <div className='flex h-5 max-w-full items-center pt-1'>
          <div className='mr-1.5 line-through'>
            <span className='line-through-px text-[0.875rem] text-[rgba(0,0,0,.54)]'>
              ₫{formatCurrency(product.price_before_discount)}
            </span>
          </div>
          <div className='w-20 truncate text-main-orange'>
            <span className='text-xs'>₫</span>
            <span className='text-base'>{formatCurrency(product.price)}</span>
          </div>
        </div>
        <div className='mt-3 flex h-5 items-center gap-1'>
          <ProductRating rating={product.rating} />
          <div className='text-xs'>Đã bán {formatNumberToSocialStyle(product.sold)}</div>
        </div>
        <div className='mt-3 min-h-[1rem] text-xs text-[rgba(0,0,0,.65)]'>TP. Hồ Chí Minh</div>
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
