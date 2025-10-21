import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type CatalogItem = { id: string | number; title: string; price?: string | number; image: string; url?: string; tag?: string; desc?: string }

const products: CatalogItem[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Продукт ${i + 1}`,
  desc: "Краткое описание продукта. Материал, особенности и преимущества.",
  price: Math.round(1500 + Math.random() * 5000),
  image: `https://picsum.photos/seed/cat-${i}/640/420`,
  tag: i % 4 === 0 ? "Хит" : i % 5 === 0 ? "Новинка" : undefined,
}))

export const CatalogPage = () => {

  return (
    <section className="py-10 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">Каталог</h1>
          <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-2xl">
            Подберите материалы для вашего проекта. Фильтры помогут сузить выбор.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
          <Button variant="outline" className="rounded-full">Кровля</Button>
          <Button variant="outline" className="rounded-full">Фасады</Button>
          <Button variant="outline" className="rounded-full">Заборы</Button>
          <Button variant="outline" className="rounded-full">Водосток</Button>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" className="rounded-full">Сначала популярные</Button>
            <Button variant="outline" className="rounded-full">Цена ↑↓</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: Math.min(i * 0.03, 0.25), duration: 0.45 }}
            >
              <Card className="h-full overflow-hidden">
                <CardHeader className="[.border-b]:pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base sm:text-lg font-semibold leading-tight">{p.title}</CardTitle>
                    {p.tag ? (
                      <span className="rounded-full bg-primary/10 text-primary px-2.5 py-1 text-xs font-medium">{p.tag}</span>
                    ) : null}
                  </div>
                  {p.desc ? <CardDescription>{p.desc}</CardDescription> : null}
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="relative overflow-hidden rounded-lg border">
                    <img src={(p as any).img || p.image} alt={p.title} className="max-w-full max-h-[180px] object-contain transition-transform duration-300 scale-110" loading="lazy" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-semibold">{typeof p.price === 'number' ? `${p.price.toLocaleString()} ₽` : (p.price || '')}</div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="rounded-full">В корзину</Button>
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noreferrer">
                          <Button size="sm" className="rounded-full">Подробнее</Button>
                        </a>
                      ) : (
                        <Button size="sm" className="rounded-full">Подробнее</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
