import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="/photos/tulum_outside.webp"
        alt="Tulum exterior"
        decoding="async"
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
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
          className="mt-4 max-w-xl text-balance text-lg md:text-xl text-white/85 font-serif"
        >
          Expertos en bienes raíces.
        </motion.p>
        <button onClick={() => {
          const el = document.getElementById('propiedades');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }} className="explore text-shadow">
          Explorar Propiedades
        </button>
      </div>
    </section>
  )
}


