export type PropertyAmenity = {
  bedrooms: number
  bathrooms: number
  parkingSpots: number
  integralKitchen: boolean
  naturalGas: boolean
  patio: boolean
  sizeM2: number
  floors: number
}

export type PropertyRecord = {
  id: number
  title: string
  location: string
  price: string
  coordinates: { lat: number; lng: number }
  gallery: string[]
  amenities: PropertyAmenity
  description?: string
}

export const PROPERTIES: PropertyRecord[] = [
  {
    id: 1,
    title: 'Casa en San Carlos',
    location: 'San Carlos, Metepec',
    price: '$55,000,000 MXN',
    //lat 19.26962006640126 
    //lon -99.62048771866884
    coordinates: { lat: 19.27, lng: -99.62},
    gallery: [
      '/photos/sancarlos/sancarlos_1.webp',
      '/photos/sancarlos/sancarlos_2.webp',
      '/photos/sancarlos/sancarlos_3.webp',
      '/photos/sancarlos/sancarlos_4.webp',
      '/photos/sancarlos/sancarlos_5.webp',
      '/photos/sancarlos/sancarlos_6.webp',
      '/photos/sancarlos/sancarlos_7.webp',
      '/photos/sancarlos/sancarlos_8.webp',
      '/photos/sancarlos/sancarlos_9.webp',
      '/photos/sancarlos/sancarlos_10.webp',
      '/photos/sancarlos/sancarlos_11.webp',
      '/photos/sancarlos/sancarlos_12.webp',
      '/photos/sancarlos/sancarlos_13.webp',
      '/photos/sancarlos/sancarlos_14.webp',
      '/photos/sancarlos/sancarlos_15.webp',
      '/photos/sancarlos/sancarlos_16.webp',
      '/photos/sancarlos/sancarlos_17.webp',
      '/photos/sancarlos/sancarlos_18.webp',
      '/photos/sancarlos/sancarlos_19.webp',
      '/photos/sancarlos/sancarlos_20.webp',
      '/photos/sancarlos/sancarlos_21.webp',
      '/photos/sancarlos/sancarlos_22.webp',
    ],
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
    description: 'Residencia contemporánea con acabados de lujo en zona exclusiva de Metepec.'
  },
  {
    id: 2,
    title: 'Casa en Conjunto Málaga',
    location: 'La Providencia, Metepec',
    price: '$14,500,000 MXN',
    coordinates: { lat: 19.27, lng: -99.61},
    gallery: ['/photos/providencia/providencia_1.webp', '/photos/providencia/providencia_2.webp', '/photos/providencia/providencia_3.webp', '/photos/providencia/providencia_4.webp', '/photos/providencia/providencia_5.webp', '/photos/providencia/providencia_6.webp', '/photos/providencia/providencia_7.webp', '/photos/providencia/providencia_8.webp', '/photos/providencia/providencia_9.webp', '/photos/providencia/providencia_10.webp', '/photos/providencia/providencia_11.webp', '/photos/providencia/providencia_12.webp', '/photos/providencia/providencia_13.webp', '/photos/providencia/providencia_14.webp', '/photos/providencia/providencia_15.webp', '/photos/providencia/providencia_16.webp', '/photos/providencia/providencia_17.webp', '/photos/providencia/providencia_18.webp', '/photos/providencia/providencia_19.webp', '/photos/providencia/providencia_20.webp', '/photos/providencia/providencia_21.webp'],
    amenities: {
      bedrooms: 3,
      bathrooms: 3,
      parkingSpots: 2,
      integralKitchen: true,
      naturalGas: true,
      patio: false,
      sizeM2: 180,
      floors: 1,
    },
    description: 'Departamento iluminado con balcón y amenidades premium.'
  },
  {
    id: 3,
    title: 'Casa en La Veleta',
    location: 'Tulum, Quintana Roo',
    price: '$3,400,000 MXN',
    //Latitud: 20.199566 | Longitud: -87.468295
    coordinates: { lat: 20.19, lng: -87.468295},
      gallery: [
        '/photos/veleta/veleta_1.webp',
        '/photos/veleta/veleta_2.webp',
        '/photos/veleta/veleta_3.webp',
        '/photos/veleta/veleta_4.webp',
        '/photos/veleta/veleta_5.webp',
        '/photos/veleta/veleta_6.webp',
        '/photos/veleta/veleta_7.webp',
        '/photos/veleta/veleta_8.webp',
        '/photos/veleta/veleta_9.webp',
        '/photos/veleta/veleta_10.webp',
        '/photos/veleta/veleta_11.webp',
        '/photos/veleta/veleta_12.webp',
        '/photos/veleta/veleta_13.webp',

      ],
    amenities: {
      bedrooms: 2,
      bathrooms: 2,
      parkingSpots: 2,
      integralKitchen: true,
      naturalGas: false,
      patio: true,
      sizeM2: 40,
      floors: 3,
    },
    description: 'Casa familiar con excelente conectividad y espacios amplios.'
  },
  {
    id: 4,
    title: 'Casa Valle de las Fuentes',
    location: 'Calimaya, México',
    price: '$5,150,000 MXN',
    //19.2669° N de latitud y -99.6538° W de longitud. 
    coordinates: { lat: 19.2669, lng: -99.6538 },
    gallery: [
      '/photos/fuentes/fuentes_1.webp',
      '/photos/fuentes/fuentes_2.webp',
      '/photos/fuentes/fuentes_3.webp',
      '/photos/fuentes/fuentes_4.webp',
      '/photos/fuentes/fuentes_5.webp',
      '/photos/fuentes/fuentes_6.webp',
      '/photos/fuentes/fuentes_7.webp',
      '/photos/fuentes/fuentes_8.webp',
      '/photos/fuentes/fuentes_9.webp',
      '/photos/fuentes/fuentes_10.webp',
      '/photos/fuentes/fuentes_11.webp',
      '/photos/fuentes/fuentes_12.webp',
      '/photos/fuentes/fuentes_13.webp',
      '/photos/fuentes/fuentes_14.webp',
      '/photos/fuentes/fuentes_15.webp',
      '/photos/fuentes/fuentes_16.webp',
      '/photos/fuentes/fuentes_17.webp',
      '/photos/fuentes/fuentes_18.webp',
      '/photos/fuentes/fuentes_19.webp',
      '/photos/fuentes/fuentes_20.webp',
      '/photos/fuentes/fuentes_21.webp',
      '/photos/fuentes/fuentes_22.webp',
      '/photos/fuentes/fuentes_23.webp',
      '/photos/fuentes/fuentes_24.webp',
      '/photos/fuentes/fuentes_25.webp',
      '/photos/fuentes/fuentes_26.webp',
      '/photos/fuentes/fuentes_27.webp',
    ],
    amenities: {
      bedrooms: 5,
      bathrooms: 5,
      parkingSpots: 4,
      integralKitchen: true,
      naturalGas: true,
      patio: true,
      sizeM2: 633,
      floors: 2,
    },
    description: 'Residencia de alto nivel dentro de Club de Golf, seguridad y exclusividad.'
  },
  {
    id: 5,
    title: 'Casa Residencial en La Asunción',
    location: 'Metepec, México',
    price: '$8,900,000 MXN',
    coordinates: { lat: 19.2471, lng: -99.6062 },
    gallery: [
      '/photos/asuncion/asuncion_1.webp',
      '/photos/asuncion/asuncion_2.webp',
      '/photos/asuncion/asuncion_3.webp',
      '/photos/asuncion/asuncion_4.webp',
      '/photos/asuncion/asuncion_5.webp',
    ],
    amenities: {
      bedrooms: 4,
      bathrooms: 4,
      parkingSpots: 3,
      integralKitchen: true,
      naturalGas: true,
      patio: true,
      sizeM2: 420,
      floors: 2,
    },
    description: 'Residencia de lujo en exclusivo fraccionamiento La Asunción, amplios jardines y acabados premium.'
  },
  {
    id: 6,
    title: 'Casa en Foresta Dream Lagoons',
    location: 'Toluca, México',
    price: '$4,200,000 MXN',
    coordinates: { lat: 19.2735, lng: -99.6421 },
    gallery: [
      '/photos/foresta/foresta_1.webp',
      '/photos/foresta/foresta_2.webp',
      '/photos/foresta/foresta_3.webp',
      '/photos/foresta/foresta_4.webp',
      '/photos/foresta/foresta_5.webp',
    ],
    amenities: {
      bedrooms: 3,
      bathrooms: 3,
      parkingSpots: 2,
      integralKitchen: true,
      naturalGas: false,
      patio: true,
      sizeM2: 210,
      floors: 2,
    },
    description: 'Casa moderna en Foresta Dream Lagoons, acceso a laguna artificial y casa club.'
  },
  {
    id: 7,
    title: 'Casa en Condado del Valle',
    location: 'Metepec, México',
    price: '$6,500,000 MXN',
    coordinates: { lat: 19.2412, lng: -99.6015 },
    gallery: [
      '/photos/condado/condado_1.webp',
      '/photos/condado/condado_2.webp',
      '/photos/condado/condado_3.webp',
      '/photos/condado/condado_4.webp',
      '/photos/condado/condado_5.webp',
    ],
    amenities: {
      bedrooms: 4,
      bathrooms: 4,
      parkingSpots: 3,
      integralKitchen: true,
      naturalGas: true,
      patio: true,
      sizeM2: 350,
      floors: 2,
    },
    description: 'Casa en Condado del Valle, seguridad 24/7, áreas verdes y excelente ubicación.'
  },
  {
    id: 8,
    title: 'Casa en Residencial San Carlos',
    location: 'Metepec, México',
    price: '$5,800,000 MXN',
    coordinates: { lat: 19.2558, lng: -99.6132 },
    gallery: [
      '/photos/sancarlos/sancarlos_1.webp',
      '/photos/sancarlos/sancarlos_2.webp',
      '/photos/sancarlos/sancarlos_3.webp',
      '/photos/sancarlos/sancarlos_4.webp',
      '/photos/sancarlos/sancarlos_5.webp',
    ],
    amenities: {
      bedrooms: 3,
      bathrooms: 3,
      parkingSpots: 2,
      integralKitchen: true,
      naturalGas: true,
      patio: true,
      sizeM2: 280,
      floors: 2,
    },
    description: 'Casa en Residencial San Carlos, cerca de escuelas y centros comerciales, ideal para familias.'
  },
  {
    id: 9,
    title: 'Casa en Villas Metepec',
    location: 'Metepec, México',
    price: '$3,950,000 MXN',
    coordinates: { lat: 19.2599, lng: -99.6107 },
    gallery: [
      '/photos/villasmetepec/villas_1.webp',
      '/photos/villasmetepec/villas_2.webp',
      '/photos/villasmetepec/villas_3.webp',
      '/photos/villasmetepec/villas_4.webp',
      '/photos/villasmetepec/villas_5.webp',
    ],
    amenities: {
      bedrooms: 3,
      bathrooms: 2,
      parkingSpots: 2,
      integralKitchen: true,
      naturalGas: false,
      patio: true,
      sizeM2: 180,
      floors: 2,
    },
    description: 'Casa en Villas Metepec, fraccionamiento privado con áreas verdes y juegos infantiles.'
  },
  {
    id: 10,
    title: 'Casa en Ex-Hacienda San José',
    location: 'Metepec, México',
    price: '$7,200,000 MXN',
    coordinates: { lat: 19.2465, lng: -99.5998 },
    gallery: [
      '/photos/exhacienda/exhacienda_1.webp',
      '/photos/exhacienda/exhacienda_2.webp',
      '/photos/exhacienda/exhacienda_3.webp',
      '/photos/exhacienda/exhacienda_4.webp',
      '/photos/exhacienda/exhacienda_5.webp',
    ],
    amenities: {
      bedrooms: 4,
      bathrooms: 4,
      parkingSpots: 3,
      integralKitchen: true,
      naturalGas: true,
      patio: true,
      sizeM2: 400,
      floors: 2,
    },
    description: 'Residencia en Ex-Hacienda San José, acabados de lujo y amplios espacios.'
  },
  {
    id: 11,
    title: 'Casa en Real de Arcos',
    location: 'Toluca, México',
    price: '$3,600,000 MXN',
    coordinates: { lat: 19.2921, lng: -99.6667 },
    gallery: [
      '/photos/realarcos/realarcos_1.webp',
      '/photos/realarcos/realarcos_2.webp',
      '/photos/realarcos/realarcos_3.webp',
      '/photos/realarcos/realarcos_4.webp',
      '/photos/realarcos/realarcos_5.webp',
    ],
    amenities: {
      bedrooms: 3,
      bathrooms: 2,
      parkingSpots: 2,
      integralKitchen: true,
      naturalGas: false,
      patio: true,
      sizeM2: 160,
      floors: 2,
    },
    description: 'Casa en Real de Arcos, Toluca, excelente conectividad y seguridad.'
  },
  {
    id: 12,
    title: 'Casa en Residencial La Gavia',
    location: 'Metepec, México',
    price: '$4,800,000 MXN',
    coordinates: { lat: 19.2587, lng: -99.6154 },
    gallery: [
      '/photos/lagavia/lagavia_1.webp',
      '/photos/lagavia/lagavia_2.webp',
      '/photos/lagavia/lagavia_3.webp',
      '/photos/lagavia/lagavia_4.webp',
      '/photos/lagavia/lagavia_5.webp',
    ],
    amenities: {
      bedrooms: 3,
      bathrooms: 3,
      parkingSpots: 2,
      integralKitchen: true,
      naturalGas: true,
      patio: true,
      sizeM2: 220,
      floors: 2,
    },
    description: 'Casa en Residencial La Gavia, fraccionamiento con vigilancia y áreas comunes.'
  },
  {
    id: 13,
    title: 'Casa en Residencial El Castaño',
    location: 'Metepec, México',
    price: '$3,750,000 MXN',
    coordinates: { lat: 19.2652, lng: -99.6201 },
    gallery: [
      '/photos/castano/castano_1.webp',
      '/photos/castano/castano_2.webp',
      '/photos/castano/castano_3.webp',
      '/photos/castano/castano_4.webp',
      '/photos/castano/castano_5.webp',
    ],
    amenities: {
      bedrooms: 3,
      bathrooms: 2,
      parkingSpots: 2,
      integralKitchen: true,
      naturalGas: false,
      patio: true,
      sizeM2: 170,
      floors: 2,
    },
    description: 'Casa en El Castaño, Metepec, acceso controlado y áreas verdes.'
  },
  {
    id: 14,
    title: 'Casa en Residencial Bosques de Ibiza',
    location: 'Toluca, México',
    price: '$2,950,000 MXN',
    coordinates: { lat: 19.2875, lng: -99.6702 },
    gallery: [
      '/photos/ibiza/ibiza_1.webp',
      '/photos/ibiza/ibiza_2.webp',
      '/photos/ibiza/ibiza_3.webp',
      '/photos/ibiza/ibiza_4.webp',
      '/photos/ibiza/ibiza_5.webp',
    ],
    amenities: {
      bedrooms: 2,
      bathrooms: 2,
      parkingSpots: 2,
      integralKitchen: true,
      naturalGas: false,
      patio: true,
      sizeM2: 120,
      floors: 2,
    },
    description: 'Casa en Bosques de Ibiza, Toluca, ideal para parejas o familias pequeñas.'
  }
]

export function getPropertyById(id: number): PropertyRecord | undefined {
  return PROPERTIES.find((p) => p.id === id)
}

