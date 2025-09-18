export function Contact() {
  const number = (import.meta.env.VITE_WHATSAPP as string | undefined)?.replace(/[^\d]/g, '') || '5215555555555'
  const msg = encodeURIComponent('Hola Novaland, me interesa agendar una visita privada.')
  const href = `https://wa.me/${number}?text=${msg}`

  return (
    <section id="contacto" className="bg-black py-24 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-serif nv-gold-text">Tu próxima residencia te espera</h2>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto bg-transparent">
          A un mensaje de distancia. Hablemos en privado y coordinemos tu visita.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-full px-7 py-4 nv-gradient-gold text-black font-medium tracking-wide leading-none"
          style={{ boxShadow: '0 10px 40px rgba(200, 169, 106, 0.35)' }}
        >
          <img src="/photos/whatsapp.png" alt="WhatsApp" className="h-6 w-6 -mt-0.5 object-contain" />
          Agenda por WhatsApp
        </a>
        <p className="mt-4 text-xs text-white/50">Atención confidencial y personalizada.</p>
      </div>
    </section>
  )
}
