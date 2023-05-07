import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import {
  ArrowLeftProductDetailSlider,
  ArrowRightProductDetailSlider,
  CartButton,
  Minus,
  Plus
} from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'
import ProductRating from '../components/ProductRating'
import { formatCurrency, rateSale } from 'src/utils/utils'
import InputNumber from 'src/components/controls/InputNumber'
import DOMPurify from 'dompurify'

const ProductDetail = () => {
  const { id } = useParams()
  const { data: ProductDetails } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => {
      return productApi.getProductDetail(id as string)
    }
  })
  const product = ProductDetails?.data.data
  if (!product) return null
  return (
    <div className='min-w-[100vh] bg-contain-gray p-3 text-main-black'>
      <div className='container'>
        <div className='mt-4 grid grid-cols-12 rounded-sm bg-white'>
          <div className='col-span-5 p-[15px]'>
            <div className='relative w-full pt-[100%]'>
              <img
                src={product?.image}
                alt={product?.name}
                className='absolute left-0 top-0 h-full w-full object-contain'
              />
            </div>
            <div className='relative mt-4 grid grid-cols-5 gap-2'>
              <Controls.Button className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20'>
                <ArrowLeftProductDetailSlider className='h-4 w-4' />
              </Controls.Button>
              {product?.images.slice(0, 5).map((img, index) => {
                const isActive = index === 0
                return (
                  <div className='relative w-full pt-[100%]' key={index}>
                    <img src={img} alt={product?.name} className='absolute left-0 top-0 h-full w-full object-contain' />
                    {isActive && <div className='absolute inset-0 border-[2.5px] border-main-orange' />}
                  </div>
                )
              })}
              <Controls.Button className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20'>
                <ArrowRightProductDetailSlider className='h-4 w-4' />
              </Controls.Button>
            </div>
          </div>
          <div className='col-span-7 pl-5 pr-[2.1875rem] pt-5'>
            <div className='flex flex-col'>
              <div>
                <h1 className='text-xl font-medium'>{product?.name}</h1>
                <div className='mt-[0.625rem] flex items-center'>
                  <div className='flex items-center pr-[15px]'>
                    <div className='mr-1 border-b border-main-orange text-main-orange'>{product?.rating}</div>
                    <ProductRating
                      rating={product?.rating}
                      activeClassRating='fill-main-orange h-4 w-4 stroke-main-orange'
                      noActiveClassRating='h-4 w-4 fill-current text-gray-1'
                    />
                  </div>
                  <div className='border-text-gray-1 flex items-center border-l px-[15px]'>
                    <div className='mr-1'>{product?.sold}</div>
                    <div className='mr-1 text-[0.875rem] capitalize text-[#767676]'>Đã bán</div>
                  </div>
                </div>
                <div className='mt-2.5 flex items-center bg-[#fafafa] px-5 py-[15px]'>
                  <span className='mr-2.5 text-base text-[#929292] line-through'>
                    ₫{formatCurrency(product?.price_before_discount)}
                  </span>
                  <div className='mr-2.5 text-[1.875rem] font-medium text-main-orange'>
                    ₫{formatCurrency(product?.price)}
                  </div>
                  <div className='rounded-sm bg-main-orange px-1 py-0.5 text-xs font-semibold uppercase text-white'>
                    {rateSale(product?.price_before_discount, product?.price)} GIẢM
                  </div>
                </div>
              </div>
              <div className='mt-[1.5625rem] flex flex-col px-5'>
                <div className='flex items-center pb-3'>
                  <div className='w-[110px] text-[0.875rem] capitalize text-[#757575]'>Số lượng</div>
                  <div className='flex items-center'>
                    <div className='mr-[15px] flex items-center'>
                      <Controls.Button className='h-8 w-8 rounded-l-sm border'>
                        <Minus className='h-2.5 w-2.5 fill-[rgba(0,0,0,.8)]' />
                      </Controls.Button>
                      <InputNumber
                        classNameInput='h-8 w-[50px] border-x-0 border-y text-base text-center'
                        value={1}
                        classNameError='hidden'
                      />
                      <Controls.Button className='h-8 w-8 rounded-r-sm border'>
                        <Plus className='h-2.5 w-2.5 fill-[rgba(0,0,0,.8)]' />
                      </Controls.Button>
                    </div>
                    <div className='text-[0.875rem] text-[#757575]'>{product?.quantity} sản phẩm có sẵn</div>
                  </div>
                </div>
                <div className='mb-[30px] mt-[15px] flex items-center'>
                  <Controls.Button className='mr-4 h-12 rounded-sm border border-main-orange bg-[rgba(255,87,34,0.1)] px-5 hover:opacity-70'>
                    <CartButton className='mr-2.5 h-5 w-5 fill-main-orange stroke-main-orange' />
                    <span className='capitalize text-main-orange'>Thêm vào giỏ hàng</span>
                  </Controls.Button>
                  <Controls.Button className='h-12 rounded-sm border border-main-orange bg-main-orange px-5 hover:opacity-70'>
                    <span className='capitalize text-white'>mua ngay</span>
                  </Controls.Button>
                </div>
              </div>
              <hr />
              <div className='mt-[30px] flex items-center px-5'>
                <div className='mr-5 flex items-center'>
                  <img
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/83e10a1f95cb083579c089448ef8dd3b.png'
                    className='mr-1 h-5'
                    alt=''
                  />
                  <span className='text-[14px] capitalize text-[#222]'>shopee đảm bảo</span>
                </div>
                <span className='text-[14px] capitalize text-[rgba(0,0,0,.54)]'>3 ngày trả hàng / hoàn tiền</span>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 bg-white p-[1.5rem]'>
          <div className='bg-[rgba(0,0,0,.02)]'>
            <div className='p-3.5 text-[1.125rem] uppercase text-[rgba(0,0,0,.87)]'>mô tả sản phẩm</div>
          </div>
          <div className='mx-4 mb-4 mt-7 text-sm leading-loose'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product?.description)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
