import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const blogPosts = [
  {
    id: 1,
    title: '¿Por qué invertir en bienes raíces en 2025?',
    date: '2025-10-04',
    summary: 'Descubre las tendencias del mercado inmobiliario y por qué este año es ideal para invertir en propiedades.',
    image: '/photos/casa1.jpg',
    content: `El mercado inmobiliario en 2025 presenta grandes oportunidades debido a la estabilidad económica y la creciente demanda de vivienda. Invertir en bienes raíces sigue siendo una de las formas más seguras de proteger y hacer crecer tu patrimonio. ¡Conoce los mejores consejos para invertir este año!`
  },
  {
    id: 2,
    title: '5 consejos para vender tu casa más rápido',
    date: '2025-09-20',
    summary: '¿Quieres vender tu propiedad? Sigue estos consejos para lograr una venta exitosa y rápida.',
    image: '/photos/casa2.jpg',
    content: `1. Presenta tu casa limpia y ordenada.\n2. Realiza pequeñas reparaciones.\n3. Toma fotos profesionales.\n4. Fija un precio competitivo.\n5. Promociona en portales inmobiliarios y redes sociales.`
  },
  {
    id: 3,
    title: 'Cómo elegir la mejor hipoteca para ti',
    date: '2025-09-01',
    summary: 'Te explicamos los factores clave para seleccionar la hipoteca que más te conviene.',
    image: '/photos/casa3.jpg',
    content: `Antes de elegir una hipoteca, compara tasas de interés, plazos y comisiones. Considera tu capacidad de pago y busca asesoría profesional para tomar la mejor decisión.`
  },
  {
    id: 4,
    title: 'Tendencias de diseño de interiores para 2025',
    date: '2025-08-28',
    summary: 'Colores naturales, espacios abiertos y sostenibilidad: descubre qué estilos dominarán los hogares este año.',
    image: '/photos/interior1.jpg',
    content: `El diseño de interiores en 2025 apuesta por materiales sostenibles, iluminación natural y colores tierra. Las cocinas abiertas y los muebles multifuncionales siguen siendo tendencia. Menos es más: el minimalismo cálido llegó para quedarse.`
  },
  {
    id: 5,
    title: 'Errores comunes al comprar tu primera propiedad',
    date: '2025-08-10',
    summary: 'Evita estos errores típicos y haz que tu primera inversión inmobiliaria sea todo un éxito.',
    image: '/photos/casa4.jpg',
    content: `Muchos compradores primerizos olvidan revisar documentos legales, calcular gastos adicionales o evaluar la ubicación a futuro. Investiga, asesórate y compara opciones antes de tomar una decisión definitiva.`
  },
  {
    id: 6,
    title: 'Guía para invertir en terrenos en crecimiento',
    date: '2025-07-25',
    summary: 'Los terrenos son una de las inversiones más rentables si sabes dónde buscar. Te contamos cómo hacerlo correctamente.',
    image: '/photos/terreno1.jpg',
    content: `Invertir en terrenos en zonas en desarrollo puede ofrecer rendimientos muy altos. Evalúa la conectividad, el crecimiento urbano y los proyectos de infraestructura cercanos. Recuerda: comprar barato hoy puede ser vender caro mañana.`
  },
  {
    id: 7,
    title: '¿Rentar o comprar? Lo que debes considerar en 2025',
    date: '2025-07-05',
    summary: 'Ambas opciones tienen ventajas. Descubre cuál se adapta mejor a tu estilo de vida y tus finanzas.',
    image: '/photos/departamento1.jpg',
    content: `Comprar te da estabilidad y patrimonio, pero rentar te brinda flexibilidad. Evalúa tus metas a 5 años, tus ingresos y el mercado de tu ciudad antes de decidir. En 2025, la tendencia apunta a la compra con financiamiento flexible.`
  },
  {
    id: 8,
    title: 'Cómo preparar tu casa para sesiones fotográficas',
    date: '2025-06-22',
    summary: 'Una buena presentación visual puede marcar la diferencia entre vender y no vender.',
    image: '/photos/fotos1.jpg',
    content: `Despeja los espacios, aprovecha la luz natural y agrega pequeños detalles como plantas o cuadros. Las fotos profesionales aumentan hasta un 70% las posibilidades de venta rápida.`
  },
  {
    id: 9,
    title: 'Ventajas de vivir en fraccionamientos privados',
    date: '2025-05-30',
    summary: 'Seguridad, comunidad y plusvalía: los fraccionamientos siguen siendo una opción muy buscada en México.',
    image: '/photos/fraccionamiento1.jpg',
    content: `Los fraccionamientos privados ofrecen control de acceso, áreas verdes y mayor tranquilidad. Además, mantienen una plusvalía constante gracias a su buena planeación y servicios comunes.`
  },
  {
    id: 10,
    title: 'Decoración con bajo presupuesto: transforma tu hogar',
    date: '2025-05-15',
    summary: 'No necesitas gastar mucho para renovar tu espacio. Te damos ideas sencillas y económicas.',
    image: '/photos/interior2.jpg',
    content: `Reutiliza muebles, pinta paredes con tonos neutros y juega con la iluminación. Pequeños cambios, como cojines o cortinas nuevas, pueden darle un aire completamente nuevo a tu hogar sin afectar tu bolsillo.`
  }
];


const Blog: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="blog-container" style={{padding: '2rem', maxWidth: 1000, margin: '0 auto'}}>
        <Navbar/>
      <h1 className="text-3xl mt-14 font-bold mb-6">Blog</h1>
      <p className="mb-8 text-lg text-gray-300">Bienvenido a nuestro blog. Encuentra artículos, noticias y consejos inmobiliarios aquí.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map(post => (
          <article
            key={post.id}
            className="rounded-lg bg-gray-900/80 shadow-lg p-0 flex flex-col cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl border border-transparent hover:border-green-400"
            style={{ minHeight: 340 }}
            onClick={() => navigate(`/blog/${post.id}`)}
          >
            <div className="relative w-full h-56 overflow-hidden rounded-t-lg">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1 text-green-300">{post.title}</h2>
                <p className="text-xs text-gray-400 mb-2">{new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="mb-2 text-gray-200 line-clamp-3">{post.summary}</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-400">
                <span>Publicado por Novaland</span>
                <span>•</span>
                <span>{post.content.length} caracteres</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
