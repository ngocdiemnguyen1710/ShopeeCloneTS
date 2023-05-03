import { StartBackground, StartFull } from 'src/components/IconSvg'

const ProductRating = ({ rating }: { rating: number }) => {
  const handleWidth = (order: number) => {
    if (order <= rating) {
      return '100%'
    } else if (order > rating && order - rating < 1) {
      return (rating - Math.floor(rating)) * 100 + '%'
    }
    return '0%'
  }
  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <div className='relative' key={index}>
              <div
                className='absolute left-0 top-0 z-10 h-full overflow-hidden'
                style={{ width: handleWidth(index + 1) }}
              >
                <StartFull className='h-2.5 w-2.5' />
              </div>
              <StartBackground className='h-2.5 w-2.5 fill-current text-gray-1' />
            </div>
          )
        })}
    </div>
  )
}
export default ProductRating
