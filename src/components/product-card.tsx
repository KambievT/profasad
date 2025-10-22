import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/hooks/use-fetch-products"

type ProductCardProps = {
  product: Product
  extractPrice: (desc: string) => string
}

export const ProductCard = memo(({ product, extractPrice }: ProductCardProps) => {
    const  formatPrice = (extractPrice:string) =>{
  const s = String(extractPrice ?? "").trim();
  const digits = s.replace(/\D/g, "");
  return (!digits || parseInt(digits, 10) === 0) ? "Цена по запросу" : s;
}
  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow bg-white">
      <CardContent className="p-4">
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
        
        <h3 className="text-sm font-normal text-gray-700 mb-4 min-h-[40px] line-clamp-2 text-center">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-xl font-bold text-gray-900">
          { formatPrice(extractPrice) }
          </div>
          <Button size="sm">
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
  )
})

ProductCard.displayName = "ProductCard"
