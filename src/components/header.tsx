import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useGeolocationLabel } from "@/hooks/use-geolocation"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"
import { MapPin, MenuIcon, MessageCircle } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export const Header = () => {
  const { label: locText, loading, error, detect } = useGeolocationLabel({ language: "ru" })
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors py-2",
        scrolled ? "backdrop-blur bg-background/70 border-b" : "bg-transparent"
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              to="/"
              className={cn(
                "font-semibold text-base truncate",
                scrolled ? "text-foreground" : "text-foreground drop-shadow"
              )}
              aria-label="На главную"
            >
              <img
                src="/logo.JPG"
                alt="Логотип"
                width={220}
                height={60}
                className="h-10 sm:h-12 md:h-20 w-auto object-contain block flex-shrink-0 rounded-full"
                decoding="async"
              />
            </Link>
            <div
              className={cn(
                "hidden sm:flex items-center text-sm gap-2",
                scrolled ? "text-muted-foreground" : isHomePage ? "text-white/90 drop-shadow" : "text-muted-foreground"
              )}
            >
              <MapPin className={cn("h-4 w-4", scrolled ? "text-primary" : isHomePage ? "text-white" : "text-primary")} />
              {loading ? (
                <span>Определяем местоположение…</span>
              ) : error ? (
                <div className="flex items-center gap-2">
                  <span>Не удалось определить</span>
                  <Button size="sm" variant="outline" onClick={detect}>Повторить</Button>
                </div>
              ) : (
                <span>{locText || "Местоположение"}</span>
              )}
            </div>
          </div>

          <nav className="hidden min-[900px]:flex items-center gap-6 text-base font-medium">
            <Link
              to="/"
              className={cn("transition-all", scrolled ? "text-foreground hover:text-accent" : isHomePage ? "text-white hover:text-accent" : "text-foreground hover:text-accent")}
            >
              Главная
            </Link>
            <Link
              to="/catalog"
              className={cn("transition-all", scrolled ? "text-foreground hover:text-accent" : isHomePage ? "text-white hover:text-accent" : "text-foreground hover:text-accent")}
            >
              Каталог
            </Link>
            <a
              className={cn("transition-all", scrolled ? "text-foreground hover:text-accent" : isHomePage ? "text-white hover:text-accent" : "text-foreground hover:text-accent")}
              href="#contacts"
            >
              Контакты
            </a>
            <a
              className={cn("transition-all", scrolled ? "text-foreground hover:text-accent" : isHomePage ? "text-white hover:text-accent" : "text-foreground hover:text-accent")}
              href="#about"
            >
              О компании
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/catalog" className="hidden sm:inline-flex">
              <Button variant="outline" className="bg-accent text-accent-foreground border-none cursor-pointer hover:bg-accent/90">Написать в Whatsapp</Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="min-[900px]:hidden" variant="outline" aria-label="Открыть меню">
                  <MenuIcon/>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Меню</SheetTitle>
                </SheetHeader>
                <div className="p-4 space-y-4">
                  <nav className="flex flex-col gap-2 text-base">
                    <SheetClose asChild>
                      <Link to="/" className="rounded-lg px-3 py-2 hover:bg-muted">Главная</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/catalog" className="rounded-lg px-3 py-2 hover:bg-muted">Каталог</Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <a className="rounded-lg px-3 py-2 hover:bg-muted" href="#contacts">Контакты</a>
                    </SheetClose>
                    <SheetClose asChild>
                      <a className="rounded-lg px-3 py-2 hover:bg-muted" href="#about">О компании</a>
                    </SheetClose>
                  </nav>
                  <div className="h-px bg-border" />
                  <a href="https://wa.me/79000000000" target="_blank" rel="noreferrer" className="block">
                    <Button className="w-full justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <MessageCircle className="h-5 w-5 mr-2" /> Написать в WhatsApp
                    </Button>
                  </a>
                  <div className="text-xs text-muted-foreground text-center">
                    Отвечаем быстро. Поможем с подбором и расчётом.
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}