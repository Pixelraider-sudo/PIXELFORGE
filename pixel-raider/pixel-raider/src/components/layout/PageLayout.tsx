import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

export function PageLayout() {
  const { pathname } = useLocation()
  return (
    <div className="flex flex-col min-h-screen bg-pr-bg">
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          id="main-content"
          tabIndex={-1}
          className="flex-1 outline-none"
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
