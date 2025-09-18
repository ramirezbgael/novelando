import { Hero } from './components/Hero.tsx'
import { ScrollShowcase } from './components/ScrollShowcase.tsx'
import { FeaturedProperties } from './components/FeaturedProperties.tsx'
import { About } from './components/About.tsx'
import { PropertyFinder } from './components/PropertyFinder.tsx'
import { Testimonials } from './components/Testimonials.tsx'
import { Contact } from './components/Contact.tsx'
import { Footer } from './components/Footer.tsx'


function App() {
  return (
    <div className="bg-black text-white">

      <Hero />
      <ScrollShowcase />
      <PropertyFinder />
      <FeaturedProperties />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
