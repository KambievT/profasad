import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/hooks/use-fetch-products"

type CatalogProductCardProps = {
  product: Product
  extractPrice: (desc: string) => string
}

export const CatalogProductCard = memo(({ product, extractPrice }: CatalogProductCardProps) => {
  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-base font-semibold leading-tight line-clamp-2">
            {product.name}
          </CardTitle>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
            {product.category}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="mb-4 overflow-hidden flex items-center justify-center mx-auto" 
          style={{ width: '100px', height: '60px' }}
        >
          {product.images && product.images.length > 0 && !product.images[0].includes("logo.png") && product.images[0] !== "https://www.grandline.ru/" ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                if (target.parentElement) {
                  target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Нет изображения</div>'
                }
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              Нет изображения
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary">
            {extractPrice(product.description) || "Цена по запросу"}
          </div>
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block"
          >
            <Button size="sm" className="rounded-full">
              Подробнее
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  )
})

CatalogProductCard.displayName = "CatalogProductCard"
