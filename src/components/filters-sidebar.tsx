import { memo } from "react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/hooks/use-fetch-products"

type FiltersSidebarProps = {
  selectedCategory: string
  categories: string[]
  products: Product[]
  onCategorySelect: (category: string) => void
  onReset: () => void
  onFilterSelect?: () => void
}

export const FiltersSidebar = memo(({ 
  selectedCategory, 
  categories, 
  products, 
  onCategorySelect, 
  onReset, 
  onFilterSelect 
}: FiltersSidebarProps) => (
  <div className="space-y-6 px-4 lg:px-0">
    <div>
      <h3 className="text-lg font-semibold mb-4">Фильтры</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-3">Категории</h4>
          <div className="space-y-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "ghost"}
              className="w-full justify-start h-auto py-2 px-3 text-sm"
              onClick={() => {
                onCategorySelect("all")
                onFilterSelect?.()
              }}
            >
              Все товары ({products.length})
            </Button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat).length
              return (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "ghost"}
                  className="w-full justify-start text-left h-auto py-2 px-3 text-sm"
                  onClick={() => {
                    onCategorySelect(cat)
                    onFilterSelect?.()
                  }}
                >
                  <span className="truncate">{cat}</span>
                  <span className="ml-auto text-xs opacity-70">({count})</span>
                </Button>
              )
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button
            onClick={() => {
              onReset()
              onFilterSelect?.()
            }}
            variant="outline"
            className="w-full"
            size="sm"
          >
            Сбросить фильтры
          </Button>
        </div>
      </div>
    </div>
  </div>
))

FiltersSidebar.displayName = "FiltersSidebar"
