import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, X, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useFetchProducts } from "@/hooks/use-fetch-products"
import { usePagination } from "@/hooks/use-pagination"
import { CatalogProductCard } from "@/components/catalog-product-card"

export const CatalogPage = () => {
  const { products, loading } = useFetchProducts()
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category))
    return Array.from(cats).sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === "all" || p.category === selectedCategory
      const matchSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [products, selectedCategory, search])

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

  const FiltersSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Категории</h3>
        <div className="space-y-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedCategory("all")}
          >
            Все товары ({products.length})
          </Button>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat).length
            return (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "ghost"}
                className="w-full justify-start text-left"
                onClick={() => setSelectedCategory(cat)}
              >
                <span className="truncate">{cat}</span>
                <span className="ml-auto text-xs opacity-70">({count})</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )

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
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию, категории..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              className="pl-10 pr-10"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start"
          >
            <FiltersSidebar />
          </motion.aside>

          {/* Mobile Filters Button */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <Sheet>
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
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Products Grid */}
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

                {/* Пагинация */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevPage}
                      disabled={!hasPrevPage}
                      className="rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum: number
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }
                        
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="icon"
                            onClick={() => goToPage(pageNum)}
                            className="rounded-full min-w-10"
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextPage}
                      disabled={!hasNextPage}
                      className="rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
