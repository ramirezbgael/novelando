import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { type EBProperty, getEBProperty } from '../services/easybroker'

export function ScrollShowcase() {
  const [properties, setProperties] = useState<EBProperty[]>([])
  const [index, setIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch properties from EasyBroker service
  useEffect(() => {
    const showcaseIds = [
      'EB-TR4800',
      'EB-SO8312',
      'EB-QZ3402',
      'EB-QP5485',
      'EB-UG4749',
      'EB-UD7897',
      'EB-TC6356',
      'EB-QP5428',
    ];
    Promise.all(showcaseIds.map(id => getEBProperty(id)))
      .then(results => setProperties(results.filter(Boolean) as EBProperty[]))
      .catch(() => setProperties([]));
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    if (properties.length === 0) return
    intervalRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % properties.length)
    }, 5000)
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [index, properties.length])

  // Manual navigation
  const goPrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + properties.length) % properties.length)
  }, [properties.length])

  const goNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % properties.length)
  }, [properties.length])

  if (properties.length === 0) {
    return (
      <section className="relative bg-ink pt-28 md:pt-40 pb-0 overflow-hidden min-h-[60vh] flex items-center justify-center">
        <div className="text-white/70 text-lg">Cargando propiedades...</div>
      </section>
    )
  }

  const property = properties[index]

  return (
    <section className="relative bg-ink pt-28 md:pt-40 pb-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: 'radial-gradient(1200px 600px at 50% -10%, rgba(0,167,167,0.25), transparent 70%)' }} />
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-serif nv-gold-text">Una inmersión a tu próxima residencia</h2>
          <p className="mt-4 text-white/70">Desliza para acercarte. Imagina llegar a casa.</p>
        </div>
      </div>
      <div className="relative mt-16 h-[120svh]">
        <div className="sticky top-0 h-[100svh] flex items-center justify-center">
          <div className="relative w-screen h-screen rounded-none overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={property.id}
                src={property.photoUrl || '/photos/default.jpg'}
                alt={property.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
            <Link
              to={`/property/${property.id}`}
              className="absolute bottom-8 left-8 bg-black/60 hover:bg-black/80 text-white rounded-xl px-5 py-3 text-sm md:text-base font-semibold shadow-lg transition"
              style={{ textDecoration: 'none' }}
            >
              {property.title} · {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(property.price)}
            </Link>
            {/* Flechas de navegación */}
            <button
              aria-label="Anterior"
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 text-white text-2xl shadow-lg transition z-10"
            >
              ‹
            </button>
            <button
              aria-label="Siguiente"
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 text-white text-2xl shadow-lg transition z-10"
            >
              ›
            </button>
            {/* Indicadores */}
            <div className="absolute bottom-8 right-8 flex gap-2">
              {properties.map((_, i) => (
                <span
                  key={i}
                  className={`block w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


