import { useState } from 'react'
import { Minus, Plus } from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'
import InputNumber, { InputNumberProps } from 'src/components/controls/InputNumber'

interface Props extends InputNumberProps {
  classNameWrap?: string
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
}
const QuantityController = ({
  classNameWrap = 'mr-[15px]',
  value,
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  ...rest
}: Props) => {
  const [localValue, setLocalValue] = useState<number>(Number(value))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
    setLocalValue(_value)
  }

  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(e.target.value))
  }
  return (
    <div className={'flex items-center' + classNameWrap}>
      <Controls.Button className='h-8 w-8 rounded-l-sm border' onClick={decrease}>
        <Minus className='h-2.5 w-2.5 fill-[rgba(0,0,0,.8)]' />
      </Controls.Button>
      <InputNumber
        classNameInput='h-8 w-[50px] border-x-0 border-y text-base text-center'
        value={value}
        classNameError='hidden'
        max={max}
        onChange={handleChange}
        onBlur={handleBlur}
        {...rest}
      />
      <Controls.Button className='h-8 w-8 rounded-r-sm border' onClick={increase}>
        <Plus className='h-2.5 w-2.5 fill-[rgba(0,0,0,.8)]' />
      </Controls.Button>
    </div>
  )
}

export default QuantityController
