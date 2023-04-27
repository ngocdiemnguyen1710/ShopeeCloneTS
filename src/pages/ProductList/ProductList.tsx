import Slider from 'src/components/Slider'
import Aside from './Aside'
import Sort from './Sort'

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
        <div className='h-[350px]'>
          <Slider slides={slides} />
        </div>
        <div className='grid grid-cols-[190px_minmax(900px,_1fr)] gap-3'>
          <div className='col-span-1'>
            <Aside />
          </div>
          <div className='block'>
            <Sort />
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
