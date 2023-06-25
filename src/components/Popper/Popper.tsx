import { useFloating, useHover, useInteractions, offset, FloatingArrow, arrow, shift } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AvatarDefault } from '../IconSvg'

interface ProperProps {
  children?: ReactNode
  className?: string
  iconLeft?: any
  name?: string
  iconRight?: any
  src?: string
  renderProp?: any
}

const Popper = ({
  children,
  className,
  iconLeft = <AvatarDefault className='stroke-[#c6c6c6]' />,
  name,
  iconRight,
  src,
  renderProp
}: ProperProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const arrowRef = useRef(null)

  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(8),
      arrow({
        element: arrowRef
      }),
      shift()
    ]
  })
  const id = useId()

  const hover = useHover(context)

  const { getFloatingProps } = useInteractions([hover])
  return (
    <>
      <div className='relative z-10 px-1.5' ref={refs.setReference} id={id}>
        {renderProp}
        <Link to={'#'} className='flex items-center gap-1 hover:brightness-90'>
          <div className={className}>{src ? <img src={src} alt='avatar' /> : iconLeft}</div>
          {name && <span className='text-white'>{name}</span>}
          {iconRight}
        </Link>

        <div
          className={`absolute -right-2 top-5 mr-5 ${renderProp && 'top-10 h-10'} min-w-[75px] bg-transparent p-3`}
        ></div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                right: x != null ? `${5}px` : ''
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
              {...getFloatingProps()}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                width={30}
                fill='white'
                staticOffset={renderProp ? '85%' : '70%'}
              />
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Popper
