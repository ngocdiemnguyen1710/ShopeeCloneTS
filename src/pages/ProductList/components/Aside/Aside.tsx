import { Link, NavLink } from 'react-router-dom'
import { ArrowRight, Filter, List, StartFull } from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'

const Aside = () => {
  return (
    <>
      <div className='mb-10 w-full'>
        <Link to='' className='flex items-center'>
          <List className='mr-3 h-3 w-3' />
          <span className='text-base font-bold capitalize leading-[3rem]'>Tất cả danh mục</span>
        </Link>
        <div className='h-px bg-gray-300'></div>
        <ul className='my-4'>
          <li className='mb-4'>
            <NavLink to='' className='flex items-center'>
              <ArrowRight className={'mr-1 h-2 w-2'} />
              <span className='flex-1'>Thời trang</span>
            </NavLink>
          </li>
          <li>
            <NavLink to=''>
              <span>Điện thoại</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='w-full'>
        <div className='flex items-center'>
          <Filter className={'mr-3 h-3 w-3 stroke-current'} />
          <span className='font-bold uppercase'>Bộ lọc tìm kiếm</span>
        </div>
        <div className='my-5 w-full'>
          <div className='mb-4 capitalize'>Khoảng giá</div>
          <div className='grid grid-cols-[70px_minmax(10px,_1fr)_70px] items-center gap-2'>
            <Controls.InputRegular className='bg-white' placeholder='đ TỪ' />
            <span className='mx-2.5 h-[1px] bg-gray-300'></span>
            <Controls.InputRegular className='bg-white' placeholder='đ ĐẾN' />
          </div>
          <Controls.Button className='mt-5 w-full rounded-sm bg-main-orange py-2 text-sm uppercase text-white'>
            Áp dụng
          </Controls.Button>
        </div>
        <div className='h-px bg-gray-300'></div>
        <div className='my-5 w-full'>
          <div className='mb-4 capitalize'>Đánh giá</div>
          <ul className='pl-3'>
            <li className='mb-4'>
              <Link to='' className='flex items-center gap-1'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <div key={index}>
                        <StartFull className={'h-4 w-4'} />
                      </div>
                    )
                  })}
              </Link>
            </li>
            <li className='mb-4'>
              <Link to='' className='flex items-center gap-1'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <div key={index}>
                        <StartFull className={'h-4 w-4'} />
                      </div>
                    )
                  })}
                <span className='text-sm'>trở lên</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className='h-px bg-gray-300'></div>
        <Controls.Button className='mt-5 w-full rounded-sm bg-main-orange py-2 text-sm uppercase text-white'>
          Xóa tất cả
        </Controls.Button>
      </div>
    </>
  )
}

export default Aside
