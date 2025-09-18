import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PROPERTIES } from '../data/properties'
import Navbar from '../components/Navbar'

export default function PropertiesList() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [beds, setBeds] = useState<number>(Number(params.get('beds') ?? 0))
  const [baths, setBaths] = useState<number>(Number(params.get('baths') ?? 0))
  const [minPrice, setMinPrice] = useState<number>(Number(params.get('min') ?? 0))
  const [maxPrice, setMaxPrice] = useState<number>(Number(params.get('max') ?? 0))
  const initialLocs = (params.get('loc') ?? '').split(',').map((s) => s.trim()).filter(Boolean)
  const [selectedLocs, setSelectedLocs] = useState<string[]>(initialLocs)

  const allCities = useMemo(() => {
    const cities = PROPERTIES.map((p) => (p.location.includes(',') ? p.location.split(',')[1]!.trim() : p.location.trim()))
    return Array.from(new Set(cities)).sort()
  }, [])

  const filtered = useMemo(() => {
    return PROPERTIES.filter((p) => {
      const priceNum = Number((p.price.match(/[\d,.]+/g)?.[0] || '0').replace(/[,\s]/g, ''))
      if (query && !(`${p.title} ${p.location}`.toLowerCase().includes(query.toLowerCase()))) return false
      if (beds && p.amenities.bedrooms < beds) return false
      if (baths && p.amenities.bathrooms < baths) return false
      if (minPrice && priceNum < minPrice) return false
      if (maxPrice && priceNum > maxPrice) return false
      if (selectedLocs.length) {
        const city = p.location.includes(',') ? p.location.split(',')[1]!.trim() : p.location.trim()
        if (!selectedLocs.includes(city)) return false
      }
      return true
    })
  }, [query, beds, baths, minPrice, maxPrice, selectedLocs])

  const onApply = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (query) next.q = query
    if (beds) next.beds = String(beds)
    if (baths) next.baths = String(baths)
    if (minPrice) next.min = String(minPrice)
    if (maxPrice) next.max = String(maxPrice)
    if (selectedLocs.length) next.loc = selectedLocs.join(',')
    setParams(next)
  }

  return (
    <section className="bg-black pt-24 md:pt-28 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-serif nv-gold-text">Todas las propiedades</h1>

        {/* Filtros */}
        <form onSubmit={onApply} className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="text-xs text-white/60">Búsqueda</label>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Metepec, San Carlos..." className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" />
          </div>
          <div>
            <label className="text-xs text-white/60">Ubicación</label>
            <select
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20"
              value=""
              onChange={(e) => {
                const city = e.target.value
                if (city && !selectedLocs.includes(city)) setSelectedLocs((s) => [...s, city])
              }}
            >
              <option value="">Agregar ciudad…</option>
              {allCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/60">Recámaras</label>
            <input value={beds || ''} onChange={(e) => setBeds(Number(e.target.value) || 0)} type="number" min={0} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" />
          </div>
          <div>
            <label className="text-xs text-white/60">Baños</label>
            <input value={baths || ''} onChange={(e) => setBaths(Number(e.target.value) || 0)} type="number" min={0} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" />
          </div>
          <div>
            <label className="text-xs text-white/60">Precio mín (MXN)</label>
            <input value={minPrice || ''} onChange={(e) => setMinPrice(Number(e.target.value) || 0)} type="number" min={0} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" />
          </div>
          <div>
            <label className="text-xs text-white/60">Precio máx (MXN)</label>
            <input value={maxPrice || ''} onChange={(e) => setMaxPrice(Number(e.target.value) || 0)} type="number" min={0} className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-white/20" />
          </div>
          <div className="md:col-span-6 flex gap-2 flex-wrap items-center">
            {selectedLocs.map((c) => (
              <button key={c} type="button" onClick={() => setSelectedLocs((s) => s.filter((x) => x !== c))} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm hover:bg-white/10">
                <span className="nv-icon"><i className="fa-solid fa-location-dot" /></span>
                {c}
                <span className="text-white/50">×</span>
              </button>
            ))}
            {selectedLocs.length > 0 && (
              <button type="button" onClick={() => setSelectedLocs([])} className="rounded-full px-3 py-1 border border-white/15 text-xs text-white/70 hover:bg-white/10">Limpiar ubicaciones</button>
            )}
          </div>
          <div className="md:col-span-6 flex gap-2">
            <button type="submit" className="rounded-full px-5 py-2 nv-gradient-gold text-black text-sm font-medium shadow-[0_6px_20px_rgba(98,180,155,0.35)]">Aplicar</button>
            <button type="button" onClick={() => { setQuery(''); setBeds(0); setBaths(0); setMinPrice(0); setMaxPrice(0); setParams({}); setSelectedLocs([]) }} className="rounded-full px-5 py-2 border border-white/15 text-sm text-white/80 hover:bg-white/10">Limpiar</button>
          </div>
        </form>

        {/* Listado */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <Link key={p.id} to={`/property/${p.id}`} className="group block relative overflow-hidden rounded-2xl bg-carbon ring-1 ring-white/5 hover:ring-white/10 transition">
              <img src={p.gallery[0]} alt={p.title} className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="p-4">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-white/70">{p.location}</div>
                <div className="mt-2 nv-gold-text font-semibold">{p.price}</div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="text-white/70">No encontramos propiedades con esos filtros.</div>
          )}
        </div>
      </div>
    </section>
  )
}


