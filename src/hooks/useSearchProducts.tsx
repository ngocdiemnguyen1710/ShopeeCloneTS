import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useQueryConfig from './useQueryConfig'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { path } from 'src/constants/path'

type FormData = Pick<Schema, 'name'>
const searchSchema = schema.pick(['name'])
const useSearchProducts = () => {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()

  const { handleSubmit, register } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(searchSchema)
  })
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.product,
      search: createSearchParams(config).toString()
    })
  })
  return { onSubmitSearch, register }
}

export default useSearchProducts
