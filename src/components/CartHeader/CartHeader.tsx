import NavHeader from '../NavHeader'
import { Logo, SearchIcon } from '../IconSvg'
import { Link } from 'react-router-dom'
import { path } from 'src/constants/path'
import useSearchProducts from 'src/hooks/useSearchProducts'

const CartHeader = () => {
  const { onSubmitSearch, register } = useSearchProducts()

  return (
    <div className='border-b border-b-black/10'>
      <div className='bg-main-orange text-white'>
        <NavHeader />
      </div>
      <div className='h-[6.25rem] bg-white'>
        <div className='container flex h-full flex-col justify-between py-1.5 md:flex-row md:items-center '>
          <div className='flex items-center'>
            <Link to={path.home} className='flex items-center md:items-end'>
              <Logo className='h-8 fill-main-orange md:h-11' />
              <div className='mb-[0.0625rem] ml-[0.9375rem] flex h-[1.875rem] items-end border-l  border-main-orange pl-[0.9375rem] text-base capitalize text-main-orange md:items-center md:text-[1.25rem]'>
                Giỏ hàng
              </div>
            </Link>
          </div>
          <div className='flex h-[40px] items-center overflow-hidden rounded-sm border-2 border-main-orange md:w-[38.8125rem]'>
            <form className='flex h-full w-full items-center' onSubmit={onSubmitSearch}>
              <input
                className='h-full flex-1  px-2 outline-none'
                type='text'
                placeholder='Ôn lại bí kíp săn sale'
                {...register('name')}
              />
            </form>
            <button className='flex h-full w-[5rem] items-center justify-center bg-[#f05d40] px-[0.625rem] hover:opacity-90'>
              <SearchIcon className='fill-white stroke-white' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartHeader
