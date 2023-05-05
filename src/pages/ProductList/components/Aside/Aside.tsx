import { Link, NavLink, createSearchParams, useNavigate } from 'react-router-dom'
import { ArrowRight, FilterIcon, List } from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'
import { Category } from 'src/types/category.type'
import { QueryConfig } from '../../ProductList'
import classNames from 'classnames'
import { path } from 'src/constants/path'
import { Controller, useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { NoUndefinedField } from 'src/types/utils.type'
import RatingStar from '../RatingStar'
import { omit } from 'lodash'

interface Props {
  categories: Category[]
  queryConfig: QueryConfig
}

type FormData = NoUndefinedField<Pick<Schema, 'price_max' | 'price_min'>>

const priceSchema = schema.pick(['price_min', 'price_max'])
const Aside = ({ categories, queryConfig }: Props) => {
  const { category } = queryConfig
  const navigate = useNavigate()
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.product,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: path.product,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <>
      <div className='mb-10 w-full'>
        <Link to='' className='flex items-center'>
          <List
            className={classNames('mr-3 h-3 w-3', {
              'fill-main-orange': !category
            })}
          />
          <span
            className={classNames('text-base font-bold capitalize leading-[3rem]', {
              'text-main-orange': !category
            })}
          >
            Tất cả danh mục
          </span>
        </Link>
        <div className='h-px bg-gray-300'></div>
        <ul className='my-4'>
          {categories.map((categoryItem) => {
            const isActive = category === categoryItem._id
            return (
              <li className='mb-4' key={categoryItem._id}>
                <NavLink
                  to={{
                    pathname: path.product,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id,
                      page: '1'
                    }).toString()
                  }}
                  className='flex items-center'
                >
                  {isActive ? <ArrowRight className={'h-2 w-2 fill-main-orange'} /> : <div className='w-2'></div>}
                  <span
                    className={classNames('ml-2', {
                      'font-bold text-main-orange': isActive
                    })}
                  >
                    {categoryItem.name}
                  </span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='w-full'>
        <div className='flex items-center'>
          <FilterIcon className={'mr-3 h-3 w-3 stroke-current'} />
          <span className='font-bold uppercase'>Bộ lọc tìm kiếm</span>
        </div>
        <form className='my-5 w-full' onSubmit={onSubmit}>
          <div className='mb-4 capitalize'>Khoảng giá</div>
          <div className='grid grid-cols-[70px_minmax(10px,_1fr)_70px] items-center gap-2'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <Controls.InputNumber
                    type='text'
                    className='bg-white'
                    placeholder='₫ TỪ'
                    classNameError='hidden'
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('price_max')
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )
              }}
            />
            <span className='mx-2.5 h-[1px] bg-gray-300'></span>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <Controls.InputNumber
                    type='text'
                    className='bg-white'
                    classNameError='hidden'
                    placeholder='₫ ĐẾN'
                    onChange={(e) => {
                      field.onChange(e)
                      trigger('price_min')
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                )
              }}
            />
          </div>
          {errors.price_min?.message && <div className='mt-1 text-xs text-red-600'>{errors.price_min?.message}</div>}
          <Controls.Button className='mt-5 w-full rounded-sm bg-main-orange py-2 text-sm uppercase text-white'>
            Áp dụng
          </Controls.Button>
        </form>
        <div className='h-px bg-gray-300'></div>
        <div className='my-5 w-full'>
          <div className='mb-4 capitalize'>Đánh giá</div>
          <RatingStar queryConfig={queryConfig} />
        </div>
        <div className='h-px bg-gray-300'></div>
        <Controls.Button
          onClick={handleRemoveAll}
          className='mt-5 w-full rounded-sm bg-main-orange py-2 text-sm uppercase text-white'
        >
          Xóa tất cả
        </Controls.Button>
      </div>
    </>
  )
}

export default Aside
