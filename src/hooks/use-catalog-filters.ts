import { useState, useMemo, useCallback } from "react"
import type { Product } from "./use-fetch-products"

export const useCatalogFilters = (products: Product[]) => {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category))
    return Array.from(cats).sort()
  }, [products])

  const resetFilters = useCallback(() => {
    setSelectedCategory("all")
    setSearch("")
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === "all" || p.category === selectedCategory
      const matchSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      
      return matchCategory && matchSearch
    })
  }, [products, selectedCategory, search])

  return {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    categories,
    resetFilters,
    filteredProducts
  }
}
