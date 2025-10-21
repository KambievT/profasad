import { motion } from "framer-motion"

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <img
                src="/logo.jpg"
                alt="Логотип"
                width={220}
                height={60}
                className="h-10 sm:h-12 md:h-20 w-auto object-contain block flex-shrink-0 rounded-full"
                decoding="async"
              />
            <p className="text-sm text-muted-foreground max-w-xs">
              Комплексные решения для кровли, фасадов и ограждений. Доставка и монтаж по всей России.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-sm font-semibold mb-3">Каталог</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a className="hover:text-foreground" href="#">Кровля</a></li>
              <li><a className="hover:text-foreground" href="#">Фасады</a></li>
              <li><a className="hover:text-foreground" href="#">Заборы</a></li>
              <li><a className="hover:text-foreground" href="#">Водостоки</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-sm font-semibold mb-3">Сервисы</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a className="hover:text-foreground" href="#">Калькуляторы</a></li>
              <li><a className="hover:text-foreground" href="#">Подбор цвета</a></li>
              <li><a className="hover:text-foreground" href="#">Доставка</a></li>
              <li><a className="hover:text-foreground" href="#">Гарантия</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-sm font-semibold mb-3">Контакты</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>+7 (900) 000-00-00</li>
              <li>info@example.ru</li>
              <li>Россия, Москва</li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t py-6 text-xs sm:text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Компания. Все права защищены.</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">Политика конфиденциальности</a>
            <a href="#" className="hover:text-foreground">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
