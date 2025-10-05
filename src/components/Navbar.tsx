import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const isProperty = /^\/property\/[^/]+$/.test(location.pathname)

  const handleBackToSearch = () => {
    navigate('/properties')
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 shadow-lg bg-gradient-to-r from-black/80 via-gray-900/80 to-black/80 backdrop-blur-lg">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mt-5 max-w-[90vw] flex items-center justify-between px-6 py-3 ">
           <nav className="flex items-center gap-3">
            {isProperty ? (
              <button
                onClick={handleBackToSearch}
                className="inline-flex items-center rounded-full border border-green-400/30 bg-gradient-to-r from-green-400/10 to-white/5 px-4 py-2 text-xs md:text-sm font-semibold text-green-300 hover:bg-green-400/20 hover:text-green-100 transition shadow"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Volver
              </button>
            ) : (
              !isHome && (
                <Link
                  to="/"
                  className="inline-flex items-center rounded-full border border-green-400/30 bg-gradient-to-r from-green-400/10 to-white/5 px-4 py-2 text-xs md:text-sm font-semibold text-green-300 hover:bg-green-400/20 hover:text-green-100 transition shadow"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver
                </Link>
              )
            )}
          </nav>

          <Link
            to="/"
            className="flex items-center gap-3 font-display tracking-[0.18em] text-lg md:text-2xl font-bold nv-gold-text drop-shadow-[0_2px_16px_rgba(3,213,98,0.45)] hover:scale-105 transition-transform"
            aria-label="Ir al inicio"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-yellow-400">


              <defs>
                <linearGradient id="gold-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFD700"/>
                  <stop offset="1" stopColor="#FFB300"/>
                </linearGradient>
              </defs>
            </svg>
            NOVALAND
          </Link>
         
          <nav className="flex items-center gap-3">
            <Link
              to="/blog"
              className="inline-flex items-center rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-400/10 to-white/5 px-4 py-2 text-xs md:text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20 hover:text-yellow-100 transition shadow"
            >
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
