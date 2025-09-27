import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mt-4 flex items-center justify-between rounded-full border border-white/10 bg-black/60 backdrop-blur-md px-3 py-2">
          <Link to="/" className="font-display tracking-[0.18em] text-sm md:text-base ml-4 nv-gold-text drop-shadow-[0_2px_16px_rgba(3,213,98,0.45)]">NOVALAND</Link>
          <nav className="flex items-center gap-2">
            {!isHome && (
              <Link
                to="/"
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs md:text-sm hover:bg-white/10 transition"
              >
                Volver al inicio
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}


