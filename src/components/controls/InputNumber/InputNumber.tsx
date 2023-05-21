import { InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  errorMessage?: string
  classNameError?: string
}
const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    className,
    classNameInput = 'w-full rounded-sm p-1.5 text-sm outline-none border border-gray-300',
    errorMessage,
    classNameError = 'mt-1 min-h-[1.25rem] text-xs text-red-600',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  //Thực thi onChange callback từ bên ngoài truyền vào props
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e)

      //Cập nhật value localState
      setLocalValue(value)
    }
  }
  return (
    <>
      <div className={className}>
        <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} value={value || localValue} />
        {errorMessage && <div className={classNameError}>{errorMessage}</div>}
      </div>
    </>
  )
})

export default InputNumber
