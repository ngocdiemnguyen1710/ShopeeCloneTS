import classNames from 'classnames'
import { ThinArrowLeft, ThinArrowRight } from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'
import { QueryConfig } from '../../ProductList'
import { orderConstant, sortBy } from 'src/constants/product'
import { ProductConfig } from 'src/types/product.type'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import { omit } from 'lodash'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const Sort = ({ queryConfig, pageSize }: Props) => {
  const { sort_by = sortBy.view, order } = queryConfig

  const page = Number(queryConfig.page)

  const navigate = useNavigate()

  const isActiveSortBy = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.product,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue,
            page: '1'
          },
          ['order']
        )
      ).toString()
    })
  }

  const handleOrder = (orderValue: Exclude<ProductConfig['order'], undefined>) => {
    navigate({
      pathname: path.product,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue,
        page: '1'
      }).toString()
    })
  }

  return (
    <div className='rounded-sm bg-[rgba(0,0,0,.03)] px-4 py-3 text-base'>
      <div className='flex items-center justify-between gap-2'>
        <div className=' flex items-center gap-2'>
          <span className='text-main-black'>Sắp xếp theo</span>
          <Controls.Button
            className={classNames('shadow-[0 1px 1px 0 rgba(0,0,0,.02)] rounded-sm px-3 py-1.5 capitalize', {
              'bg-main-orange text-white hover:opacity-90': isActiveSortBy(sortBy.view),
              'bg-white text-main-black hover:bg-slate-50': !isActiveSortBy(sortBy.view)
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </Controls.Button>
          <Controls.Button
            className={classNames('shadow-[0 1px 1px 0 rgba(0,0,0,.02)] rounded-sm px-3 py-1.5 capitalize', {
              'bg-main-orange text-white hover:opacity-90': isActiveSortBy(sortBy.createdAt),
              'bg-white text-main-black hover:bg-slate-50': !isActiveSortBy(sortBy.createdAt)
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </Controls.Button>
          <Controls.Button
            className={classNames('shadow-[0 1px 1px 0 rgba(0,0,0,.02)] rounded-sm px-3 py-1.5 capitalize', {
              'bg-main-orange text-white hover:opacity-90': isActiveSortBy(sortBy.sold),
              'bg-white text-main-black hover:bg-slate-50': !isActiveSortBy(sortBy.sold)
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </Controls.Button>
          <select
            className={classNames(
              'shadow-[0 1px 1px 0 rgba(0,0,0,.02)] h-[2.22rem] rounded-sm px-2 outline-none hover:bg-slate-50',
              {
                'text-main-orange': isActiveSortBy(sortBy.price),
                'text-main-black': !isActiveSortBy(sortBy.price)
              }
            )}
            value={order || ''}
            onChange={(e) => handleOrder(e.target.value as Exclude<ProductConfig['order'], undefined>)}
          >
            <option value='' disabled>
              Giá
            </option>
            <option value={orderConstant.asc} className='text-main-black'>
              Giá: Thấp đến Cao
            </option>
            <option value={orderConstant.desc} className='text-main-black'>
              Giá: Cao đến Thấp
            </option>
          </select>
        </div>
        <div className='flex items-center gap-2'>
          <div>
            <span className='text-main-orange'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='flex items-center'>
            {page === 1 ? (
              <span className='shadow-[0 1px 1px 0 rgba(0,0,0,.02)] cursor-default rounded-bl-sm rounded-tl-sm border-r border-[#f2f2f2] bg-[#f9f9f9] p-3'>
                <ThinArrowLeft className={'h-2.5 w-2.5 fill-gray-1'} />
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.product,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='shadow-[0 1px 1px 0 rgba(0,0,0,.02)] rounded-bl-sm rounded-tl-sm bg-white p-3 hover:bg-slate-50'
              >
                <ThinArrowLeft className={'h-2.5 w-2.5 fill-main-black'} />
              </Link>
            )}

            {page === pageSize ? (
              <span className='shadow-[0 1px 1px 0 rgba(0,0,0,.02)] cursor-default rounded-br-sm rounded-tr-sm border-l border-[#f2f2f2] bg-[#f9f9f9] p-3'>
                <ThinArrowRight className={'h-2.5 w-2.5 fill-gray-1'} />
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.product,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='shadow-[0 1px 1px 0 rgba(0,0,0,.02)] rounded-br-sm rounded-tr-sm border-l bg-white p-3 hover:bg-slate-50'
              >
                <ThinArrowRight className={'h-2.5 w-2.5 fill-main-black'} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sort
