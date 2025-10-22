import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useFetchProducts } from "@/hooks/use-fetch-products"
import { useCatalogFilters } from "@/hooks/use-catalog-filters"
import { useUrlParams } from "@/hooks/use-url-params"
import { usePagination } from "@/hooks/use-pagination"
import { CatalogProductCard } from "@/components/catalog-product-card"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { SearchInput } from "@/components/search-input"
import { PaginationControls } from "@/components/pagination-controls"

export const CatalogPage = () => {
  const { products, loading } = useFetchProducts()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  
  const {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    resetFilters,
    filteredProducts
  } = useCatalogFilters(products)

  useUrlParams(setSelectedCategory)

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(filteredProducts, 24)

  const containerRef = useRef<HTMLDivElement>(null)
  const asideAnchorRef = useRef<HTMLDivElement>(null)
  const [containerLeft, setContainerLeft] = useState<number>(0)
  const [isFixed, setIsFixed] = useState<boolean>(false)

  useEffect(() => {
    const updatePosition = () => {
      const anchorRect = asideAnchorRef.current?.getBoundingClientRect()
      const containerRect = containerRef.current?.getBoundingClientRect()
      const parentEl = asideAnchorRef.current?.parentElement as HTMLElement | null
      const gapPx = parentEl ? parseFloat((getComputedStyle(parentEl).columnGap || getComputedStyle(parentEl).gap || '0').toString()) : 0
      if (anchorRect) {
        setContainerLeft(anchorRect.left + window.scrollX + (gapPx || 0))
      } else if (containerRect) {
        setContainerLeft(containerRect.left + window.scrollX + (gapPx || 0))
      }

      const topOffset = window.innerWidth >= 1280 ? 96 : 80
      if (anchorRect) {
        const anchorTop = anchorRect.top + window.scrollY
        setIsFixed(window.scrollY + topOffset >= anchorTop)
      } else {
        setIsFixed(false)
      }
    }
    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)
    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка каталога...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-2">
            Каталог товаров
          </h1>
          <p className="text-muted-foreground">
            Найдено товаров: {filteredProducts.length}
            {totalPages > 1 && ` • Страница ${currentPage} из ${totalPages}`}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Поиск по названию, категории..."
          />
        </motion.div>

        <div className="flex gap-8">
          <div
            ref={asideAnchorRef}
            className={`hidden lg:block ${isFixed ? 'w-80' : 'w-0'} flex-shrink-0`}
            aria-hidden
          />
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`hidden lg:block w-80 flex-shrink-0 ${isFixed ? 'fixed top-20 xl:top-24 z-20' : ''}`}
            style={isFixed ? { left: containerLeft } : undefined}
          >
            <div className="max-h-[calc(100vh-6rem)] xl:max-h-[calc(100vh-7rem)] overflow-auto pr-2">
              <FiltersSidebar
                selectedCategory={selectedCategory}
                categories={categories}
                products={products}
                onCategorySelect={setSelectedCategory}
                onReset={resetFilters}
              />
            </div>
          </motion.aside>

          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  size="lg"
                  className="rounded-full shadow-lg"
                  aria-label="Фильтры"
                >
                  Фильтры
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 sm:w-96">
                <SheetHeader className="pb-4">
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-2">
                  <FiltersSidebar
                    selectedCategory={selectedCategory}
                    categories={categories}
                    products={products}
                    onCategorySelect={setSelectedCategory}
                    onReset={resetFilters}
                    onFilterSelect={() => setIsSheetOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-1"
          >
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Товары не найдены. Попробуйте изменить фильтры.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedProducts.map((product, i) => (
                    <motion.div
                      key={product.url}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.02, 0.3), duration: 0.4 }}
                    >
                      <CatalogProductCard product={product} extractPrice={product.price} />
                    </motion.div>
                  ))}
                </div>

                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrevPage={prevPage}
                  onNextPage={nextPage}
                  onGoToPage={goToPage}
                  hasPrevPage={hasPrevPage}
                  hasNextPage={hasNextPage}
                />
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
