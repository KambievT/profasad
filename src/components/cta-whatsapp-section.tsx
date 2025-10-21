import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export const CtaWhatsappSection = () => {
  return (
    <section id="contacts" className="py-16 sm:py-24 bg-foreground text-white relative overflow-hidden">
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
    </section>
  )
}
