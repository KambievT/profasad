import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const useUrlParams = (onCategoryFromUrl: (category: string) => void) => {
  const location = useLocation()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const categoryParam = urlParams.get("category")

    if (categoryParam) {
      onCategoryFromUrl(categoryParam)
    } else {
      onCategoryFromUrl("all")
    }

    try {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      // no-op
    }
  }, [location.search, onCategoryFromUrl])
}
