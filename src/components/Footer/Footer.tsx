import { Link } from 'react-router-dom'
import CreditCard1 from '../../assets/images/credit-card1.png'
import CreditCard2 from '../../assets/images/credit-card2.png'
import CreditCard3 from '../../assets/images/credit-card3.png'
import CreditCard4 from '../../assets/images/credit-card4.png'
import CreditCard5 from '../../assets/images/credit-card5.png'
import CreditCard6 from '../../assets/images/credit-card6.png'
import CreditCard7 from '../../assets/images/credit-card7.png'
import CreditCard8 from '../../assets/images/credit-card8.png'
import Delivery1 from '../../assets/images/delivery1.png'
import Delivery2 from '../../assets/images/delivery2.png'
import Delivery3 from '../../assets/images/delivery3.jpg'
import Delivery4 from '../../assets/images/delivery4.png'
import Delivery5 from '../../assets/images/delivery5.png'
import Delivery6 from '../../assets/images/delivery6.png'
import Delivery7 from '../../assets/images/delivery7.png'
import Delivery8 from '../../assets/images/delivery8.png'
import Delivery9 from '../../assets/images/delivery9.png'
import Delivery10 from '../../assets/images/delivery10.png'
import Facebook from '../../assets/images/social1.png'
import Instagram from '../../assets/images/social2.png'
import LinkedIn from '../../assets/images/social3.png'
import QRCode from '../../assets/images/qrcode.png'
import App1 from '../../assets/images/app1.png'
import App2 from '../../assets/images/app2.png'
import App3 from '../../assets/images/app3.png'
import Registed from '../../assets/images/registed.png'

const menuCareCustomer = [
  {
    id: 1,
    name: 'Trung tâm trợ giúp'
  },
  {
    id: 2,
    name: 'Shopee Blog'
  },
  {
    id: 3,
    name: 'Shopee Mall'
  },
  {
    id: 4,
    name: 'Hướng Dẫn Mua Hàng'
  },
  {
    id: 5,
    name: 'Hướng Dẫn Bán Hàng'
  },
  {
    id: 6,
    name: 'Thanh Toán'
  },
  {
    id: 7,
    name: 'Shopee Xu'
  },
  {
    id: 8,
    name: 'Vận Chuyển'
  },
  {
    id: 9,
    name: 'Trả Hàng & Hoàn Tiền'
  },
  {
    id: 10,
    name: 'Chăm Sóc Khách Hàng'
  },
  {
    id: 11,
    name: 'Chính Sách Bảo Hành'
  }
]

const aboutShop = [
  {
    id: 1,
    name: 'Giới Thiệu Về Shopee Việt Nam'
  },
  {
    id: 2,
    name: 'Tuyển Dụng'
  },
  {
    id: 3,
    name: 'Điều Khoản Shopee'
  },
  {
    id: 4,
    name: 'Chính Sách Bảo Mật'
  },
  {
    id: 5,
    name: 'Chính Hãng'
  },
  {
    id: 6,
    name: 'Kênh Người Bán'
  },
  {
    id: 7,
    name: 'Flash Sales'
  },
  {
    id: 8,
    name: 'Chương Trình Tiếp Thị Liên Kết Shopee'
  },
  {
    id: 9,
    name: 'Liên Hệ Với Truyền Thông'
  }
]

const creditCard = [
  {
    id: 1,
    src: CreditCard1,
    alt: 'credit-1'
  },
  {
    id: 2,
    src: CreditCard2,
    alt: 'credit-2'
  },
  {
    id: 3,
    src: CreditCard3,
    alt: 'credit-3'
  },
  {
    id: 4,
    src: CreditCard4,
    alt: 'credit-4'
  },
  {
    id: 5,
    src: CreditCard5,
    alt: 'credit-5'
  },
  {
    id: 6,
    src: CreditCard6,
    alt: 'credit-6'
  },
  {
    id: 7,
    src: CreditCard7,
    alt: 'credit-7'
  },
  {
    id: 8,
    src: CreditCard8,
    alt: 'credit-8'
  }
]

