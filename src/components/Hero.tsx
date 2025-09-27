import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaDollarSign, FaIndustry, FaHome } from 'react-icons/fa'

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
            className="inline-flex items-center gap-2 h-6 border-none px-5 rounded-3xl text-sm md:text-base font-medium text-white bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-600 shadow-[0_10px_30px_rgba(1,84,38,0.35)] ring-0 ring-white/15 hover:brightness-110 transition"
          >
            <FaIndustry size={14} className="opacity-90" />
            <span>Industrial</span>
          </Link>
          <Link
            to="/properties#habitacional"
            className="inline-flex items-center gap-2 h-6 md:h-11 px-6 md:px-8 rounded-4xl text-sm md:text-base font-semibold text-white bg-gradient-to-r from-green-600 via-emerald-500 to-green-500 shadow-[0_12px_34px_rgba(1,84,38,0.45)] ring-0 ring-white/20 hover:brightness-110 transition"
          >
            <FaHome size={14} className="opacity-90" />
            <span>Habitacional</span>
          </Link>
          <Link
            to="/properties#comercial"
            className="inline-flex items-center gap-2 h-7 px-5 rounded-4xl text-sm md:text-base font-medium text-white bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-600 shadow-[0_10px_30px_rgba(1,84,38,0.35)] ring-0 hover:brightness-110 transition"
          >
            <FaDollarSign size={14} className="opacity-90" />
            <span>Comercial</span>
          </Link>
        </div>
      </div>
    </section>
  )
}


