import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export const AboutSection = () => {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">О компании</h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
            Компания «PROФасад» была основана в 2025 году и уже с первых месяцев работы заняла уверенные позиции на рынке фасадных и кровельных решений.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left: Image/placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="relative overflow-hidden rounded-2xl border shadow-sm bg-muted">
              <img
                src="./public/company-fon.jpg"
                alt="Команда и производство"
                className="w-full h-72 sm:h-80 lg:h-[420px] object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
            </div>
          </motion.div>

          {/* Right: Text + stats cards */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold">Компания «PROФасад»</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Несмотря на молодость бренда, наша команда объединяет специалистов с более чем 8‑летним опытом в сфере поставок и монтажа кровельных материалов, фасадных систем и сопутствующих конструкций.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Мы помогаем частным заказчикам, строительным компаниям и девелоперам реализовать проекты любой сложности — от коттеджей до коммерческих объектов. Благодаря налаженным каналам поставок и сотрудничеству с ведущими производителями, наши клиенты получают качественные материалы, точные сроки и профессиональный монтаж.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-medium">
                Главные принципы работы PROФасад — ответственность, прозрачность и внимание к деталям. Мы уверены: надежная кровля и аккуратный фасад — это не просто защита дома, а отражение вашего стиля и подхода к качеству.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-5 text-center">
                  <div className="text-3xl font-bold">8+</div>
                  <div className="text-sm text-muted-foreground">Лет опыта команды</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 text-center">
                  <div className="text-3xl font-bold">2025</div>
                  <div className="text-sm text-muted-foreground">Год основания</div>
                </CardContent>
              </Card>
              <Card className="col-span-2 sm:col-span-1">
                <CardContent className="p-5 text-center">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">Качество материалов</div>
                </CardContent>
              </Card>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Профессиональный монтаж</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Точные сроки поставки</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Качественные материалы</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Прозрачность работы</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
