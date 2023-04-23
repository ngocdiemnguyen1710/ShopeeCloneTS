import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    url: 'https://cf.shopee.vn/file/vn-50009109-fc69f7125d625e7d28661d4362db6bd2_xxhdpi'
  },
  {
    url: 'https://cf.shopee.vn/file/vn-50009109-b28a2d179952004bcf8b184f7c725181_xxhdpi'
  },
  {
    url: 'https://cf.shopee.vn/file/vn-50009109-e2355a278eec1229489fbf6140a5f993_xxhdpi'
  }
]

let slideInterval: any

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const slideRef = useRef<HTMLDivElement>(null)

  const removeAnimation = () => {
    const slideAfter = slideRef.current as HTMLDivElement
    slideRef && slideAfter.classList.remove('fade-anim')
  }
  useEffect(() => {
    slideRef.current?.addEventListener('animationend', removeAnimation)
    autoPlayNextSlide()
    return () => {
      pauseSlider()
      slideRef.current?.removeEventListener('animationend', removeAnimation)
    }
  }, [currentIndex])

  const autoPlayNextSlide = () => {
    slideInterval = setInterval(() => {
      nextSlide()
    }, 3000)
  }

  const pauseSlider = () => {
    clearInterval(slideInterval)
  }

  const prevSlide = () => {
    const firstSlide = currentIndex === 0
    const prevButton = firstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(prevButton)
    const slideAfter = slideRef.current as HTMLDivElement
    slideRef && slideAfter.classList.add('fade-anim')
  }

  const nextSlide = () => {
    const lastSlide = currentIndex === slides.length - 1
    const nextButton = lastSlide ? 0 : currentIndex + 1
    setCurrentIndex(nextButton)
    const slideAfter = slideRef.current as HTMLDivElement
    slideRef && slideAfter.classList.add('fade-anim')
  }

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex)
  }
  return (
    <div className='container grid h-[235px] grid-cols-1 gap-1 lg:grid-cols-3'>
      <div id='default-carousel' className='group relative h-full w-full lg:col-span-2' data-carousel='slide'>
        {/* Carousel wrapper */}
        <div className='relative h-full md:h-full'>
          {/* Item 1 */}
          <div className='h-full rounded-sm duration-700 ease-in-out' data-carousel-item ref={slideRef}>
            <img
              src={slides[currentIndex].url}
              className='absolute left-1/2 top-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-sm'
              alt='...'
            />
          </div>
        </div>
        {/* Slider indicators */}
        <div className='absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3'>
          {slides.map((_, slideIndex) => {
            return (
              <button
                key={slideIndex}
                type='button'
                className={`${
                  slideIndex === currentIndex
                    ? 'border-main-orange bg-main-orange'
                    : 'border-[hsla(0,0%,100%,.4)] bg-[hsla(0,0%,100%,.4)]'
                } h-2.5 w-2.5 shrink grow basis-0 rounded-full border`}
                onClick={() => goToSlide(slideIndex)}
              />
            )
          })}
        </div>
        {/* Slider controls */}
        <button
          type='button'
          className='absolute left-0  top-0 z-30 hidden h-full cursor-pointer items-center justify-center px-4 focus:outline-none group-hover:flex'
          id='data-carousel-prev'
          onClick={prevSlide}
        >
          <span className='inline-flex h-8 w-8 items-center justify-center  rounded-full bg-white/30 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10'>
            <svg
              aria-hidden='true'
              className='h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            <span className='sr-only'>Previous</span>
          </span>
        </button>
        <button
          type='button'
          className='absolute right-0 top-0 z-30 hidden h-full cursor-pointer items-center justify-center px-4 focus:outline-none group-hover:flex'
          id='data-carousel-next'
          onClick={nextSlide}
        >
          <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10'>
            <svg
              aria-hidden='true'
              className='h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
            <span className='sr-only'>Next</span>
          </span>
        </button>
      </div>
      <div className='flex h-full flex-col justify-center overflow-hidden'>
        <Link to='' className='h-full flex-[1_1_50%] rounded-sm bg-contain' data-carousel-item>
          <img src={slides[1].url} className='rounded-sm' alt='...' />
        </Link>
        <Link to='' className='mt-1 flex h-full rounded-sm bg-contain' data-carousel-item>
          <img src={slides[2].url} className='rounded-sm' alt='...' />
        </Link>
      </div>
    </div>
  )
}

export default Banner
