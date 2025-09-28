export type EBProperty = {
  id: string
  title: string
  location: string
  price: number
  url: string
  photoUrl: string
  bedrooms?: number
  bathrooms?: number
  propertyType?: string
  latitude?: number | null
  longitude?: number | null
}

export type EBPropertyDetail = EBProperty & {
  images: string[]
  parkingSpaces?: number
  lotSize?: number | null
  constructionSize?: number | null
  latitude?: number | null
  longitude?: number | null
  operationType?: 'sale' | 'rental' | string
}

type EBListResponse = {
  pagination?: { total?: number; limit?: number; page?: number; next_page?: string | null }
  content?: any[]
  properties?: any[]
}

function normalizeProperty(raw: any): EBProperty | null {
  if (!raw) return null
  const id = String(raw.public_id ?? raw.id ?? '')
  const title = String(raw.title ?? raw.name ?? 'Propiedad')
  const location = String(
    raw.location?.name ?? raw.location ?? raw.address?.name ?? raw.address?.complete ?? raw.zone ?? '—'
  )
  // EasyBroker properties list suele exponer operations[0].amount
  const op = Array.isArray(raw.operations) ? raw.operations[0] : undefined
  const priceRaw = op?.amount ?? raw.price ?? raw.list_price
  const price = typeof priceRaw === 'number' ? priceRaw : Number(String(priceRaw ?? '').replace(/[^0-9]/g, ''))
  const url = String(raw.public_url ?? raw.url ?? '')
  const photoUrl = String(
    raw.title_image_full ?? raw.title_image_thumb ?? raw.photos?.[0]?.url ?? raw.property_images?.[0]?.url ?? raw.thumbnail ?? ''
  )
  const bedrooms = raw.bedrooms ?? raw.bedrooms_total ?? raw.bedrooms_count
  const bathrooms = raw.bathrooms ?? raw.bathrooms_total ?? raw.bathrooms_count
  const propertyType: string | undefined = raw.property_type ? String(raw.property_type) : undefined
  const latitude: number | null = raw.location?.latitude ?? raw.location?.lat ?? null
  const longitude: number | null = raw.location?.longitude ?? raw.location?.lng ?? null

  return {
    id,
    title,
    location,
    price: Number.isFinite(price) ? price : 0,
    url,
    photoUrl,
    bedrooms: typeof bedrooms === 'number' ? bedrooms : undefined,
    bathrooms: typeof bathrooms === 'number' ? bathrooms : undefined,
    propertyType,
    latitude,
    longitude,
  }
}

// Requests are proxied via Vite dev server (local) and Netlify Function (prod),
// so the API key is NEVER embedded in the client bundle.
export const hasEasyBrokerKey = true

// In dev, hit Vite proxy "/eb"; in production, call Netlify Function directly
const EB_BASE = import.meta.env.DEV ? '/eb' : '/.netlify/functions/eb'

async function ebFetch<T = any>(path: string, init?: RequestInit): Promise<T> {
  const url = `${EB_BASE}${path}`
  try {
    console.log('[EB] →', url)
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      ...init,
    })
    const text = await res.text()
    if (!res.ok) {
      console.error('[EB] ←', res.status, text?.slice(0, 500))
      throw new Error(`EasyBroker ${res.status}`)
    }
    console.debug('[EB] ←', res.status)
    return text ? (JSON.parse(text) as T) : ({} as T)
  } catch (err) {
    console.error('[EB] fetch error', err)
    throw err
  }
}

export type EBListPage = {
  items: EBProperty[]
  page: number
  limit: number
  total: number
  nextPage: number | null
}

function parseNextPage(nextUrl?: string | null): number | null {
  if (!nextUrl) return null
  try {
    const u = new URL(nextUrl)
    const pageStr = u.searchParams.get('page')
    return pageStr ? Number(pageStr) : null
  } catch {
    return null
  }
}

export async function listEBProperties({ page = 1, limit = 50 } = {}): Promise<EBProperty[]> {
  // Always hit our proxy: Vite dev proxy (local) or Netlify Function (prod)
  try {
    const data = await ebFetch<EBListResponse>(`/v1/properties?page=${page}&limit=${limit}`)
    const list = data.content ?? data.properties ?? []
    return list.map((item) => normalizeProperty(item)).filter(Boolean) as EBProperty[]
  } catch (err) {
    // Propagar error hacia arriba para mostrar mensaje en UI si se desea
    throw err
  }
}

export async function listEBPropertiesPaged({ page = 1, limit = 50 } = {}): Promise<EBListPage> {
  const data = await ebFetch<EBListResponse>(`/v1/properties?page=${page}&limit=${limit}`)
  const list = data.content ?? data.properties ?? []
  const items = list.map((item) => normalizeProperty(item)).filter(Boolean) as EBProperty[]
  const total = data.pagination?.total ?? 0
  const lim = data.pagination?.limit ?? limit
  const pg = data.pagination?.page ?? page
  const nextPage = parseNextPage((data as any).pagination?.next_page)
  return { items, page: pg, limit: lim, total, nextPage }
}

export async function getEBProperty(publicId: string): Promise<EBPropertyDetail | null> {
  const raw = await ebFetch<any>(`/v1/properties/${encodeURIComponent(publicId)}`)
  const baseNorm = normalizeProperty(raw)
  if (!baseNorm) return null
  const images: string[] = Array.isArray(raw.property_images)
    ? raw.property_images.map((x: any) => x.url).filter(Boolean)
    : [raw.title_image_full, raw.title_image_thumb].filter(Boolean)
  const op = Array.isArray(raw.operations) ? raw.operations[0] : undefined
  const detail: EBPropertyDetail = {
    ...baseNorm,
    images: images.length ? images : [baseNorm.photoUrl].filter(Boolean),
    parkingSpaces: raw.parking_spaces ?? raw.parkingLots ?? undefined,
    lotSize: raw.lot_size ?? null,
    constructionSize: raw.construction_size ?? null,
    latitude: raw.location?.latitude ?? raw.location?.lat ?? null,
    longitude: raw.location?.longitude ?? raw.location?.lng ?? null,
    operationType: op?.type ?? undefined,
  }
  return detail
}


