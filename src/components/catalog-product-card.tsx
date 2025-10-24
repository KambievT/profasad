import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/hooks/use-fetch-products";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CatalogProductCardProps = {
  product: Product;
  extractPrice: string;
};

export const CatalogProductCard = memo(
  ({ product, extractPrice }: CatalogProductCardProps) => {
    const formatPrice = (extractPrice: string) => {
      const s = String(extractPrice ?? "").trim();
      const digits = s.replace(/\D/g, "");
      return !digits || parseInt(digits, 10) === 0 ? "Цена по запросу" : s;
    };

    return (
      <Dialog>
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
              style={{ width: "100px", height: "60px" }}
            >
              {product.images &&
              product.images.length > 0 &&
              !product.images[0].includes("logo.png") &&
              product.images[0] !== "https://www.grandline.ru/" ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Нет изображения</div>';
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
                {formatPrice(extractPrice)} ₽
              </div>
              <Button size="sm" className="rounded-full" asChild>
                <DialogTrigger>Подробнее</DialogTrigger>
              </Button>
            </div>
          </CardContent>
        </Card>
        <DialogContent className="sm:max-w-2xl p-4 sm:p-6">
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 items-start">
            <div className="relative overflow-hidden rounded-md border bg-muted/10 flex items-center justify-center aspect-[4/3]">
              {product.images &&
              product.images.length > 0 &&
              !product.images[0].includes("logo.png") &&
              product.images[0] !== "https://www.grandline.ru/" ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="max-w-full max-h-[220px] sm:max-h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    if (target.parentElement) {
                      target.parentElement.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Нет изображения</div>';
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  Нет изображения
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              <DialogHeader className="p-0">
                <DialogDescription className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full whitespace-nowrap w-fit">
                    {product.category}
                  </span>
                </DialogDescription>
                <DialogTitle className="text-base sm:text-lg md:text-xl leading-snug">
                  {product.name}
                </DialogTitle>
              </DialogHeader>

              {product.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-lg sm:text-2xl font-bold text-primary">
              {formatPrice(extractPrice)} ₽
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <Button asChild className="rounded-full w-full sm:w-auto">
                <a
                  href={`https://wa.me/79527263759?text=${encodeURIComponent(
                    `Здравствуйте! Меня интересует товар "${
                      product.name
                    }" (${formatPrice(extractPrice)} ₽). ${
                      product.description ?? ""
                    }`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Написать в WhatsApp
                </a>
              </Button>

              <DialogClose asChild>
                <Button variant="secondary" className="w-full sm:w-auto">
                  Закрыть
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

CatalogProductCard.displayName = "CatalogProductCard";
