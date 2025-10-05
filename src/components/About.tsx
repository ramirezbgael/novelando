import { AboutPropertyCard } from './AboutPropertyCard'

export function About() {
  return (
    <section className="bg-white text-black py-24 md:py-32">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif nv-gold-text">Sobre Novaland</h2>
          <p className="mt-6 text-lg text-neutral-800/90 leading-relaxed">
            En Novaland, seleccionamos residencias que redefinen el lujo: privacidad absoluta, diseño atemporal y una experiencia de vida sin compromisos. Creamos puentes discretos entre nuestros clientes y propiedades que destacan por su singularidad.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <li className="rounded-xl border border-black/10 bg-white p-4">Exclusividad</li>
            <li className="rounded-xl border border-black/10 bg-white p-4">Privacidad</li>
            <li className="rounded-xl border border-black/10 bg-white p-4">Lujo</li>
          </ul>
        </div>
        <div className="relative">
          <AboutPropertyCard />
        </div>
      </div>
    </section>
  )
}


