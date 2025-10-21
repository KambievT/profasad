import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"

type Product = {
  category: string
  name: string
  sku: string
  price: string
  url: string
  preview: string
  description: string
  images: string[]
}

export const PopularProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Загружаем товары
  useEffect(() => {
    fetch("/data/grandline_products_fixed.json")
      .then((res) => res.json())
      .then((data: Product[]) => {
        // Берём первые 10 товаров
        const filtered = data
          .filter((p) => p.name && p.description)
          .slice(0, 10)
        setProducts(filtered)
      })
      .catch((err) => console.error("Ошибка загрузки товаров:", err))
  }, [])

  // Автопрокрутка
  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, products.length])

  const extractPrice = (desc: string) => {
    const match = desc.match(/(\d[\d\s]*)\s*₽/)
    return match ? match[1].replace(/\s/g, "") + " ₽" : "Цена по запросу"
  }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  // Показываем 3 товара на десктопе, 2 на планшете, 1 на мобилке
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

  if (products.length === 0) {
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
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow bg-white">
                    <CardContent className="p-4">
                      <div className="bg-muted rounded-lg mb-4 overflow-hidden flex items-center justify-center" style={{ width: '100px', height: '60px' }}>
                        {product.images && product.images.length > 0 && !product.images[0].includes("logo.png") && product.images[0] !== "https://www.grandline.ru/" ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = "none"
                              if (target.parentElement) {
                                target.parentElement.innerHTML =
                                  '<div class="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Нет изображения</div>'
                              }
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                            Нет изображения
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-sm font-normal text-gray-700 mb-4 min-h-[40px] line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xl font-bold text-gray-900">
                          {extractPrice(product.description)}
                        </div>
                        <Button>
                          Подробнее
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>
                          {product.sku && <span>Код: {product.sku}</span>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(index)
                }}
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
