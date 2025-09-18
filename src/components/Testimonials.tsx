import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote: 'Discreción absoluta y propiedades realmente únicas. Novaland superó nuestras expectativas.',
    name: 'A. Martínez',
    role: 'Empresario',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&grayscale'
  },
  {
    id: 2,
    quote: 'La experiencia fue impecable de principio a fin. Un servicio a la altura.',
    name: 'S. Robles',
    role: 'Inversora',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop&grayscale'
  },
  {
    id: 3,
    quote: 'Propiedades de revista y gestión muy profesional. Recomendado para clientes exigentes.',
    name: 'L. Ortega',
    role: 'Arquitecto',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop&grayscale'
  }
]

export function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(id)
  }, [])

  const t = testimonials[index]

  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-serif nv-gold-text text-center">Lo que dicen nuestros clientes</h2>
        <div className="mt-12 mx-auto max-w-3xl">
          <div className="relative rounded-3xl border border-white/10 bg-black/40 p-10 backdrop-blur-xl">
            <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,167,167,0.35), transparent 60%)' }} />
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xl text-white/90 leading-relaxed">“{t.quote}”</p>
                <div className="mt-6 flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover grayscale" />
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-white/60">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}


