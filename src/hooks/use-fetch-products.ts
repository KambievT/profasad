import { useState, useEffect } from "react"

export type Product = {
  category: string
  name: string
  sku: string
  price: string
  url: string
  preview: string
  description: string
  images: string[]
}

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/data/grandline_products_fixed.json")
      .then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки")
        return res.json()
      })
      .then((data: Product[]) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Ошибка загрузки товаров:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { products, loading, error }
}

export const extractPrice = (desc: string): string => {
  const match = desc.match(/(\d[\d\s]*)\s*₽/)
  return match ? match[1].replace(/\s/g, "") + " ₽" : "Цена по запросу"
}
