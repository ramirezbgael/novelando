import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function ScrollShowcase() {
  // Create a tall scroll area and pin the visual to the viewport for a "linger" effect
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  // Approach, then linger full-screen for a few scroll lines (shorter trail)
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [0.8, 1.2, 1.2, 1.22])
  const y = useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [80, 0, 0, -10])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.95])

  return (
    <section className="relative bg-ink pt-28 md:pt-40 pb-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: 'radial-gradient(1200px 600px at 50% -10%, rgba(0,167,167,0.25), transparent 70%)' }} />
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-serif nv-gold-text">Una inmersión a tu próxima residencia</h2>
          <p className="mt-4 text-white/70">Desliza para acercarte. Imagina llegar a casa.</p>
        </div>
      </div>

      {/* Tall area + sticky full-screen stage to linger */}
      <div ref={ref} className="relative mt-16 h-[120svh]">
        <div className="sticky top-0 h-[100svh] flex items-center justify-center">
          <motion.div style={{ scale, y, opacity }} className="relative w-screen h-screen rounded-none overflow-hidden shadow-2xl">
            <img
              src="/photos/tulum_inside.webp"
              alt="Luxury Villa"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}


