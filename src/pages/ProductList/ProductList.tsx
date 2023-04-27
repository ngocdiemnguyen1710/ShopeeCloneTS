import Slider from 'src/components/Slider'
import Aside from './components/Aside'
import Sort from './components/Sort'
import ProductItem from './components/ProductItem'

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
              {Array(6)
                .fill(0)
                .map((item) => {
                  return <ProductItem key={item} />
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
