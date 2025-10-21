import { Header } from "./components/header"
import { Hero } from "@/components/hero"
import { AboutSection } from "@/components/about-section"
import { ServiceFeaturesSection } from "@/components/service-features-section"
import { Footer } from "@/components/footer"
import { Routes, Route } from "react-router-dom"
import { CtaWhatsappSection } from "@/components/cta-whatsapp-section"
import { CatalogPage } from "@/pages/catalog-page"
import { PopularProductsSection } from "@/components/popular-products-section"

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <PopularProductsSection />
                <AboutSection />
                <ServiceFeaturesSection />
                <CtaWhatsappSection /> 
              </>
            }
          />
          <Route path="/catalog" element={<CatalogPage />} />
        </Routes>
        <Footer />
      </main>
    </>
  )
}

export default App