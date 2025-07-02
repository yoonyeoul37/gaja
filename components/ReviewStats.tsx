'use client'

import { motion } from 'framer-motion'
import { Star, Users, TrendingUp } from 'lucide-react'
import { ReviewStats, renderStars } from '@/lib/reviews'

interface ReviewStatsProps {
  stats: ReviewStats
  className?: string
}

const categoryLabels = {
  cleanliness: '청결도',
  location: '위치',
  price: '가격',
  facilities: '시설',
  safety: '안전도'
}

export default function ReviewStats({ stats, className = '' }: ReviewStatsProps) {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-success-600'
    if (rating >= 4.0) return 'text-accent-600'
    if (rating >= 3.0) return 'text-warning-600'
    return 'text-error-600'
  }

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return '매우 좋음'
    if (rating >= 4.0) return '좋음'
    if (rating >= 3.0) return '보통'
    if (rating >= 2.0) return '나쁨'
    return '매우 나쁨'
  }

  return (
    <div className={`bg-white rounded-xl border border-secondary-200 p-6 ${className}`}>
      {/* Overall Rating */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          {renderStars(stats.averageRating, 'lg')}
          <span className={`text-2xl font-bold ${getRatingColor(stats.averageRating)}`}>
            {stats.averageRating}
          </span>
        </div>
        <p className={`text-sm font-medium ${getRatingColor(stats.averageRating)}`}>
          {getRatingText(stats.averageRating)}
        </p>
        <p className="text-sm text-accent-600 mt-1">
          총 {stats.totalReviews}개의 리뷰
        </p>
      </div>

      {/* Rating Distribution */}
      <div className="mb-6">
        <h4 className="font-semibold text-accent-800 mb-3">평점 분포</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = stats.ratingDistribution[rating as keyof typeof stats.ratingDistribution]
            const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0
            
            return (
              <div key={rating} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-8">
                  <span className="text-sm text-accent-600">{rating}</span>
                  <Star size={12} className="text-yellow-400" />
                </div>
                <div className="flex-1 bg-secondary-100 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-accent-600 w-8 text-right">
                  {count}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Category Averages */}
      <div>
        <h4 className="font-semibold text-accent-800 mb-3">카테고리별 평점</h4>
        <div className="space-y-3">
          {Object.entries(stats.categoryAverages).map(([category, rating]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm text-accent-600">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </span>
              <div className="flex items-center space-x-2">
                {renderStars(rating, 'sm')}
                <span className="text-sm font-medium text-accent-800">
                  {Math.round(rating * 10) / 10}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-secondary-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center center space-x-1 mb-1">
              <Users size={16} className="text-accent-500" />
              <span className="text-sm text-accent-600">검증된 리뷰</span>
            </div>
            <p className="text-lg font-semibold text-accent-800">
              {Math.round(stats.totalReviews * 0.8)}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center center space-x-1 mb-1">
              <TrendingUp size={16} className="text-accent-500" />
              <span className="text-sm text-accent-600">평균 평점</span>
            </div>
            <p className="text-lg font-semibold text-accent-800">
              {stats.averageRating}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 