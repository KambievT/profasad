import { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useFetchProducts } from "@/hooks/use-fetch-products"
import { useCarousel } from "@/hooks/use-carousel"
import { CatalogProductCard } from "./catalog-product-card"

export const PopularProductsSection = () => {
  const { products: allProducts, loading } = useFetchProducts()

  const products = useMemo(() => {
    return allProducts
      .filter((p) => p.name && p.description)
      .slice(0, 10)
  }, [allProducts])

  const { currentIndex, goToPrevious, goToNext, goToIndex } = useCarousel(products.length, 5000)

  const getVisibleProducts = () => {
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1024
    let itemsToShow = 1
    if (screenWidth >= 1024) itemsToShow = 3
    else if (screenWidth >= 640) itemsToShow = 2

    const visible = []
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % products.length
      visible.push(products[index])
    }
    return visible
  }

  const visibleProducts = getVisibleProducts()

  if (loading || products.length === 0) {
    return null
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Популярная продукция <span className="text-primary">PROФасад</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Лучшие решения для вашего проекта — проверенное качество и надёжность
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background border border-border rounded-full p-2 shadow-lg hover:bg-muted transition-colors hidden sm:flex items-center justify-center"
            aria-label="Предыдущий товар"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background border border-border rounded-full p-2 shadow-lg hover:bg-muted transition-colors hidden sm:flex items-center justify-center"
            aria-label="Следующий товар"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {visibleProducts.map((product, i) => (
                <motion.div
                  key={`${product.url}-${currentIndex}-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <CatalogProductCard product={product} extractPrice={product.price} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex sm:hidden justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full"
              aria-label="Предыдущий товар"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
              aria-label="Следующий товар"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Перейти к товару ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <Link to="/catalog">
            <Button size="lg" className="rounded-full">
              Смотреть весь каталог
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
