import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export const CtaWhatsappSection = () => {
  return (
    <section id="contacts" className="py-16 sm:py-24 bg-foreground text-white relative overflow-hidden">
      <svg className="absolute top-0 left-0 w-full h-24 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,0 C110,90 420,110 600,75 C790,45 1020,85 1200,55 L1200,0 L0,0 Z" fill="currentColor" />
      </svg>
      <svg className="absolute top-0 left-0 w-full h-24 text-background/60" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,0 C140,90 420,110 610,82 C790,60 1010,90 1200,70 L1200,0 L0,0 Z" fill="currentColor" />
      </svg>
      <div className="absolute top-[18px] left-0 w-full h-6 bg-black/10 blur-xl opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,_rgba(255,255,255,0.1),_transparent)]" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center gap-3">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight"
          >
            Готовы заказать наш товар?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base/relaxed opacity-90 max-w-2xl"
          >
            Напишите нам в WhatsApp — ответим быстро, поможем с подбором и оформим заказ.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="https://wa.me/79000000000" target="_blank" rel="noreferrer">
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <MessageCircle className="h-5 w-5 mr-2" /> Написать в WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 w-full h-24 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,120 C200,80 420,140 610,100 C800,65 1020,115 1200,90 L1200,120 L0,120 Z" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-full h-24 text-background/60" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,120 C220,90 430,135 600,105 C780,80 1000,110 1200,100 L1200,120 L0,120 Z" fill="currentColor" />
      </svg>
      <div className="absolute bottom-[18px] left-0 w-full h-6 bg-black/10 blur-xl opacity-25" aria-hidden="true" />
    </section>
  )
}
