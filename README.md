# Novaland – Luxury Real Estate

Modern landing + property detail built with React, TypeScript and Vite.

## Tech stack
- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4 (utilities in `src/index.css`)
- Framer Motion (animaciones y lightbox)
- React Router (Home y Property)

## Getting started
```bash
npm install
npm run dev
# open http://localhost:5174 (puede variar)
```

## Scripts
- `npm run dev`: entorno de desarrollo
- `npm run build`: compila a `dist/`
- `npm run preview`: sirve el build local
- `npm run lint`: lint

## Variables de entorno
Crea un `.env` en la raíz:
```bash
VITE_WHATSAPP=5215555555555     # Teléfono con código país, solo dígitos
VITE_CALENDLY=https://calendly.com/tuusuario/tu-evento  # opcional
VITE_EASYBROKER_API_KEY=sk_xxx  # solo en local; en producción usar variable de entorno del proveedor
```

## Estructura relevante
```
public/
  photos/               # Imágenes servidas estáticamente
src/
  components/
    FeaturedProperties.tsx
    Navbar.tsx
    PropertyFinder.tsx
  pages/
    Property.tsx        # Página de propiedad (galería, amenities, mapa, WhatsApp)
  data/
    properties.ts       # Fuente de datos central PROPERTIES
  index.css             # Tema (verde bosque), utilidades .nv-*
```

## Datos de propiedades
Editar `src/data/properties.ts` y agregar entradas al arreglo `PROPERTIES`:
```ts
{
  id: 1,
  title: 'Casa – San Carlos',
  location: 'San Carlos, Metepec',
  price: '$8,450,000 MXN',
  coordinates: { lat: 19.252, lng: -99.606 },
  gallery: ['/photos/sancarlos/sancarlos_1.webp', ...],
  amenities: {
    bedrooms: 3,
    bathrooms: 3,
    parkingSpots: 2,
    integralKitchen: true,
    naturalGas: true,
    patio: true,
    sizeM2: 182,
    floors: 2,
  },
  description: 'Descripción corta opcional'
}
```
- Coloca las imágenes en `public/photos/...` y referencia con rutas absolutas iniciando con `/photos/...`.
- Si una imagen falla, la UI usa un fallback.

## Página de propiedad (`/property/:id`)
- Galería con 3 previews; la tercera muestra `+N fotos` si hay más.
- Lightbox modal con carrusel (anterior/siguiente, flechas del teclado, click fuera para cerrar).
- Amenities con íconos: recámaras, baños, cajones, cocina, gas, patio, m², pisos.
- Mapa embebido con estilo oscuro.
- CTA de WhatsApp usando `VITE_WHATSAPP`.

## Landing
- `FeaturedProperties` consume `PROPERTIES` y enrutá a `/property/:id`.
- `PropertyFinder` recomienda usando `PROPERTIES` y permite ir a la propiedad.
- `Navbar` mobile-first con link de regreso al inicio.

## Theme
Colores y gradientes en `src/index.css`:
- `--color-gold` y utilidades `.nv-gradient-gold`, `.nv-gold-text` ya adaptadas a verde bosque claro con toque azul.

## Deploy
El proyecto es SPA con React Router. Asegura fallback a `index.html` en producción:
- Netlify: `redirects` a `/*  /index.html  200`. Define `VITE_EASYBROKER_API_KEY` como variable de entorno en Netlify y usa el proxy `/eb` (configurado en `vite.config.ts`). Nunca embebas el API key en el código.
- Vercel: usar configuración de SPA/fallback
- NGINX/Apache: configurar rewrite a `index.html`

---
Hecho con ❤️ para Novaland.
