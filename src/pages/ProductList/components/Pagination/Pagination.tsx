import classNames from 'classnames'
import { ArrowLeftPagination, ArrowRightPagination } from 'src/components/IconSvg'
import { Link, createSearchParams } from 'react-router-dom'
import { path } from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2
const Pagination = ({ queryConfig, pageSize }: Props) => {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span className='m-4 h-7 min-w-[2.5rem] text-xl text-pagination' key={index}>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span className='m-4 h-7 min-w-[2.5rem] text-xl text-pagination' key={index}>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber > RANGE && pageNumber < page - RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.product,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            className={classNames('m-4 flex h-7 min-w-[2.5rem] justify-center text-xl', {
              'rounded-sm bg-main-orange text-white shadow-sm': pageNumber === page,
              'border-transparent text-pagination': pageNumber !== page
            })}
            key={index}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='my-7 flex flex-wrap items-center justify-center'>
      {page === 1 ? (
        <span className='mr-4 flex justify-center fill-pagination'>
          <ArrowLeftPagination className='h-3.5 w-3.5' />
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
          className='mr-4 flex justify-center fill-pagination'
        >
          <ArrowLeftPagination className='h-3.5 w-3.5' />
        </Link>
      )}

      {renderPagination()}
      {page === pageSize ? (
        <span className='ml-4 flex justify-center fill-pagination'>
          <ArrowRightPagination className='h-3.5 w-3.5' />
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
          className='ml-4 flex justify-center fill-pagination'
        >
          <ArrowRightPagination className='h-3.5 w-3.5' />
        </Link>
      )}
    </div>
  )
}

export default Pagination
