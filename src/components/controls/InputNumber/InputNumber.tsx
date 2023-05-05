import { InputHTMLAttributes, forwardRef } from 'react'

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
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
    ...rest
  },
  ref
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e)
    }
  }
  return (
    <>
      <div className={className}>
        <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
        {errorMessage && <div className={classNameError}>{errorMessage}</div>}
      </div>
    </>
  )
})

export default InputNumber
