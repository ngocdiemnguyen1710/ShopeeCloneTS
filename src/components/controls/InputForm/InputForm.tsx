import { InputHTMLAttributes, ReactNode } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  rules?: RegisterOptions
  register?: UseFormRegister<any>
  children?: ReactNode
  errorMessage?: string
}
const InputForm = ({
  type,
  placeholder,
  rules,
  name,
  children,
  errorMessage,
  autoComplete,
  register
}: InputFormProps) => {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <>
      <div
        className={`flex items-center border ${
          !errorMessage && 'border-gray-300'
        }  focus:border-gray-500 focus:shadow-sm ${
          errorMessage && 'border-error-box bg-error-input focus:border-error-box'
        }`}
      >
        <input
          type={type}
          autoComplete={autoComplete}
          className='w-full flex-1 rounded-sm bg-transparent p-2.5 text-sm outline-none'
          placeholder={placeholder}
          {...registerResult}
        />
        {children}
      </div>
      {errorMessage && <div className='mt-1 min-h-[1.25rem] text-xs text-red-600'>{errorMessage}</div>}
    </>
  )
}

export default InputForm
