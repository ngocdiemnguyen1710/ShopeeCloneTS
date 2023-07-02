import { InputHTMLAttributes, useState } from 'react'
import { UseControllerProps, FieldValues, FieldPath, useController } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
}

const InputV2 = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName> & InputNumberProps
) => {
  const {
    type,
    onChange,
    className,
    classNameInput = 'w-full rounded-sm p-1.5 text-sm outline-none border border-gray-300',
    classNameError = 'mt-1 min-h-[1.25rem] text-xs text-red-600',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = e.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type !== 'number') {
      //Cập nhật value localState
      setLocalValue(valueFromInput)
      //Gọi field.onChange để cập nhật vào state React Hook Form
      field.onChange(e)
      //Thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(e)
    }
  }
  return (
    <>
      <div className={className}>
        <input
          className={classNameInput}
          {...rest}
          {...field}
          onChange={handleChange}
          {...rest}
          value={value || localValue}
        />
        {fieldState.error?.message && <div className={classNameError}>{fieldState.error?.message}</div>}
      </div>
    </>
  )
}

export default InputV2

// type Gen<TFunc> = {
//   getName: TFunc
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function Hexa<TFunc extends () => string, TLastName extends ReturnType<TFunc>>(props: {
//   person: Gen<TFunc>
//   lastName: TLastName
// }) {
//   return null
// }

// const handleName: () => 'Diem' = () => 'Diem'

// function App() {
//   return <Hexa person={{ getName: handleName }} lastName='Diem' />
// }
