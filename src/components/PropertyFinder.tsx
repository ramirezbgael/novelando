import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { listEBProperties, type EBProperty } from '../services/easybroker'

function HouseBuild3D() {
  return (
    <div className="relative" style={{ width: 260, height: 180 }}>
      <div className="absolute inset-0" style={{ filter: 'drop-shadow(0 10px 30px rgba(200,169,106,0.25))' }} />
      {/* Base */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 h-6 w-52 rounded-md nv-gradient-gold"
      />
      {/* Walls */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 90, opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-52 rounded-t-md bg-neutral-900 border-x border-t border-white/10"
      />
      {/* Left wall shading */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 90, opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.7 }}
        className="absolute bottom-12 left-[calc(50%-104px)] w-20 bg-white/5"
      />
      {/* Windows */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} className="absolute bottom-24 left-1/2 -translate-x-1/2 grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-6 w-8 rounded-sm bg-black/60 border border-white/10">
            <div className="h-full w-full bg-rgba(0,167,167,0.25" />
          </div>
        ))}
      </motion.div>
      {/* Roof */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.0, ease: 'easeOut', delay: 2.2 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-[124px] w-64 h-0 border-l-[64px] border-r-[64px] border-b-[40px] border-l-transparent border-r-transparent"
        style={{ borderBottomColor: '#FFD700' }}
      />
      {/* Sparkles */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.6 }} className="absolute -top-1 left-16 h-1 w-1 rounded-full bg-[--color-gold]" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8 }} className="absolute top-2 right-14 h-1 w-1 rounded-full bg-[--color-gold]" />
    </div>
  )
}

