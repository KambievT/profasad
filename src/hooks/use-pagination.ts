import { useState, useMemo, useEffect } from "react"

export const usePagination = <T,>(items: T[], itemsPerPage: number = 24) => {
  const [currentPage, setCurrentPage] = useState(1)

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const totalPages = Math.ceil(items.length / itemsPerPage)

  // Сброс на первую страницу при изменении items
  useEffect(() => {
    setCurrentPage(1)
  }, [items.length])

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  const nextPage = () => {
    goToPage(currentPage + 1)
  }

  const prevPage = () => {
    goToPage(currentPage - 1)
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  }
}