const delivery = [
  {
    id: 1,
    src: Delivery1,
    alt: 'delivery-1'
  },
  {
    id: 2,
    src: Delivery2,
    alt: 'delivery-2'
  },
  {
    id: 3,
    src: Delivery3,
    alt: 'delivery-3'
  },
  {
    id: 4,
    src: Delivery4,
    alt: 'delivery-4'
  },
  {
    id: 5,
    src: Delivery5,
    alt: 'delivery-5'
  },
  {
    id: 6,
    src: Delivery6,
    alt: 'delivery-6'
  },
  {
    id: 7,
    src: Delivery7,
    alt: 'delivery-7'
  },
  {
    id: 8,
    src: Delivery8,
    alt: 'delivery-8'
  },
  {
    id: 9,
    src: Delivery9,
    alt: 'delivery-9'
  },
  {
    id: 10,
    src: Delivery10,
    alt: 'delivery-10'
  }
]

const followUs = [
  {
    id: 1,
    src: Facebook,
    name: 'Facebook'
  },
  {
    id: 2,
    src: Instagram,
    name: 'Instagram'
  },
  {
    id: 3,
    src: LinkedIn,
    name: 'LinkedIn'
  }
]

const Footer = () => {
  return (
    <footer className='bg-footer'>
      <div className='container'>
        <div className='grid grid-cols-2 lg:grid-cols-5'>
          <div className='p-1.5'>
            <div className='mb-5 mt-10 text-xs font-bold'>CHĂM SÓC KHÁCH HÀNG</div>
            <ul className='mb-4 block list-none text-color-footer-1 no-underline'>
              {menuCareCustomer?.map((item) => {
                return (
                  <li className='mb-3 text-xs' key={item.id}>
                    <Link to='#' className='overflow-hidden text-color-footer-1 no-underline hover:text-main-orange'>
                      <span className='max-w-full truncate'>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='p-1.5'>
            <div className='mb-5 mt-10 text-xs font-bold'>VỀ SHOPEE</div>
            <ul className='mb-4 block list-none text-color-footer-1 no-underline'>
              {aboutShop?.map((item) => {
                return (
                  <li className='mb-3 text-xs' key={item.id}>
                    <Link to='#' className='overflow-hidden text-color-footer-1 no-underline hover:text-main-orange'>
                      <span className='max-w-full truncate'>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='p-1.5'>
            <div className='mb-5 mt-10 text-xs font-bold'>THANH TOÁN</div>
            <ul className='mb-4 flex list-none flex-wrap text-color-footer-1 no-underline'>
              {creditCard?.map((item) => {
                return (
                  <li
                    className='mb-2 mr-2 box-border flex h-7 w-14 items-center justify-center overflow-hidden rounded-sm bg-white p-1 shadow-img-footer'
                    key={item.id}
                  >
                    <Link to='#' className='box-border max-h-full max-w-full text-center'>
                      <img src={item.src} alt={item.alt} className='max-h-full max-w-full' />
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className='mb-5 mt-10 text-xs font-bold'>ĐƠN VỊ VẬN CHUYỂN</div>
            <ul className='mb-4 flex list-none flex-wrap text-color-footer-1 no-underline'>
              {delivery?.map((item) => {
                return (
                  <li
                    className='mb-2 mr-2 box-border flex h-7 w-14 items-center justify-center overflow-hidden rounded-sm bg-white p-1 shadow-img-footer'
                    key={item.id}
                  >
                    <Link to='#' className='box-border max-h-full max-w-full text-center'>
                      <img src={item.src} alt={item.alt} className='max-h-full max-w-full' />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='p-1.5'>
            <div className='mb-5 mt-10 text-xs font-bold'>THEO DÕI CHÚNG TÔI TRÊN</div>
            <ul className='mb-4 block list-none text-color-footer-1 no-underline'>
              {followUs?.map((item) => {
                return (
                  <li className='mb-3 text-xs' key={item.id}>
                    <Link
                      to='#'
                      className='flex items-center overflow-hidden text-color-footer-1 no-underline hover:text-main-orange'
                    >
                      <img src={item.src} alt={item.name} className='mr-2' />
                      <span className='max-w-full truncate'>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className='p-1.5'>
            <div className='mb-5 mt-10 text-xs font-bold'>TẢI ỨNG DỤNG SHOPEE NGAY THÔI</div>
            <div className='flex items-center'>
              <Link to='#' className='no-underline'>
                <img
                  src={QRCode}
                  alt='QR'
                  className='mr-3 max-h-full max-w-full rounded-sm bg-white p-2 shadow-img-footer'
                />
              </Link>
              <div className='flex w-20 flex-col'>
                <Link
                  to='#'
                  className='mb-2 flex items-center overflow-hidden rounded-sm bg-white p-1 no-underline shadow-img-footer'
                >
                  <img src={App1} alt='Appstore' className='max-h-full max-w-full' />
                </Link>
                <Link
                  to='#'
                  className='mb-2 flex items-center overflow-hidden rounded-sm bg-white p-1 no-underline shadow-img-footer'
                >
                  <img src={App2} alt='GGPlay' className='max-h-full max-w-full' />
                </Link>
                <Link
                  to='#'
                  className='mb-2 flex items-center overflow-hidden rounded-sm bg-white p-1 no-underline shadow-img-footer'
                >
                  <img src={App3} alt='AppGallery' className='max-h-full max-w-full' />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='grid grid-cols-1 gap-4 py-10 text-color-footer-2 lg:grid-cols-3'>
          <div className='text-sm lg:col-span-1'>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
          <div className='lg:col-span-2'>
            <div className='text-sm'>
              Quốc gia & Khu vực: <Link to={'#'}>Singapore</Link> | <Link to={'#'}>Indonesia</Link> |{' '}
              <Link to={'#'}>Đài Loan</Link> | <Link to={'#'}>Thái Lan</Link> | <Link to={'#'}>Malaysia</Link> |{' '}
              <Link to={'#'}>Việt Nam</Link> | <Link to={'#'}>Philippínes</Link> | <Link to={'#'}>Brazil</Link> |{' '}
              <Link to={'#'}>Mexico</Link> | <Link to={'#'}>Colombia</Link> | <Link to={'#'}>Chile</Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='mx-auto max-w-7xl px-4 py-10 text-xs text-color-footer-2'>
          <div className='mb-10 flex justify-center'>
            <div className='border-r border-gray-200 px-6'>
              <Link to={'#'}>
                <span>CHÍNH SÁCH BẢO MẬT</span>
              </Link>
            </div>
            <div className='border-r border-gray-200 px-6'>
              <Link to={'#'}>
                <span>QUY CHẾ HOẠT ĐỘNG</span>
              </Link>
            </div>
            <div className='border-r border-gray-200 px-6'>
              <Link to={'#'}>
                <span>CHÍNH SÁCH VẬN CHUYỂN</span>
              </Link>
            </div>
            <div className='border-gray-200 px-6'>
              <Link to={'#'}>
                <span>CHÍNH SÁCH VẬN CHUYỂN</span>
              </Link>
            </div>
          </div>
          <div className='flex justify-center'>
            <Link to={'#'} className='mx-5 h-11 w-28'>
              <img src={Registed} alt='' className='max-h-full max-w-full' />
            </Link>
            <Link to={'#'} className='mx-5 h-11 w-28'>
              <img src={Registed} alt='' className='max-h-full max-w-full' />
            </Link>
            <Link to={'#'} className='mx-5 h-11 w-28'>
              <img src={Registed} alt='' className='max-h-full max-w-full' />
            </Link>
          </div>
          <div className='mb-6 mt-2 text-center'>Công ty TNHH Shopee</div>
          <div className='text-center'>
            <p className='mb-1'>
              Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
              phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
            </p>
            <p className='mb-1'>
              Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
            </p>
            <p className='mb-1'>
              Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
            </p>
            <p>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
