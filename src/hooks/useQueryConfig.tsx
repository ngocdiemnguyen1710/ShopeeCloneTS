import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import { ProductConfig } from 'src/types/product.type'
import { useQueryParams } from './useQueryParams'

export type QueryConfig = {
  [key in keyof ProductConfig]: string
}
const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParams()

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      exclude: queryParams.exclude,
      limit: queryParams.limit,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by,
      category: queryParams.category
    },
    isUndefined
  )

  return queryConfig
}

export default useQueryConfig
