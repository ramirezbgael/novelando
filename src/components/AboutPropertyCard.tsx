import { useEffect, useState } from 'react'
import { getEBProperty, type EBPropertyDetail } from '../services/easybroker'
import { Link } from 'react-router-dom'

export function AboutPropertyCard() {
  const [property, setProperty] = useState<EBPropertyDetail | null>(null)
  // Example: fetch a property over 10 million (replace with a real ID if needed)
  const propertyId = 'EB-SO8312'

  useEffect(() => {
    getEBProperty(propertyId).then(setProperty)
  }, [])

  if (!property) return (
    <div className="w-full h-[420px] flex items-center justify-center bg-gray-100 rounded-3xl shadow-2xl animate-pulse">
      <span className="text-gray-400">Cargando propiedad destacada...</span>
    </div>
  )

  return (
    <Link to={`/property/${property.id}`} className="block group relative">
      <img
        src={property.photoUrl || property.images?.[0] || '/photos/about.jpg'}
        alt={property.title}
        className="w-full h-[420px] object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute bottom-6 left-6 bg-black/70 text-white rounded-xl px-6 py-4 shadow-xl">
        <h3 className="text-xl font-bold mb-1">{property.title}</h3>
        <p className="text-sm mb-1">{property.location}</p>
        <p className="text-lg font-semibold nv-gold-text">{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(property.price)}</p>
      </div>
      <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full" style={{ background: 'radial-gradient(circle, rgba(200,169,106,0.45), transparent 60%)' }} />
    </Link>
  )
}
