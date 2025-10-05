import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaDollarSign, FaIndustry, FaHome, FaArrowLeft } from 'react-icons/fa'
import { resetPropertyFilters } from '../utils/propertyFilters'

export function Hero() {
  const images = ['/photos/tulum_outside.webp', '/photos/tulum_inside.webp', '/photos/sanmateo_outside.jpg', '/photos/sanmateo_inside.png']
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[current]}
            className="absolute inset-0 h-full w-full object-cover"
            src={images[current]}
            alt="Fondo Novaland"
            decoding="async"
            loading={current === 0 ? 'eager' : 'lazy'}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.08 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.6, ease: 'easeOut' },
              scale: { duration: 7, ease: 'linear' },
            }}
          />
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <img src="/photos/logo.png" alt="Novaland" className="w-48 h-32" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-display text-5xl md:text-8xl tracking-[0.08em] nv-gold-text hero-text" 
        >
          NOVALAND
        </motion.h1>
        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
          className="mt-4 max-w-xl text-balance text-xl md:text-2xl montserrat font-bold text-shadow-md"
        >
          BIENES RAÍCES <br /> ASESORES - CONSULTORES
        </motion.p>
        <div className="mt-8 mb-10 flex items-center gap-2 md:gap-3">
          <Link
            to="/properties#industrial"
            onClick={()=>{
              resetPropertyFilters()
            }}
            className="inline-flex items-center rounded-full border border-green-400/30 bg-gradient-to-r from-green-400/10 to-white/5 px-4 py-2 text-xs md:text-sm font-semibold text-green-300 hover:bg-green-400/20 hover:text-green-100 transition shadow"
          >
            <FaArrowLeft className="w-4 h-4 mr-2 hidden md:inline" />
            <FaIndustry size={14} className="opacity-90 md:mr-2" />
            <span className="hidden md:inline">Industrial</span>
          </Link>
          <Link
            to="/properties#habitacional"
            onClick={()=>{
              resetPropertyFilters()
            }}
            className="inline-flex items-center rounded-full border border-green-400/30 bg-gradient-to-r from-green-400/10 to-white/5 px-6 py-3 text-xs md:text-sm font-semibold text-green-300 hover:bg-green-400/20 hover:text-green-100 transition shadow"
          >
            <FaArrowLeft className="w-4 h-4 mr-2 hidden md:inline" />
            <FaHome size={22} className="opacity-90 mr-2 mb-1" />
            <span>Habitacional</span>
          </Link>
          <Link
            to="/properties#comercial"
            onClick={()=>{
              resetPropertyFilters()
            }}
            className="inline-flex items-center rounded-full border border-green-400/30 bg-gradient-to-r from-green-400/10 to-white/5 px-4 py-2 text-xs md:text-sm font-semibold text-green-300 hover:bg-green-400/20 hover:text-green-100 transition shadow"
          >
            <FaArrowLeft className="w-4 h-4 mr-2 hidden md:inline" />
            <FaDollarSign size={14} className="opacity-90 md:mr-2" />
            <span className="hidden md:inline">Comercial</span>
          </Link>
        </div>
      </div>
    </section>
  )
}


