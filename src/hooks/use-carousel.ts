import { useState, useEffect } from "react"

export const useCarousel = (itemsCount: number, autoPlayDelay: number = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || itemsCount === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % itemsCount)
    }, autoPlayDelay)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, itemsCount, autoPlayDelay])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + itemsCount) % itemsCount)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % itemsCount)
  }

  const goToIndex = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return {
    currentIndex,
    isAutoPlaying,
    setIsAutoPlaying,
    goToPrevious,
    goToNext,
    goToIndex,
  }
}
