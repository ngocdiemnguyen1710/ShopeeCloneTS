import { useRef } from 'react'
import { toast } from 'react-hot-toast'
import config from 'src/constants/config'
import Controls from '../Controls'

interface Props {
  onChange?: (file?: File) => void
}
const InputFile = ({ onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dung lượng file tối đa 1MB. Định dạng JPEG, PNG')
    } else {
      onChange && onChange(fileFromLocal)
    }
  }

  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <>
      <input
        type='file'
        className='hidden'
        accept='.jpg, .jpeg, .png'
        ref={fileInputRef}
        onChange={onFileChange}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e) => ((e.target as any).value = null)}
      />
      <div className='shadow-[0 1px 1px 0 rgba(0,0,0,.03)] first-letter:h flex h-[40px] w-[104px] justify-center border border-[rgba(0,0,0,.09)] hover:bg-slate-50'>
        <Controls.Button className='capitalize' type='button' onClick={handleUpload}>
          Chọn ảnh
        </Controls.Button>
      </div>
    </>
  )
}

export default InputFile
