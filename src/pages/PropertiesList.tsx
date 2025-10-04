import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { listEBPropertiesPaged, type EBProperty } from '../services/easybroker'
import Navbar from '../components/Navbar'
import { Footer } from '../components/Footer'
import { resetPropertyFilters } from '../utils/propertyFilters'

export default function PropertiesList() {
  const [params, setParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [beds, setBeds] = useState<number>(Number(params.get('beds') ?? 0))
  const [baths, setBaths] = useState<number>(Number(params.get('baths') ?? 0))
  const [minPrice, setMinPrice] = useState<number>(Number(params.get('min') ?? 0))
  const [maxPrice, setMaxPrice] = useState<number>(Number(params.get('max') ?? 0))
  const [propertyType, setPropertyType] = useState<string>(params.get('type') ?? '')
  const initialLocs = (params.get('loc') ?? '').split(',').map((s) => s.trim()).filter(Boolean)
  const [selectedLocs, setSelectedLocs] = useState<string[]>(initialLocs)
  const [initialLoading, setInitialLoading] = useState<boolean>(false)
  const [fetchingMore, setFetchingMore] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<EBProperty[]>([])
  const [page, setPage] = useState<number>(1)
  const [bootstrapped, setBootstrapped] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const mergeUniqueById = (existing: EBProperty[], incoming: EBProperty[]): EBProperty[] => {
    const seen = new Set(existing.map((p) => p.id))
    const merged = existing.slice()
    for (const p of incoming) {
      if (!seen.has(p.id)) {
        merged.push(p)
        seen.add(p.id)
      }
    }
    return merged
  }

  useEffect(() => {
    const savedFilters = localStorage.getItem('propertyFilters');
    if (savedFilters) {
      const filters = JSON.parse(savedFilters);
      if (filters.query !== undefined) setQuery(filters.query);
      if (filters.beds !== undefined) setBeds(filters.beds);
      if (filters.baths !== undefined) setBaths(filters.baths);
      if (filters.minPrice !== undefined) setMinPrice(filters.minPrice);
      if (filters.maxPrice !== undefined) setMaxPrice(filters.maxPrice);
      if (filters.selectedLocs !== undefined) setSelectedLocs(filters.selectedLocs);
      if (filters.propertyType !== undefined) setPropertyType(filters.propertyType);
    }
    const savedScroll = localStorage.getItem('propertyScroll');
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
    }
  }, []);

  // Evita saltos por hash (#habitacional) y restauración automática del scroll
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    if (location.hash) {
      navigate(`${location.pathname}${location.search}`, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let mounted = true
    setInitialLoading(true)
    setError(null)
    // Reset list when filters in URL change
    setItems([])
    setPage(1)
    setHasMore(true)
    setBootstrapped(false)
    listEBPropertiesPaged({ page: 1, limit: 30 })
      .then((res) => {
        if (!mounted) return
        setItems((prev) => mergeUniqueById(prev, res.items))
        setHasMore(Boolean(res.nextPage))
        setPage(res.nextPage ?? 2)
        setBootstrapped(true)
      })
      .catch(() => {
        console.error('EasyBroker list error')
        if (!mounted) return
        setError('No pudimos cargar propiedades en este momento.')
      })
      .finally(() => mounted && setInitialLoading(false))
    return () => { mounted = false }
  }, [params])

  // Infinite loader
  useEffect(() => {
    if (!hasMore || !bootstrapped || initialLoading) return
    const sentinel = document.getElementById('nv-infinite-sentinel')
    if (!sentinel) return
    const io = new IntersectionObserver((entries) => {
      const e = entries[0]
      if (e.isIntersecting) {
        // Guard against double-requests
        if (fetchingMore) return
        io.unobserve(sentinel)
        setFetchingMore(true)
        listEBPropertiesPaged({ page: page, limit: 50 })
          .then((res) => {
            setItems((prev) => mergeUniqueById(prev, res.items))
            setHasMore(Boolean(res.nextPage))
            setPage(res.nextPage ?? page)
          })
          .catch(() => setError('No pudimos cargar más propiedades.'))
          .finally(() => {
            setFetchingMore(false)
            // Re-observe for next batch if there are more pages
            if (hasMore && document.getElementById('nv-infinite-sentinel')) {
              io.observe(document.getElementById('nv-infinite-sentinel')!)
            }
          })
      }
    }, { rootMargin: '400px 0px' })
    io.observe(sentinel)
    return () => io.disconnect()
  }, [page, hasMore, fetchingMore, bootstrapped, initialLoading])

  const allCities = useMemo(() => {
    const cities = items.map((p) => (p.location.includes(',') ? p.location.split(',')[1]!.trim() : p.location.trim()))
    return Array.from(new Set(cities)).sort()
  }, [items])

  const allTypes = useMemo(() => {
    const types = items.map((p) => (p.propertyType ? p.propertyType.trim() : '')).filter(Boolean)
    return Array.from(new Set(types)).sort()
  }, [items])

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const priceNum = Number(p.price || 0)
      if (query && !(`${p.title} ${p.location}`.toLowerCase().includes(query.toLowerCase()))) return false
      if (beds && (p.bedrooms ?? 0) < beds) return false
      if (baths && (p.bathrooms ?? 0) < baths) return false
      if (minPrice && priceNum < minPrice) return false
      if (maxPrice && priceNum > maxPrice) return false
      if (propertyType && !(p.propertyType || '').toLowerCase().includes(propertyType.toLowerCase())) return false
      if (selectedLocs.length) {
        const city = p.location.includes(',') ? p.location.split(',')[1]!.trim() : p.location.trim()
        if (!selectedLocs.includes(city)) return false
      }
      return true
    })
  }, [items, query, beds, baths, minPrice, maxPrice, selectedLocs, propertyType])

  const onApply = (e: React.FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (query) next.q = query
    if (beds) next.beds = String(beds)
    if (baths) next.baths = String(baths)
    if (minPrice) next.min = String(minPrice)
    if (maxPrice) next.max = String(maxPrice)
    if (selectedLocs.length) next.loc = selectedLocs.join(',')
    if (propertyType) next.type = propertyType
    setParams(next, { replace: true })
  }

  // Ejemplo al navegar a la propiedad
  const handlePropertyClick = (id: string) => {
    localStorage.setItem('propertyFilters', JSON.stringify({
      query,
      beds,
      baths,
      minPrice,
      maxPrice,
      selectedLocs,
      propertyType,
    }));
    localStorage.setItem('propertyScroll', window.scrollY.toString());
    navigate(`/property/${id}`);
  };

  return (
    <section className="bg-black pt-24 md:pt-28 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-serif nv-gold-text drop-shadow-[0_2px_16px_rgba(3,213,98,0.35)]">Todas las propiedades</h1>

        {/* Filtros */}
        <form onSubmit={onApply} className="mt-6 grid grid-cols-2 md:grid-cols-7 gap-3 items-end">
          <div className="md:col-span-2">
            <label className="text-xs text-white/70">Búsqueda</label>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Metepec, San Carlos..." className="mt-1 w-full rounded-2xl border border-emerald-900/30 bg-emerald-900/10 px-3 py-2 outline-none focus:border-emerald-500/50 focus:bg-emerald-900/15" />
          </div>
          <div>
            <label className="text-xs text-white/70">Ubicación</label>
            <select
              className="mt-1 w-full rounded-2xl border border-emerald-900/30 bg-emerald-900/10 px-3 py-2 outline-none focus:border-emerald-500/50 focus:bg-emerald-900/15"
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
            <label className="text-xs text-white/70">Tipo</label>
            <select
              className="mt-1 w-full rounded-2xl border border-emerald-900/30 bg-emerald-900/10 px-3 py-2 outline-none focus:border-emerald-500/50 focus:bg-emerald-900/15"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Todos</option>
              {allTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-white/70">Recámaras</label>
            <input value={beds || ''} onChange={(e) => setBeds(Number(e.target.value) || 0)} type="number" min={0} className="mt-1 w-full rounded-2xl border border-emerald-900/30 bg-emerald-900/10 px-3 py-2 outline-none focus:border-emerald-500/50 focus:bg-emerald-900/15" />
          </div>
          <div>
            <label className="text-xs text-white/70">Baños</label>
            <input value={baths || ''} onChange={(e) => setBaths(Number(e.target.value) || 0)} type="number" min={0} className="mt-1 w-full rounded-2xl border border-emerald-900/30 bg-emerald-900/10 px-3 py-2 outline-none focus:border-emerald-500/50 focus:bg-emerald-900/15" />
          </div>
          <div>
            <label className="text-xs text-white/70">Precio mín (MXN)</label>
            <input value={minPrice || ''} onChange={(e) => setMinPrice(Number(e.target.value) || 0)} type="number" min={0} className="mt-1 w-full rounded-2xl border border-emerald-900/30 bg-emerald-900/10 px-3 py-2 outline-none focus:border-emerald-500/50 focus:bg-emerald-900/15" />
          </div>
          <div>
            <label className="text-xs text-white/70">Precio máx (MXN)</label>
            <input value={maxPrice || ''} onChange={(e) => setMaxPrice(Number(e.target.value) || 0)} type="number" min={0} className="mt-1 w-full rounded-2xl border border-emerald-900/30 bg-emerald-900/10 px-3 py-2 outline-none focus:border-emerald-500/50 focus:bg-emerald-900/15" />
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
            <button
              type="button"
              onClick={() => resetPropertyFilters(
                setQuery,
                setBeds,
                setBaths,
                setMinPrice,
                setMaxPrice,
                setParams,
                setSelectedLocs,
                setPropertyType
              )}
              className="rounded-full px-5 py-2 border border-white/15 text-sm text-white/80 hover:bg-white/10"
            >
              Limpiar
            </button>
          </div>
        </form>

        {/* Listado */}
        <div className="mt-8">
          {initialLoading && <div className="text-white/70">Cargando propiedades…</div>}
          {error && <div className="text-white/70">{error}</div>}
          {!initialLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <a key={p.id} onClick={e => {
                  e.preventDefault();
                  handlePropertyClick(p.id);
                }}
                  href={`/property/${encodeURIComponent(p.id)}`}
                  className="group block relative overflow-hidden rounded-2xl bg-carbon ring-1 ring-white/5 hover:ring-white/10 transition">
                  {p.photoUrl ? (
                    <img src={p.photoUrl} alt={p.title} className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="h-52 w-full flex items-center justify-center text-white/50">Sin imagen</div>
                  )}
                  <div className="p-4">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-sm text-white/70">{p.location}</div>
                    <div className="mt-2 nv-gold-text font-semibold">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(p.price || 0)}</div>
                  </div>
                </a>
              ))}
              {filtered.length === 0 && (
                <div className="text-white/70">No encontramos propiedades con esos filtros.</div>
              )}
            </div>
          )}
          {fetchingMore && <div className="mt-4 text-center text-white/60">Cargando más…</div>}
          <div id="nv-infinite-sentinel" className="h-12" />
        </div>
      </div>
      <Footer />
    </section>
  )
}


