import { StartEmpty, StartFull } from 'src/components/IconSvg'
import { QueryConfig } from '../../ProductList'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import classNames from 'classnames'
import { random } from 'lodash'

interface Props {
  queryConfig: QueryConfig
}
const RatingStar = ({ queryConfig }: Props) => {
  const { rating_filter } = queryConfig
  const navigate = useNavigate()
  const handleRatingStar = (ratingFilter: number) => {
    navigate({
      pathname: path.product,
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(ratingFilter)
      }).toString()
    })
  }
  return (
    <ul className=''>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          const isActive = 5 - index === Number(rating_filter)
          return (
            <li className='mb-4' key={index}>
              <div
                className={classNames('flex cursor-pointer items-center gap-1 px-[0.75rem]', {
                  'h-[1.5625rem] rounded-[.78125rem] bg-[#ebebeb] ': isActive
                })}
                onClick={() => handleRatingStar(5 - index)}
                role='button'
                aria-hidden='true'
              >
                {Array(5)
                  .fill(0)
                  .map((_, indexStart) => {
                    if (indexStart < 5 - index) {
                      return (
                        <div key={indexStart}>
                          <StartFull className={'h-4 w-4'} />
                        </div>
                      )
                    }
                    return (
                      <div key={indexStart}>
                        <StartEmpty className={'h-4 w-4'} />
                      </div>
                    )
                  })}
                {index !== 0 && <span className='text-sm'>trở lên</span>}
              </div>
            </li>
          )
        })}
    </ul>
  )
}

export default RatingStar
