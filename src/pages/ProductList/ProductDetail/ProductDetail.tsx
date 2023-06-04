import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import { ArrowLeftProductDetailSlider, ArrowRightProductDetailSlider, CartButton } from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'
import ProductRating from '../components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Product, ProductConfig } from 'src/types/product.type'
import ProductItem from '../components/ProductItem'
import purchaseApi from 'src/apis/purchase.api'
import { toast } from 'react-hot-toast'
import { PurchasesStatus } from 'src/constants/purchase'
import { path } from 'src/constants/path'

const ProductDetail = () => {
  const [buyCount, setBuyCount] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const imageRef = useRef<HTMLImageElement>(null)

  const queryClient = useQueryClient()

  const { data: ProductDetails } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => {
      return productApi.getProductDetail(id as string)
    }
  })
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [activeImg, setActiveImg] = useState('')

  const product = ProductDetails?.data.data
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImage) : []),
    [product, currentIndexImage]
  )

  const queryConfig: ProductConfig = { limit: '20', category: product?.category._id, page: '1' }

  const { data: ProductsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    },
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(product) //Khi nào có sản phẩm mới gọi api
  })

  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addToCart(body)
  })

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImg(product.images[0])
    }
  }, [product])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const chooseImg = (img: string) => {
    setActiveImg(img)
  }

  const next = () => {
    if (currentIndexImage[1] < (product as Product).images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleZoom = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image // chiều cao chiều rộng của img
    //Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý đc bubble event(thêm pointer-events-none vào class )
    // const { offsetX, offsetY } = e.nativeEvent //vị trí con trỏ chuột trong element

    //Cách 2: Lấy offsetX, offsetY đơn giản khi chúng ta ko xử lý đc bubble event
    const offsetX = e.pageX - (rect.x + window.scrollX)
    const offsetY = e.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuy = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    return addToCartMutation.mutate(
      { product_id: product?._id as string, buy_count: buyCount },
      {
        onSuccess: (data) => {
          toast.success(data.data.message)
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: PurchasesStatus.inCart }] })
        }
      }
    )
  }

  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ product_id: product?._id as string, buy_count: buyCount })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null
  return (
    <div className='min-w-[100vh] bg-contain-gray p-3 text-main-black'>
      <div className='container'>
        <div className='mt-4 grid grid-cols-12 rounded-sm bg-white pb-[20px]'>
          <div className='col-span-5 p-[15px]'>
            <div
              className='relative w-full cursor-zoom-in overflow-hidden pt-[100%]'
              onMouseMove={handleZoom}
              onMouseLeave={handleRemoveZoom}
            >
              <img
                src={activeImg}
                alt={product?.name}
                className='absolute left-0 top-0 h-full w-full object-contain'
                ref={imageRef}
              />
            </div>
            <div className='relative mt-4 grid grid-cols-5 gap-2'>
              <Controls.Button
                onClick={prev}
                className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20'
              >
                <ArrowLeftProductDetailSlider className='h-4 w-4' />
              </Controls.Button>
              {currentImages.map((img) => {
                const isActive = img === activeImg
                return (
                  <div
                    className='relative w-full cursor-pointer pt-[100%]'
                    key={img}
                    onMouseEnter={() => chooseImg(img)}
                  >
                    <img src={img} alt={product?.name} className='absolute left-0 top-0 h-full w-full object-contain' />
                    {isActive && <div className='absolute inset-0 border-[2.5px] border-main-orange' />}
                  </div>
                )
              })}
              <Controls.Button
                onClick={next}
                className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20'
              >
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
                    <div className='mr-1 border-b border-main-orange text-main-orange'>
                      {formatCurrency(product?.rating)}
                    </div>
                    <ProductRating
                      rating={product?.rating}
                      activeClassRating='fill-main-orange h-4 w-4 stroke-main-orange'
                      noActiveClassRating='h-4 w-4 fill-current text-gray-1'
                    />
                  </div>
                  <div className='border-text-gray-1 flex items-center border-l px-[15px]'>
                    <div className='mr-1'>{formatNumberToSocialStyle(product?.sold)}</div>
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
                    <Controls.QuantityController
                      value={buyCount}
                      onIncrease={handleBuy}
                      onDecrease={handleBuy}
                      onType={handleBuy}
                      max={product.quantity}
                    />
                    <div className='ml-3 text-[0.875rem] text-[#757575]'>{product?.quantity} sản phẩm có sẵn</div>
                  </div>
                </div>
                <div className='mb-[30px] mt-[15px] flex items-center'>
                  <Controls.Button
                    onClick={addToCart}
                    className='mr-4 h-12 rounded-sm border border-main-orange bg-[rgba(255,87,34,0.1)] px-5 hover:opacity-70'
                  >
                    <CartButton className='mr-2.5 h-5 w-5 fill-main-orange stroke-main-orange' />
                    <span className='capitalize text-main-orange'>Thêm vào giỏ hàng</span>
                  </Controls.Button>
                  <Controls.Button
                    onClick={buyNow}
                    className='h-12 rounded-sm border border-main-orange bg-main-orange px-5 hover:opacity-70'
                  >
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
          <div className='mx-4 mb-4 mt-7 text-[.875rem] leading-loose'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product?.description)
              }}
            />
          </div>
        </div>
        <div className='mb-2 mt-8'>
          {ProductsData && (
            <>
              <div className='text-base uppercase text-[rgba(0,0,0,.54)]'>Có thể bạn cũng thích</div>
              <div className='mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6'>
                {ProductsData?.data?.data.products?.map((product) => {
                  return (
                    <div key={product._id} className='col-span-1'>
                      <ProductItem product={product} />
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
