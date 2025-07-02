'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ThumbsUp, Flag, Camera, CheckCircle, User } from 'lucide-react'
import { Review, renderStars, formatReviewDate } from '@/lib/reviews'

interface ReviewCardProps {
  review: Review
  onHelpful?: (reviewId: string) => void
  onReport?: (reviewId: string) => void
}

const categoryLabels = {
  cleanliness: '청결도',
  location: '위치',
  price: '가격',
  facilities: '시설',
  safety: '안전도'
}

export default function ReviewCard({ review, onHelpful, onReport }: ReviewCardProps) {
  const [showFullContent, setShowFullContent] = useState(false)
  const [isHelpfulClicked, setIsHelpfulClicked] = useState(false)

  const handleHelpful = () => {
    if (!isHelpfulClicked && onHelpful) {
      onHelpful(review.id)
      setIsHelpfulClicked(true)
    }
  }

  const handleReport = () => {
    if (onReport) {
      onReport(review.id)
    }
  }

  const shouldShowMore = review.content.length > 150

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-secondary-200 p-6 hover:shadow-lg transition-shadow duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
            {review.userAvatar ? (
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <User size={20} className="text-accent-600" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-accent-800">{review.userName}</h3>
              {review.isVerified && (
                <CheckCircle size={16} className="text-success-500" />
              )}
            </div>
            <p className="text-sm text-accent-500">{formatReviewDate(review.createdAt)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {renderStars(review.rating, 'md')}
            <span className="text-sm font-medium text-accent-800 ml-1">
              {review.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-lg font-semibold text-accent-800 mb-3">
        {review.title}
      </h4>

      {/* Category Ratings */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        {Object.entries(review.categoryRatings).map(([category, rating]) => (
          <div key={category} className="flex items-center justify-between">
            <span className="text-xs text-accent-600">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </span>
            <div className="flex items-center space-x-1">
              {renderStars(rating, 'sm')}
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-accent-700 leading-relaxed">
          {showFullContent 
            ? review.content 
            : review.content.slice(0, 150) + (shouldShowMore ? '...' : '')
          }
        </p>
        {shouldShowMore && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-accent-600 hover:text-accent-800 text-sm font-medium mt-2"
          >
            {showFullContent ? '접기' : '더보기'}
          </button>
        )}
      </div>

      {/* Images */}
      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Camera size={16} className="text-accent-500" />
            <span className="text-sm text-accent-600">사진 {review.images.length}장</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {review.images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center"
              >
                <span className="text-xs text-accent-500">이미지 {index + 1}</span>
              </div>
            ))}
            {review.images.length > 3 && (
              <div className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center">
                <span className="text-xs text-accent-500">+{review.images.length - 3}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-secondary-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleHelpful}
            disabled={isHelpfulClicked}
            className={`flex items-center space-x-1 text-sm transition-colors duration-200 ${
              isHelpfulClicked
                ? 'text-success-600'
                : 'text-accent-600 hover:text-accent-800'
            }`}
          >
            <ThumbsUp size={16} />
            <span>도움됨 {review.helpfulCount + (isHelpfulClicked ? 1 : 0)}</span>
          </button>
          
          <button
            onClick={handleReport}
            className="flex items-center space-x-1 text-sm text-accent-600 hover:text-error-600 transition-colors duration-200"
          >
            <Flag size={16} />
            <span>신고</span>
          </button>
        </div>

        {review.reportCount > 0 && (
          <div className="text-xs text-error-600">
            신고 {review.reportCount}회
          </div>
        )}
      </div>
    </motion.div>
  )
} 