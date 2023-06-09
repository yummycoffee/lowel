import { motion, useMotionTemplate } from 'framer-motion'
import useElementBackground from '../../hooks/useElementBackground'

type ShopNowButtonProps = React.ComponentProps<'button'>

const ShopNowButton = ({ onClick }: ShopNowButtonProps) => {
  const [mouseMoveHandler, xPosition, yPosition] = useElementBackground()

  return (
    <motion.button
      className='font-title bg-white w-60 py-8 text-4xl rounded-2xl border-2 border-accent shadow-main duration-200 transition-shadow relative overflow-hidden group'
      transition={{ duration: 0.1 }}
      onMouseMove={mouseMoveHandler}
      whileTap={{
        y: 2,
        boxShadow: '0px 1px 0px #000000',
      }}
      onClick={onClick}
    >
      <motion.div
        className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 duration-300'
        style={{
          background: useMotionTemplate`radial-gradient(200px circle at ${xPosition}px ${yPosition}px, #1E1E1E, transparent)`,
        }}
      ></motion.div>
      SHOP NOW
    </motion.button>
  )
}

export default ShopNowButton
