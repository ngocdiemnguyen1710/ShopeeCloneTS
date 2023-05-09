import { Minus, Plus } from 'src/components/IconSvg'
import Controls from 'src/components/controls/Controls'
import InputNumber, { InputNumberProps } from 'src/components/controls/InputNumber'

interface Props extends InputNumberProps {
  classNameWrapper?: string
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
}
const QuantityController = ({
  classNameWrapper = 'mr-[15px]',
  value,
  max,
  onIncrease,
  onDecrease,
  onType,
  ...rest
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
  }

  const increase = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
  }

  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
  }
  return (
    <div className={'flex items-center' + classNameWrapper}>
      <Controls.Button className='h-8 w-8 rounded-l-sm border' onClick={decrease}>
        <Minus className='h-2.5 w-2.5 fill-[rgba(0,0,0,.8)]' />
      </Controls.Button>
      <InputNumber
        classNameInput='h-8 w-[50px] border-x-0 border-y text-base text-center'
        value={value}
        classNameError='hidden'
        max={max}
        onChange={handleChange}
        {...rest}
      />
      <Controls.Button className='h-8 w-8 rounded-r-sm border' onClick={increase}>
        <Plus className='h-2.5 w-2.5 fill-[rgba(0,0,0,.8)]' />
      </Controls.Button>
    </div>
  )
}

export default QuantityController
