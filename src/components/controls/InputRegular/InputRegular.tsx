import { InputHTMLAttributes } from 'react'

interface InputRegularProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
}
const InputRegular = ({
  type,
  placeholder,
  autoComplete,
  className,
  classNameInput = 'w-full rounded-sm p-2.5 text-sm outline-none border border-gray-300'
}: InputRegularProps) => {
  return (
    <>
      <div className={className}>
        <input type={type} autoComplete={autoComplete} className={classNameInput} placeholder={placeholder} />
      </div>
    </>
  )
}

export default InputRegular
