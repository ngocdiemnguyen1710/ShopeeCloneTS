import { Link } from 'react-router-dom'
import Slider from '../Slider'

const imgPromo = [
  {
    url: 'https://cf.shopee.vn/file/e4a404283b3824c211c1549aedd28d5f_xhdpi',
    name: 'Khung Giờ Săn Sale'
  },
  {
    url: 'https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi',
    name: 'Gì Cũng Rẻ - Mua Là Freeship'
  },
  {
    url: 'https://cf.shopee.vn/file/vn-50009109-8a387d78a7ad954ec489d3ef9abd60b4_xhdpi',
    name: 'Mã Giảm Giá'
  },
  {
    url: 'https://cf.shopee.vn/file/c7a2e1ae720f9704f92f72c9ef1a494a_xhdpi',
    name: 'Miễn Phí Vận Chuyển'
  },
  {
    url: 'https://cf.shopee.vn/file/vn-50009109-1975fb1af4ae3c22878d04f6f440b6f9_xhdpi',
    name: 'Bắt Trend - Giá Sốc'
  },
  {
    url: 'https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi',
    name: 'Voucher Giảm Đến 200.000Đ'
  },
  {
    url: 'https://cf.shopee.vn/file/8d6d5ee795e7675fed39d31ba04c3b92_xhdpi',
    name: 'Hàng Hiệu Giá Tốt'
  },
  {
    url: 'https://cf.shopee.vn/file/vn-50009109-29961f92098bc9153b88332110a91c87_xhdpi',
    name: 'Quốc Tế - Giao Thần Tốc'
  },
  {
    url: '	https://cf.shopee.vn/file/9df57ba80ca225e67c08a8a0d8cc7b85_xhdpi',
    name: 'Nạp Điện Thoại & Thẻ Game'
  },
  {
    url: 'https://cf.shopee.vn/file/vn-50009109-9e186f276045f5e2350a3b7cb1729351_xhdpi',
    name: 'Trúng 1 Triệu Xu'
  }
]

const Banner = () => {
  return (
    <div className='container pt-6'>
      <div className='grid h-[235px] grid-cols-1 gap-1 bg-center lg:grid-cols-3'>
        <Slider />
        <div className='flex h-full flex-col justify-center overflow-hidden'>
          <Link to='' className='h-full flex-[1_1_50%] rounded-sm bg-contain' data-carousel-item>
            <img
              src='https://cf.shopee.vn/file/vn-50009109-fc69f7125d625e7d28661d4362db6bd2_xxhdpi'
              className='rounded-sm'
              alt='...'
            />
          </Link>
          <Link to='' className='mt-1 flex h-full rounded-sm bg-contain' data-carousel-item>
            <img
              src='https://cf.shopee.vn/file/vn-50009109-e2355a278eec1229489fbf6140a5f993_xxhdpi'
              className='rounded-sm'
              alt='...'
            />
          </Link>
        </div>
      </div>
      <div className='mt-5 pb-2'>
        <div className='grid h-full w-full grid-cols-10 gap-4'>
          {imgPromo.map((item, index) => {
            return (
              <div
                key={index}
                className='flex cursor-pointer flex-col items-center justify-start gap-2 hover:-translate-y-px'
              >
                <img src={item.url} alt='' className='h-12 w-12' />
                <span className='text-center text-sm'>{item.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Banner
