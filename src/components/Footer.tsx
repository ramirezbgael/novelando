export function Footer() {
  return (
    <footer className="bg-black/95 border-t border-white/10">
      <div className="container mx-auto px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div>
            <div className="font-display tracking-[0.2em] text-xl nv-gold-text">NOVALAND</div>
            <p className="mt-2 text-sm text-white/60">JM Morelos Y P. 4 Ote. 111, Centro, 50090 Toluca de Lerdo, Méx.</p>
          </div>
          <div className="flex items-center gap-4 text-white/70">
            <a href="#" className="hover:text-white">Instagram</a>
            <span className="opacity-30">·</span>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <span className="opacity-30">·</span>
            <a href="#" className="hover:text-white">Legal</a>
          </div>
        </div>
        <p className="mt-8 text-center md:text-left text-xs text-white/50">© {new Date().getFullYear()} Novaland. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}


