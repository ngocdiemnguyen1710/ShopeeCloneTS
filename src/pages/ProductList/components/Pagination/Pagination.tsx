import classNames from 'classnames'
import { ArrowLeftPagination, ArrowRightPagination } from 'src/components/IconSvg'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

const RANGE = 2
const Pagination = ({ page, setPage, pageSize }: Props) => {
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button className='m-4 h-7 min-w-[2.5rem] text-xl text-pagination' key={index}>
            ...
          </button>
        )
      }
      return null
    }
    const renderDotAter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button className='m-4 h-7 min-w-[2.5rem] text-xl text-pagination' key={index}>
            ...
          </button>
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
          <button
            className={classNames('m-4 h-7 min-w-[2.5rem] text-xl ', {
              'rounded-sm bg-main-orange text-white': pageNumber === page,
              'border-transparent text-pagination': pageNumber !== page
            })}
            key={index}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      })
  }
  return (
    <div className='my-7 flex flex-wrap items-center justify-center'>
      <button className='mr-4 fill-pagination'>
        <ArrowLeftPagination className='h-3.5 w-3.5' />
      </button>
      {renderPagination()}
      <button className='ml-4 fill-pagination'>
        <ArrowRightPagination className='h-3.5 w-3.5' />
      </button>
    </div>
  )
}

export default Pagination
