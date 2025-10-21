import { Button } from "./ui/button"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export const Hero = () => {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      <motion.img
        src="/bg-hero.jpeg"
        alt="Фоновое изображение дома"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />

      <div className="absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,_rgba(0,0,0,0.25),_transparent)]" aria-hidden="true" />

      <div className="relative z-10 h-full w-full">
        <motion.div
          className="mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12, when: "beforeChildren" } },
          }}
        >
          <motion.h1
            className="font-extrabold tracking-tight leading-tight text-white drop-shadow-sm text-3xl xs:text-4xl sm:text-5xl lg:text-6xl"
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
          >
            КРОВЛЯ · ФАСАД · ЗАБОР
          </motion.h1>
          <motion.p
            className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-white/90 drop-shadow font-medium"
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            Комплексные решения для вашего дома: долговечные кровельные системы, современные фасады и надёжные заборы. Доставка, монтаж и гарантия качества.
          </motion.p>
          <motion.div
            className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3"
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
          >
            <Link to="/catalog">
              <Button size="lg" className="rounded-full px-6 sm:px-7 cursor-pointer hover:scale-105">Смотреть каталог</Button>
            </Link>
            <a href="#contacts">
              <Button size="lg" variant="outline" className="rounded-full px-6 sm:px-7 cursor-pointer border-white text-foreground hover:bg-white hover:text-black hover:scale-105">Связаться с нами</Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
