import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    id: "professional-installation",
    title: "Профессиональный монтаж",
    desc: "Квалифицированная команда с опытом работы более 8 лет выполнит монтаж любой сложности.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    id: "quality-materials",
    title: "Качественные материалы",
    desc: "Работаем только с проверенными производителями. Гарантируем качество каждой позиции.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
        <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
      </svg>
    ),
  },
  {
    id: "accurate-timing",
    title: "Точные сроки поставки",
    desc: "Налаженная логистика и контроль на каждом этапе. Доставим точно в срок.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    id: "transparency",
    title: "Прозрачность работы",
    desc: "Честные цены, подробные сметы и отчёты. Вы всегда в курсе хода работ.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
]

export const ServiceFeaturesSection = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-muted/30">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">Сервис</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="h-full"
            >
              <Card className="bg-background h-full">
                <CardContent className="p-6">
                  <div className="mb-4 h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {f.icon}
                  </div>
                  <div className="text-base sm:text-lg font-semibold">{f.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
