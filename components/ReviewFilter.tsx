'use client'

import { useState } from 'react'
import { Filter, Star, CheckCircle } from 'lucide-react'
import { ReviewFilter as ReviewFilterType } from '@/lib/reviews'

interface ReviewFilterProps {
  filter: ReviewFilterType
  onFilterChange: (filter: ReviewFilterType) => void
  totalReviews: number
  filteredCount: number
}

const categoryOptions = [
  { value: 'cleanliness', label: '청결도' },
  { value: 'location', label: '위치' },
  { value: 'price', label: '가격' },
  { value: 'facilities', label: '시설' },
  { value: 'safety', label: '안전도' }
]

const sortOptions = [
  { value: 'recent', label: '최신순' },
  { value: 'rating', label: '평점순' },
  { value: 'helpful', label: '도움됨순' }
]

export default function ReviewFilter({ 
  filter, 
  onFilterChange, 
  totalReviews, 
  filteredCount 
}: ReviewFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filter,
      rating: filter.rating === rating ? undefined : rating
    })
  }

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filter,
      category: filter.category === category ? undefined : category
    })
  }

  const handleSortChange = (sortBy: string) => {
    onFilterChange({
      ...filter,
      sortBy: sortBy as 'recent' | 'rating' | 'helpful'
    })
  }

  const handleVerifiedChange = () => {
    onFilterChange({
      ...filter,
      verifiedOnly: !filter.verifiedOnly
    })
  }

  const clearFilters = () => {
    onFilterChange({})
  }

  const hasActiveFilters = filter.rating || filter.category || filter.verifiedOnly

  return (
    <div className="bg-white rounded-xl border border-secondary-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-accent-600" />
          <h3 className="font-semibold text-accent-800">리뷰 필터</h3>
        </div>
        <div className="text-sm text-accent-600">
          {filteredCount} / {totalReviews}개
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <h4 className="font-medium text-accent-800 mb-2">평점</h4>
        <div className="flex flex-wrap gap-2">
          {[5, 4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                filter.rating === rating
                  ? 'bg-accent-600 text-white'
                  : 'bg-secondary-100 text-accent-600 hover:bg-secondary-200'
              }`}
            >
              <Star size={14} className={filter.rating === rating ? 'text-yellow-300' : 'text-yellow-400'} />
              <span>{rating}점 이상</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <h4 className="font-medium text-accent-800 mb-2">카테고리</h4>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleCategoryChange(option.value)}
              className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                filter.category === option.value
                  ? 'bg-accent-600 text-white'
                  : 'bg-secondary-100 text-accent-600 hover:bg-secondary-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-4">
        <h4 className="font-medium text-accent-800 mb-2">정렬</h4>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                filter.sortBy === option.value
                  ? 'bg-accent-600 text-white'
                  : 'bg-secondary-100 text-accent-600 hover:bg-secondary-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Only */}
      <div className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filter.verifiedOnly || false}
            onChange={handleVerifiedChange}
            className="w-4 h-4 text-accent-600 border-secondary-300 rounded focus:ring-accent-500"
          />
          <CheckCircle size={16} className="text-success-500" />
          <span className="text-sm text-accent-700">검증된 리뷰만</span>
        </label>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full px-4 py-2 text-sm text-accent-600 hover:text-accent-800 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
        >
          필터 초기화
        </button>
      )}
    </div>
  )
} 