export function PropertyFinder() {
  const [bedrooms, setBedrooms] = useState<number>(3)
  const [bathrooms, setBathrooms] = useState<number>(3)
  const [price, setPrice] = useState<number>(8_000_000)
  const [loading, setLoading] = useState<boolean>(false)
  const [resultRemote, setResultRemote] = useState<EBProperty | null>(null)
  const [remotePool, setRemotePool] = useState<EBProperty[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Reinicia el resultado cuando cambian los parámetros
  useEffect(() => {
    setResultRemote(null)
  }, [bedrooms, bathrooms, price])

  const onGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // Try fetching from EasyBroker when we have an API key
      const list = remotePool ?? (await listEBProperties())
      if (list && list.length) {
        setRemotePool(list)
        const ordered = [...list].sort((a, b) => {
          const db = (a.bedrooms ?? 0) - bedrooms
          const dba = (a.bathrooms ?? 0) - bathrooms
          const da = Math.abs(db) * 2 + Math.abs(dba) * 1.5 + Math.abs((a.price - price) / 1_000_000)
          const bb = (b.bedrooms ?? 0) - bedrooms
          const bba = (b.bathrooms ?? 0) - bathrooms
          const dbb = Math.abs(bb) * 2 + Math.abs(bba) * 1.5 + Math.abs((b.price - price) / 1_000_000)
          return da - dbb
        })
        if (!ordered.length) {
          setError('No encontramos propiedades en EasyBroker con esos parámetros.')
        } else {
          const currentIdx = ordered.findIndex((p) => p.id === resultRemote?.id)
          const nextIdx = currentIdx >= 0 ? (currentIdx + 1) % ordered.length : 0
          setResultRemote(ordered[nextIdx])
        }
      } else {
        setError('No encontramos propiedades en EasyBroker.')
      }
    } catch (err: any) {
      console.error('EasyBroker error:', err)
      setError('No pudimos conectarnos a EasyBroker. Intenta más tarde.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-black pt-2 pb-12 md:pt-20 md:pb-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-serif nv-gold-text">Generador de casa ideal</h2>
          <p className="mt-3 text-white/70">Indica recámaras, baños y precio. Te mostraremos la mejor opción.</p>
        </div>

        <form onSubmit={onGenerate} className="mx-auto mt-10 grid max-w-3xl grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <label className="text-sm text-white/70">Recámaras</label>
            <div className="mt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                aria-label="Menos recámaras"
                onClick={() => setBedrooms((v) => Math.max(1, v - 1))}
                className="h-12 w-12 rounded-full border border-white/15 bg-black/40 hover:cursor-pointer text-xl hover:bg-white/10"
              >
                −
              </button>
              <div className="min-w-24 text-center rounded-full border border-white/10 bg-black/50 px-6 py-2 text-lg font-medium">
                {bedrooms}
              </div>
              <button
                type="button"
                aria-label="Más recámaras"
                onClick={() => setBedrooms((v) => Math.min(6, v + 1))}
                className="h-12 w-12 rounded-full border border-white/15 nv-gradient-gold text-black text-xl hover:cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <label className="text-sm text-white/70">Baños</label>
            <div className="mt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                aria-label="Menos baños"
                onClick={() => setBathrooms((v) => Math.max(1, v - 1))}
                className="h-12 w-12 rounded-full border border-white/15 bg-black/40 text-xl hover:cursor-pointer hover:bg-white/10"
              >
                −
              </button>
              <div className="min-w-24 text-center rounded-full border border-white/10 bg-black/50 px-6 py-2 text-lg font-medium">
                {bathrooms}
              </div>
              <button
                type="button"
                aria-label="Más baños"
                onClick={() => setBathrooms((v) => Math.min(5, v + 1))}
                className="h-12 w-12 rounded-full border border-white/15 nv-gradient-gold text-black text-xl hover:cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <label className="text-sm text-white/70">Precio (MXN)</label>
            <input
              type="range"
              min={3_000_000}
              max={60_000_000}
              step={500_000}
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="mt-3 w-full"
              style={{ accentColor: 'var(--color-gold)' }}
            />
            <div className="mt-2 text-sm text-white/80">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(price)}</div>
          </div>
          <div className="md:col-span-3 flex justify-center">
            <button type="submit" className="rounded-full px-6 py-3 nv-gradient-gold text-black font-medium tracking-wide hover:cursor-pointer" disabled={loading}>
              {loading ? 'Construyendo...' : 'Generar casa ideal'}
            </button>
          </div>
        </form>

        <div className="relative mx-auto mt-10 max-w-5xl">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" className="flex h-[52svh] items-center justify-center rounded-3xl border border-white/10 bg-ink" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex flex-col items-center gap-6">
                  <HouseBuild3D />
                  <div className="text-white/80 text-sm">Construyendo tu residencia ideal...</div>
                </div>
              </motion.div>
            )}
            {!loading && error && (
              <motion.div key="error" className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80">
                {error}
              </motion.div>
            )}
            {!loading && resultRemote && (
              <motion.div key={resultRemote.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <Link to={`/property/${encodeURIComponent(resultRemote.id)}`} className="relative rounded-3xl overflow-hidden border border-white/10 bg-ink block">
                  {resultRemote.photoUrl ? (
                    <motion.img
                      src={resultRemote.photoUrl || undefined}
                      alt={resultRemote.title}
                      className="w-full h-[52svh] object-cover"
                      initial={{ opacity: 0.2, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  ) : (
                    <div className="w-full h-[52svh] flex items-center justify-center text-white/50">
                      Sin imagen disponible
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
                </Link>
                <div className="space-y-2">
                  <div className="text-xl font-medium">{resultRemote.title}</div>
                  <div className="text-white/80">{resultRemote.bedrooms ?? '—'} recámaras · {resultRemote.bathrooms ?? '—'} baños</div>
                  <div className="text-white/90 font-semibold">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(resultRemote.price || 0)}</div>
                  <div className="text-white/70 text-base mb-3">
                    {resultRemote.location}
                  </div>
                  <Link to={`/property/${encodeURIComponent(resultRemote.id)}`} className="hover:cursor-pointer inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm backdrop-blur-sm hover:bg-white/10 transition">Ver detalle</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}


