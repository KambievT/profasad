import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export const CtaWhatsappSection = () => {
  return (
    <section id="contacts" className="py-20 sm:py-28 bg-foreground text-white relative overflow-hidden">
      <div className="absolute top-[18px] left-0 w-full h-6 bg-black/10 blur-xl opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,_rgba(255,255,255,0.15),_transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.08),_transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.06),_transparent_60%)]" />
      
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              Готовы заказать наш товар?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Напишите нам в WhatsApp — ответим быстро, поможем с подбором и оформим заказ.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.a 
              href="https://wa.me/79000000000" 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Button 
                size="lg" 
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-primary/25 transition-all duration-300 border border-white/10"
              >
                <MessageCircle className="h-6 w-6 mr-3" />
                Написать в WhatsApp
              </Button>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
