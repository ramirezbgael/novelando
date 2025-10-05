import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { listEBProperties, type EBProperty } from '../services/easybroker'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, Html } from '@react-three/drei'

function HouseModel() {
  const group = useRef<any>(null) // Fix: useRef<any> to avoid TS error
  // Rotar suavemente sobre el eje Y
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group ref={group} scale={1.7} position={[0, 0.2, 0]}>
      {/* Base */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[2.8, 0.18, 2]} />
        <meshStandardMaterial color="#009e3c" metalness={0.55} roughness={0.25} />
      </mesh>
      {/* Walls */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[2.4, 1.1, 1.4]} />
        <meshStandardMaterial color="#1de950" roughness={0.35} />
      </mesh>
      {/* Windows */}
      <mesh position={[-0.65, 0.4, 0.73]}>
        <boxGeometry args={[0.38, 0.38, 0.04]} />
        <meshStandardMaterial color="#00ffb3" emissive="#00ffb3" emissiveIntensity={0.28} transparent opacity={0.95} />
      </mesh>
      <mesh position={[0.65, 0.4, 0.73]}>
        <boxGeometry args={[0.38, 0.38, 0.04]} />
        <meshStandardMaterial color="#00ffb3" emissive="#00ffb3" emissiveIntensity={0.28} transparent opacity={0.95} />
      </mesh>
      {/* Door */}
      <mesh position={[0, -0.12, 0.73]}>
        <boxGeometry args={[0.32, 0.55, 0.04]} />
        <meshStandardMaterial color="#007a2f" roughness={0.25} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 1.25, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.85, 0.9, 4]} />
        <meshStandardMaterial color="#00c853" metalness={0.7} roughness={0.18} />
      </mesh>
      {/* Chimney */}
      <mesh position={[-0.5, 1.25, -0.25]}>
        <boxGeometry args={[0.13, 0.32, 0.13]} />
        <meshStandardMaterial color="#00e676" />
      </mesh>
      {/* Sparkles */}
      <mesh position={[1, 1.6, 0]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial emissive="#00ff00" emissiveIntensity={2.2} color="#00ff00" />
      </mesh>
      <mesh position={[-0.9, 1.7, 0.4]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial emissive="#00ff00" emissiveIntensity={1.7} color="#00ff00" />
      </mesh>
    </group>
  )
}

function HouseBuild3D() {
  return (
    <div style={{ width: 620, height: 320 }}>
      <Canvas camera={{ position: [0, 1.5, 5], fov: 38 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <Stage environment="city" intensity={0.5} shadows={false}>
          <group scale={1} position={[0, 0, 0]}>
            <HouseModel />
          </group>
        </Stage>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.7} minPolarAngle={Math.PI / 3.2} maxPolarAngle={Math.PI / 2.1} />
        <Html position={[0, -1.2, 0]}>
          <div style={{ textAlign: 'center', color: '#FFD700', fontWeight: 600, textShadow: '0 2px 8px #0008', fontSize: 18 }}>
            {/* Opcional: texto debajo de la casa */}
          </div>
        </Html>
      </Canvas>
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
    <section className="relative bg-black pt-2 pb-12 md:pt-20 md:pb-16 overflow-hidden">
      {/* 3D House background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="opacity-25">
          <HouseBuild3D />
        </div>
      </div>
      <div className="relative z-10 container mx-auto px-6">
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


