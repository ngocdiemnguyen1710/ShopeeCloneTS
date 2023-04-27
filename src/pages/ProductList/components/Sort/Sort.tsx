import { ThinArrowLeft, ThinArrowRight } from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'

const Sort = () => {
  return (
    <div className='rounded-sm bg-[rgba(0,0,0,.03)] px-4 py-3 text-base'>
      <div className='flex items-center justify-between gap-2'>
        <div className=' flex items-center gap-2'>
          <span className='text-main-black'>Sắp xếp theo</span>
          <Controls.Button className='shadow-[0 1px 1px 0 rgba(0,0,0,.02)] rounded-sm bg-main-orange px-3 py-1.5 capitalize text-white'>
            Phổ biến
          </Controls.Button>
          <Controls.Button className='shadow-[0 1px 1px 0 rgba(0,0,0,.02)] rounded-sm bg-white px-3 py-1.5 capitalize hover:bg-slate-50'>
            Mới nhất
          </Controls.Button>
          <Controls.Button className='shadow-[0 1px 1px 0 rgba(0,0,0,.02)] rounded-sm bg-white px-3 py-1.5 capitalize hover:bg-slate-50'>
            Bán chạy
          </Controls.Button>
          <select className='shadow-[0 1px 1px 0 rgba(0,0,0,.02)] h-[2.22rem] rounded-sm px-2 outline-none hover:bg-slate-50'>
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá: Thấp đến Cao</option>
            <option value='price:des'>Giá: Cao đến Thấp</option>
          </select>
        </div>
        <div className='flex items-center gap-2'>
          <div>
            <span className='text-main-orange'>1</span>
            <span>/2</span>
          </div>
          <div className='flex items-center'>
            <Controls.Button className='shadow-[0 1px 1px 0 rgba(0,0,0,.02)] cursor-default rounded-bl-sm rounded-tl-sm border-r border-[#f2f2f2] bg-[#f9f9f9] p-3'>
              <ThinArrowLeft className={'h-2.5 w-2.5 fill-gray-1'} />
            </Controls.Button>
            <Controls.Button className='shadow-[0 1px 1px 0 rgba(0,0,0,.02)] rounded-br-sm rounded-tr-sm bg-white p-3 hover:bg-slate-50'>
              <ThinArrowRight className={'h-2.5 w-2.5 fill-main-black'} />
            </Controls.Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sort
