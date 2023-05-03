import Slider from 'src/components/Slider'
import Aside from './components/Aside'
import Sort from './components/Sort'
import ProductItem from './components/ProductItem'
import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from 'src/hooks/useQueryParams'
import productApi from 'src/apis/product.api'
import Pagination from './components/Pagination'
import { useState } from 'react'

const slides = [
  {
    url: 'https://cf.shopee.vn/file/vn-50009109-8d78442476470767601e278f3557f46a'
  },
  {
    url: 'https://cf.shopee.vn/file/vn-50009109-13d73978577a0f6e4523e8df62d48c62'
  },
  {
    url: 'https://cf.shopee.vn/file/vn-50009109-c7262f51297767459348394b5ae98545'
  }
]

const ProductList = () => {
  const [page, setPage] = useState(1)
  const queryConfig = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig)
    }
  })
  return (
    <div className='min-w-[100vh] bg-contain-gray p-3 text-main-black'>
      <div className='container'>
        <div className='mt-4 h-[350px]'>
          <Slider slides={slides} />
        </div>
        <div className='mt-8 grid grid-cols-[190px_minmax(900px,_1fr)] gap-3'>
          <div className='col-span-1'>
            <Aside />
          </div>
          <div className='ml-2 block'>
            <Sort />
            <div className='mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5'>
              {data &&
                data?.data?.data.products?.map((product) => {
                  return (
                    <div key={product._id} className='col-span-1'>
                      <ProductItem product={product} />
                    </div>
                  )
                })}
            </div>
            <Pagination page={page} setPage={setPage} pageSize={20} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
