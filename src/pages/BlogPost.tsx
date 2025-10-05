import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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


const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="p-8 text-center text-red-400">
        <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
        <button onClick={() => navigate('/blog')} className="mt-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Volver al blog</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button onClick={() => navigate('/blog')} className="mb-4 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">← Volver al blog</button>
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded mb-6" />
      <h1 className="text-3xl font-bold mb-2 text-green-300">{post.title}</h1>
      <p className="text-xs text-gray-400 mb-4">{new Date(post.date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <p className="mb-4 text-gray-200 text-lg">{post.summary}</p>
      <div className="text-gray-100 whitespace-pre-line text-base">{post.content}</div>
    </div>
  );
};

export default BlogPost;
