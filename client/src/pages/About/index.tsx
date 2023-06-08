import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useRef, MouseEvent } from 'react'
import PageWrapper from '../../components/layout/PageWrapper'

const AboutPage = () => {
  const xPosition = useMotionValue(0)
  const yPosition = useMotionValue(0)
  const opacity = useMotionValue(0)

  const dragConstraintsRef = useRef<HTMLDivElement>(null)

  const mouseMoveHandler = (e: MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e
    const { left, top } = e.currentTarget.getBoundingClientRect()

    const x = clientX - left
    const y = clientY - top

    xPosition.set(x)
    yPosition.set(y)
  }

  return (
    <PageWrapper>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: '100%', transition: { duration: 0.5, delay: 0.2 } }}
        onMouseMove={mouseMoveHandler}
        onHoverStart={() => opacity.set(20)}
        onHoverEnd={() => opacity.set(0)}
        className='h-[calc(100vh_-_128px)] w-full grid place-items-center bg-white overflow-hidden relative '
        ref={dragConstraintsRef}
      >
        <motion.div
          drag
          dragSnapToOrigin
          onDragStart={() => opacity.set(0)}
          onDragEnd={() => opacity.set(20)}
          whileDrag={{
            scale: 1.05,
            transition: { duration: 0.3, ease: 'easeInOut' },
          }}
          dragTransition={{ timeConstant: 1000 }}
          dragConstraints={dragConstraintsRef}
          className='h-max w-max flex flex-col items-center z-50 relative'
        >
          <h1 className='text-8xl'>
            <span className='text-9xl font-title leading-none after:bg-gradient-to-b from-secondary to-white relative after:h-48 after:w-48 after:left-16 after:top-4 after:absolute after:-z-10 after:rounded-full'>
              LOWEL
            </span>
            <span className='text-9xl pr-8'>™</span>With The Best
          </h1>
          <h1 className='text-8xl'>
            Quality In The{' '}
            <span className='underline underline-offset-[16px] leading-none'>Game</span>.
          </h1>
          <p className='absolute -bottom-8 text-white font-medium text-3xl font-main left-0'>
            drag me
          </p>
        </motion.div>
        <motion.div
          className='absolute inset-0 rounded-xl opacity-0 0 duration-300 z-10'
          style={{
            background: useMotionTemplate`radial-gradient(800px circle at ${xPosition}px ${yPosition}px, #1E1E1E, transparent)`,
            opacity: useMotionTemplate`${opacity}%`,
          }}
        ></motion.div>
      </motion.section>
    </PageWrapper>
  )
}

export default AboutPage
