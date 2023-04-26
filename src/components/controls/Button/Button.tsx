import { ButtonHTMLAttributes } from 'react'
import { Spinner } from 'src/components/IconSvg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}
const Button = (props: ButtonProps) => {
  const { className, isLoading, disabled, children, ...rest } = props
  return (
    <button className={className} {...rest} disabled={disabled}>
      <div className='flex items-center justify-center fill-white'>
        {isLoading && <Spinner className='mr-2 h-4 w-4 text-gray-200' />}
        {children}
      </div>
    </button>
  )
}

export default Button
