import range from 'lodash/range'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}
const DateSelect = ({ value, onChange, errorMessage }: Props) => {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear()
      })
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = e.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }
  return (
    <div className='flex items-center pb-[30px]'>
      <div className='min-w-[20%] truncate text-right capitalize text-[rgba(85,85,85,.8)]'>Ngày sinh</div>
      <div className='w-[80%] pl-5'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='date'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none hover:border-main-orange'
            value={value?.getDate() || date.date}
          >
            <option value=''>Ngày</option>
            {range(1, 32).map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              )
            })}
          </select>
          <select
            onChange={handleChange}
            name='month'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none hover:border-main-orange'
            value={value?.getMonth() || date.month}
          >
            <option value=''>Tháng</option>
            {range(0, 12).map((item) => {
              return (
                <option value={item} key={item}>
                  {item + 1}
                </option>
              )
            })}
          </select>
          <select
            onChange={handleChange}
            name='year'
            className='h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 outline-none hover:border-main-orange'
            value={value?.getFullYear() || date.year}
          >
            <option value=''>Năm</option>
            {range(1990, 2024).map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              )
            })}
          </select>
        </div>
        {errorMessage && <div className='mt-1 min-h-[1.25rem] text-xs text-red-600'>{errorMessage}</div>}
      </div>
    </div>
  )
}

export default DateSelect
