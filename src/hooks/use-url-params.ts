import { useEffect } from "react"

export const useUrlParams = (onCategoryFromUrl: (category: string) => void) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const categoryParam = urlParams.get('category')
    if (categoryParam) {
      onCategoryFromUrl(categoryParam)
    }
  }, [onCategoryFromUrl])
}
