import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROPERTIES } from '../data/properties'

export function FeaturedProperties() {
  return (
    <section id="propiedades" className="bg-black pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl md:text-5xl font-serif nv-gold-text">Propiedades Destacadas</h2>
          <Link to="/properties" className="text-sm text-white/70 hover:text-white transition">Ver todas</Link>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROPERTIES.slice(0, 4).map((p) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl bg-carbon ring-1 ring-white/5"
            >
              <Link to={`/property/${p.id}`} className="relative aspect-[4/5] overflow-hidden block">
                <img src={p.gallery[0]} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </Link>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <Link to={`/property/${p.id}`} className="text-lg font-medium hover:underline">{p.title}</Link>
                <p className="mt-1 text-sm text-white/70">{p.location}</p>
                <p className="mt-2 font-semibold nv-gold-text nv-gold-text-price">{p.price}</p>
                <Link
                  to={`/property/${p.id}`}
                  className="mt-4 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm hover:bg-white/10 transition"
                >
                  Ver propiedad
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}


