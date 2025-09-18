import { useMemo, useEffect, useState } from 'react'
import type React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import type { PanInfo } from 'framer-motion'
import { getPropertyById, PROPERTIES, type PropertyRecord } from '../data/properties'
import { Footer } from '../components/Footer.tsx'
import Navbar from '../components/Navbar.tsx'

function Amenity({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm">
      <span className="nv-icon inline-flex items-center justify-center"><i>{icon}</i></span>
      <span className="text-white/85">{label}</span>
    </div>
  )
}

export default function Property() {
  const params = useParams()
  const id = Number(params.id)
  const property = useMemo(() => getPropertyById(id), [id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!property) {
    return (
      <section className="bg-black min-h-[80svh] flex items-center">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl mb-4">Propiedad no encontrada</div>
          <Link to="/" className="underline">Regresar</Link>
        </div>
      </section>
    )
  }

  const number = (import.meta.env.VITE_WHATSAPP as string | undefined)?.replace(/[^\d]/g, '') || '5215555555555'
  const msg = encodeURIComponent(`Hola Novaland, me interesa la propiedad ${property.title} en ${property.location}.`)
  const waHref = `https://wa.me/${number}?text=${msg}`

  // Calendly URL (habilitar si se usa el embed)
  // const calendlyUrl = (import.meta.env.VITE_CALENDLY as string | undefined) || 'https://calendly.com/'

  const a = property.amenities
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showPurchase, setShowPurchase] = useState<boolean>(false)
  const [showSchedule, setShowSchedule] = useState<boolean>(false)

  const FALLBACK_IMG = '/photos/tulum_outside.webp'
  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    if (img.src.endsWith(FALLBACK_IMG)) return
    img.src = FALLBACK_IMG
    // prevent infinite loop
    img.onerror = null
  }
  const totalImages = property.gallery.length
  const goPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setLightboxIndex((i) => {
      if (i === null) return 0
      return (i - 1 + totalImages) % totalImages
    })
  }
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const threshold = 80
    const velocityThreshold = 500
    if (offset.x < -threshold || velocity.x < -velocityThreshold) {
      goNext()
    } else if (offset.x > threshold || velocity.x > velocityThreshold) {
      goPrev()
    }
  }
  const goNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setLightboxIndex((i) => {
      if (i === null) return 0
      return (i + 1) % totalImages
    })
  }

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex])

  return (
    <section className="bg-black pt-24  md:pt-28 ">
      <Navbar />
      <div className="container mx-auto px-6">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-serif text-white">{property.title}</h1>
            <div className="mt-2 text-white/70">{property.location}</div>
          </div>
          <div className="text-xl font-medium nv-gold-text">{property.price}</div>
        </div>

        {/* Gallery */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <motion.img
            key={property.gallery[0]}
            src={property.gallery[0]}
            alt={property.title}
            className="md:col-span-2 h-[44svh] md:h-[56svh] w-full object-cover rounded-2xl border border-white/10 cursor-zoom-in"
            initial={{ opacity: 0.2, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            onClick={() => setLightboxIndex(0)}
            onError={onImgError}
            loading="lazy"
          />
          <div className="grid grid-rows-2 gap-3">
            {property.gallery.slice(1, 3).map((src, i) => (
              <div key={src + i} className="relative" onClick={() => setLightboxIndex(i + 1)}>
                <motion.img
                  src={src}
                  alt={`${property.title} ${i + 2}`}
                  className="h-[21svh] md:h-[27svh] w-full object-cover rounded-2xl border border-white/10 cursor-zoom-in"
                  initial={{ opacity: 0.2, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 * (i + 1) }}
                  onError={onImgError}
                  loading="lazy"
                />
                {i === 1 && totalImages > 3 && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black/45 text-white text-sm md:text-base font-medium">
                    +{totalImages - 3} fotos
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center"
              onClick={() => setLightboxIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className="relative w-[100vw] max-w-[100vw] md:max-w-[92vw] px-3 md:px-0"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  className="relative"
                >
                  <img
                    src={property.gallery[lightboxIndex]}
                    alt={`${property.title} ampliada`}
                    className="max-h-[90svh] w-full md:w-auto object-contain rounded-xl border border-white/10 shadow-2xl mx-auto"
                  />
                </motion.div>
                {/* Controls (fixed, discretos) */}
                <button
                  aria-label="Anterior"
                  onClick={goPrev}
                  className="fixed left-1 md:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center h-24 w-9 md:h-24 md:w-12 rounded-full bg-white/20 hover:bg-white/25 border border-white/30 text-white text-3xl md:text-4xl shadow-lg backdrop-blur-sm"
                >
                  ‹
                </button>
                <button
                  aria-label="Siguiente"
                  onClick={goNext}
                  className="fixed right-1 md:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center h-24 w-9 md:h-24 md:w-12 rounded-full bg-white/20 hover:bg-white/25 border border-white/30 text-white text-3xl md:text-4xl shadow-lg backdrop-blur-sm"
                >
                  ›
                </button>
                <button
                  aria-label="Cerrar"
                  onClick={() => setLightboxIndex(null)}
                  className="absolute -top-3 -right-3 rounded-full nv-gradient-gold text-black px-3 py-1 text-sm shadow"
                >
                  X
                </button>
                {/* Thumbnails row */}
                <div className="mt-3 md:mt-4 px-1">
                  <div className="flex items-center gap-2 overflow-x-auto nv-scroll-hide max-w-[100vw] md:max-w-[92vw]">
                    {property.gallery.map((src, i) => (
                      <button
                        key={src + i}
                        aria-label={`Ver foto ${i + 1}`}
                        onClick={() => setLightboxIndex(i)}
                        className={`shrink-0 rounded-md overflow-hidden border ${i === lightboxIndex ? 'border-white/60' : 'border-white/10'} hover:border-white/40`}
                        style={{ width: 56, height: 56 }}
                      >
                        <img src={src} alt="miniatura" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Amenities */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Amenity icon={<i className="fa-solid fa-bed" />} label={`${a.bedrooms} recámaras`} />
          <Amenity icon={<i className="fa-solid fa-toilet" />} label={`${a.bathrooms} baños`} />
          <Amenity icon={<i className="fa-solid fa-square-parking" />} label={`${a.parkingSpots} cajones`} />
          <Amenity icon={<i className="fa-solid fa-kitchen-set" />} label={`Cocina ${a.integralKitchen ? 'integral' : 'no integral'}`} />
          <Amenity icon={<i className="fa-solid fa-fire" />} label={`Gas ${a.naturalGas ? 'natural' : 'LP'}`} />
          <Amenity icon={<i className="fa-solid fa-house-chimney" />} label={`${a.patio ? 'Con patio' : 'Sin patio'}`} />
          <Amenity icon={<i className="fa-solid fa-ruler-combined" />} label={`${a.sizeM2} m²`} />
          <Amenity icon={<i className="fa-solid fa-building" />} label={`${a.floors} pisos`} />
        </div>

        {/* Map and nearby POIs */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border border-white/10 overflow-hidden nv-map-dark">
            <iframe
              title="Mapa"
              className="w-full h-[50svh]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&hl=es&z=15&output=embed`}
            />
          </div>
          <div className="flex flex-col gap-3 h-[50svh]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex-none">
              <div className="text-white/80 mb-3 flex items-center gap-2">
                <span className="nv-icon"><i className="fa-solid fa-location-dot" /></span>
                Amenidades cercanas
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: 'fa-school', label: 'Escuelas' },
                  { icon: 'fa-cart-shopping', label: 'Supermercados' },
                  { icon: 'fa-tree', label: 'Parques' },
                  { icon: 'fa-dumbbell', label: 'Gimnasios' },
                  { icon: 'fa-mug-saucer', label: 'Cafés' },
                  { icon: 'fa-hospital', label: 'Hospitales' },
                ].map((t) => (
                  <button key={t.label} className="rounded-full px-3 py-1 text-sm border border-white/15 hover:bg-white/10 inline-flex items-center gap-2">
                    <span className="nv-icon"><i className={`fa-solid ${t.icon}`} /></span>
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="mt-3 text-sm text-white/70">Explora servicios y puntos de interés alrededor de la propiedad.</div>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <button
                type="button"
                onClick={() => setShowPurchase(true)}
                className="flex-none inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm md:text-base text-white/90 hover:bg-white/10 backdrop-blur-md shadow-sm transition"
              >
                <span className="nv-icon"><i className="fa-solid fa-bag-shopping" /></span>
                Comprar ahora
              </button>
              <button
                type="button"
                onClick={() => setShowSchedule(true)}
                className="agendar rounded-2xl px-6 py-4 nv-gradient-gold text-black font-medium tracking-wide text-center flex-1 flex items-center justify-center shadow-[0_10px_40px_rgba(98,180,155,0.35)] hover:brightness-105 transition"
              >
                <span className="nv-icon"><i className="fa-solid fa-calendar-check" /></span>
                <span className="ml-2">Agenda una visita</span>
              </button>
            </div>

          </div>

        </div>

        {/* Calendly 
        <div className="mt-10 rounded-2xl border border-white/10 overflow-hidden">
          <div className="px-5 py-4 text-white/80">Agenda una visita</div>
          <iframe
            title="Calendly"
            src={calendlyUrl}
            className="w-full h-[70svh] bg-black"
          />
        </div>
        */}

        {/* WhatsApp CTA
        
        <div className="mt-8 flex justify-center mt-25 m-25 flex-col items-center">
          <div className="text-white/80 mb-4">Tu nuevo hogar a un mensaje de distancia.</div>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full px-7 py-4 nv-gradient-gold text-black font-medium tracking-wide leading-none"
            style={{ boxShadow: '0 10px 40px rgba(98, 180, 155, 0.35)' }}
          >
            <img src="/photos/whatsapp.png" alt="WhatsApp" className="h-6 w-6 -mt-0.5 object-contain" />
            Escribir por WhatsApp
          </a>
        </div>
        */}
        
      </div>
      {/* Descripciones cortas */}
      <div className="mt-16 md:mt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0,1,2].map((col) => (
              <div key={col} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <img src={property.gallery[(col+1) % property.gallery.length]} alt="destacada" className="h-48 w-full object-cover" />
                <div className="p-4">
                  <div className="text-lg font-medium">{col===0 ? 'Arquitectura' : col===1 ? 'Acabados' : 'Ubicación'}</div>
                  <p className="mt-2 text-white/70 text-sm">
                    {col===0 && 'Diseño contemporáneo con espacios luminosos y flujo funcional.'}
                    {col===1 && 'Materiales de calidad: carpintería, pisos y herrajes premium.'}
                    {col===2 && 'Zona conectada a servicios, escuelas y áreas verdes.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Propiedades similares */}
      <div className="mt-16 md:mt-20">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl md:text-4xl font-serif nv-gold-text">Propiedades similares</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getSimilar(property.id).map((p) => (
              <Link key={p.id} to={`/property/${p.id}`} className="group block relative overflow-hidden rounded-2xl bg-carbon ring-1 ring-white/5 hover:ring-white/10 transition">
                <img src={p.gallery[0]} alt={p.title} className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="p-4">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-white/70">{p.location}</div>
                  <div className="mt-2 nv-gold-text font-semibold">{p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Propiedades cercanas */}
      <div className="mt-16 md:mt-20 mb-12 md:mb-20">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-serif nv-gold-text">Propiedades cercanas a mí</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getNearby(property.id).map((p) => (
              <Link key={p.id} to={`/property/${p.id}`} className="group block relative overflow-hidden rounded-2xl bg-carbon ring-1 ring-white/5 hover:ring-white/10 transition">
                <img src={p.gallery[0]} alt={p.title} className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="p-4">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-white/70">{p.location}</div>
                  <div className="mt-2 nv-gold-text font-semibold">{p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      {/* Purchase modal */}
      <AnimatePresence>
        {showPurchase && (
          <motion.div
            key="purchase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setShowPurchase(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-ink p-5 md:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-lg font-medium mb-2">Comprar ahora</div>
              <p className="text-sm text-white/70 mb-4">Completa los datos para pagar con tarjeta.</p>
              <form className="space-y-3">
                <div>
                  <label className="text-xs text-white/60">Nombre en la tarjeta</label>
                  <input className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" placeholder="Tu nombre" required />
                </div>
                <div>
                  <label className="text-xs text-white/60">Número de tarjeta</label>
                  <input inputMode="numeric" pattern="[0-9 ]*" className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" placeholder="4242 4242 4242 4242" required />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-white/60">Expira</label>
                    <input className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" placeholder="MM/AA" required />
                  </div>
                  <div>
                    <label className="text-xs text-white/60">CVC</label>
                    <input className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" placeholder="123" required />
                  </div>
                  <div className="hidden md:block" />
                </div>
                <div className="flex items-center gap-3 py-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <div className="text-white/50 text-xs">o</div>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-sm mb-1">¿Prefieres otro método?</div>
                  <div className="text-xs text-white/70">Habla con un asesor para conocer transferencias, SPEI o planes.</div>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 nv-gradient-gold text-black text-sm font-medium shadow-[0_6px_20px_rgba(98,180,155,0.35)]">
                    <i className="fa-brands fa-whatsapp" /> Contactar asesor
                  </a>
                </div>
                <div className="pt-1 flex items-center justify-end gap-2">
                  <button type="button" onClick={() => setShowPurchase(false)} className="rounded-full px-4 py-2 border border-white/15 text-sm text-white/80 hover:bg-white/10">Cancelar</button>
                  <button type="submit" className="rounded-full px-5 py-2 nv-gradient-gold text-black text-sm font-medium shadow-[0_6px_20px_rgba(98,180,155,0.35)]">Pagar</button>
                </div>
              </form>
              <button aria-label="Cerrar" onClick={() => setShowPurchase(false)} className="absolute -top-3 -right-3 rounded-full nv-gradient-gold text-black px-3 py-1 text-sm shadow">X</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule modal */}
      <AnimatePresence>
        {showSchedule && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={() => setShowSchedule(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="relative w-full max-w-xl md:max-w-2xl rounded-2xl border border-white/10 bg-ink p-5 md:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-lg font-medium mb-2">Agendar visita</div>
              <p className="text-sm text-white/70 mb-4">Selecciona fecha y hora, y déjanos tus datos.</p>
              <ScheduleForm onClose={() => setShowSchedule(false)} />
              <button aria-label="Cerrar" onClick={() => setShowSchedule(false)} className="absolute -top-3 -right-3 rounded-full nv-gradient-gold text-black px-3 py-1 text-sm shadow">X</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function ScheduleForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onClose()
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="md:col-span-2">
        <label className="text-xs text-white/60">Nombre completo</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" placeholder="Tu nombre" />
      </div>
      <div>
        <label className="text-xs text-white/60">Teléfono</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" placeholder="55 1234 5678" />
      </div>
      <div>
        <label className="text-xs text-white/60">Correo (opcional)</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" placeholder="tucorreo@dominio.com" />
      </div>
      <div>
        <label className="text-xs text-white/60">Fecha</label>
        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" required className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" />
      </div>
      <div>
        <label className="text-xs text-white/60">Hora</label>
        <input value={time} onChange={(e) => setTime(e.target.value)} type="time" required className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" />
      </div>
      <div className="md:col-span-2 flex items-center justify-end gap-2 pt-1">
        <button type="button" onClick={onClose} className="rounded-full px-4 py-2 border border-white/15 text-sm text-white/80 hover:bg-white/10">Cancelar</button>
        <button type="submit" className="rounded-full px-5 py-2 nv-gradient-gold text-black text-sm font-medium shadow-[0_6px_20px_rgba(98,180,155,0.35)]">Enviar</button>
      </div>
    </form>
  )
}

function getSimilar(currentId: number): PropertyRecord[] {
  const current = PROPERTIES.find((p) => p.id === currentId)
  if (!current) return []
  // Heurística simple: misma ciudad y +/-1 recámara, orden por diferencia de tamaño
  const city = current.location.split(',')[1]?.trim() || ''
  return PROPERTIES
    .filter((p) => p.id !== currentId)
    .filter((p) => p.location.includes(city))
    .sort((a, b) => Math.abs(a.amenities.sizeM2 - current.amenities.sizeM2) - Math.abs(b.amenities.sizeM2 - current.amenities.sizeM2))
    .slice(0, 3)
}

function getNearby(currentId: number): PropertyRecord[] {
  const current = PROPERTIES.find((p) => p.id === currentId)
  if (!current) return []
  const d = (a: PropertyRecord, b: PropertyRecord) => {
    const dx = a.coordinates.lat - b.coordinates.lat
    const dy = a.coordinates.lng - b.coordinates.lng
    return Math.hypot(dx, dy)
  }
  return PROPERTIES
    .filter((p) => p.id !== currentId)
    .sort((a, b) => d(a, current) - d(b, current))
    .slice(0, 3)
}


