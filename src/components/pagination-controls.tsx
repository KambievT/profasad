import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type PaginationControlsProps = {
  currentPage: number
  totalPages: number
  onPrevPage: () => void
  onNextPage: () => void
  onGoToPage: (page: number) => void
  hasPrevPage: boolean
  hasNextPage: boolean
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onGoToPage,
  hasPrevPage,
  hasNextPage
}: PaginationControlsProps) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevPage}
        disabled={!hasPrevPage}
        className="rounded-full"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          let pageNumber: number
          
          if (totalPages <= 7) {
            pageNumber = i + 1
          } else if (currentPage <= 4) {
            pageNumber = i + 1
          } else if (currentPage >= totalPages - 3) {
            pageNumber = totalPages - 6 + i
          } else {
            pageNumber = currentPage - 3 + i
          }

          const isCurrentPage = pageNumber === currentPage

          return (
            <Button
              key={pageNumber}
              variant={isCurrentPage ? "default" : "outline"}
              size="icon"
              onClick={() => onGoToPage(pageNumber)}
              className="rounded-full w-10 h-10"
            >
              {pageNumber}
            </Button>
          )
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={onNextPage}
        disabled={!hasNextPage}
        className="rounded-full"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
