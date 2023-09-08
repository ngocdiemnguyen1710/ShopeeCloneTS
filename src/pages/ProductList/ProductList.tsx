import Slider from 'src/components/Slider'
import Aside from './components/Aside'
import Sort from './components/Sort'
import ProductItem from './components/ProductItem'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import Pagination from './components/Pagination'
import { ProductConfig } from 'src/types/product.type'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import categoryApi from 'src/apis/category.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { Helmet } from 'react-helmet-async'

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
  const location = useLocation()
  const productListElement = document.getElementById('product-list')

  const queryConfig = useQueryConfig()

  const { data: ProductsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })

  const { data: CategoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })

  useEffect(() => {
    const { category, name, order, price_max, price_min, rating_filter, sort_by } = queryConfig
    const productListTop = productListElement?.offsetTop
    if (category || name || order || price_min || price_max || rating_filter || sort_by) {
      window.scrollTo({
        top: productListTop,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location, productListElement?.offsetTop, queryConfig])

  return (
    <div className='min-w-[100vh] bg-contain-gray p-3 text-main-black'>
      <Helmet>
        <title>Danh sách sản phẩm | Shopee Clone</title>
        <meta name='description' content='Đây là dự án Shopee Clone' />
      </Helmet>
      <div className='container'>
        <div className='mt-4 h-[350px]'>
          <Slider slides={slides} />
        </div>
        <div className='mt-8 grid grid-cols-[190px_minmax(900px,_1fr)] gap-3' id='product-list'>
          {ProductsData && (
            <>
              <div className='col-span-1'>
                <Aside categories={CategoriesData?.data.data || []} queryConfig={queryConfig} />
              </div>
              <div className='ml-2 block'>
                <Sort queryConfig={queryConfig} pageSize={ProductsData.data.data.pagination.page_size} />
                <div className='mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5'>
                  {ProductsData?.data?.data.products?.map((product) => {
                    return (
                      <div key={product._id} className='col-span-1'>
                        <ProductItem product={product} />
                      </div>
                    )
                  })}
                </div>
                <Pagination queryConfig={queryConfig} pageSize={ProductsData.data.data.pagination.page_size} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
