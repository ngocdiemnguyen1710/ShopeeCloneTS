import { useEffect, useRef, useState } from 'react'

let slideInterval: any

interface SlideProp {
  slides: {
    url: string
  }[]
}

const Slider = (props: SlideProp) => {
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
    const prevButton = firstSlide ? props.slides.length - 1 : currentIndex - 1
    setCurrentIndex(prevButton)
    const slideAfter = slideRef.current as HTMLDivElement
    slideRef && slideAfter.classList.add('fade-anim')
  }

  const nextSlide = () => {
    const lastSlide = currentIndex === props.slides.length - 1
    const nextButton = lastSlide ? 0 : currentIndex + 1
    setCurrentIndex(nextButton)
    const slideAfter = slideRef.current as HTMLDivElement
    slideRef && slideAfter.classList.add('fade-anim')
  }

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex)
  }
  return (
    <div id='default-carousel' className='group relative z-0 h-full w-full lg:col-span-2' data-carousel='slide'>
      {/* Carousel wrapper */}
      <div className='relative h-full md:h-full'>
        {/* Item 1 */}
        <div className='h-full rounded-sm duration-700 ease-in-out' data-carousel-item ref={slideRef}>
          <img
            src={props.slides[currentIndex].url}
            className='absolute left-1/2 top-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-sm'
            alt='...'
          />
        </div>
      </div>
      {/* Slider indicators */}
      <div className='absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3'>
        {props.slides.map((_, slideIndex) => {
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
  )
}

export default Slider
