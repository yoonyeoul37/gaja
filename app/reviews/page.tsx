'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, MessageSquare, Filter, Plus } from 'lucide-react'
import { 
  mockReviews, 
  calculateReviewStats, 
  filterReviews, 
  ReviewFilter as ReviewFilterType 
} from '@/lib/reviews'
import ReviewCard from '@/components/ReviewCard'
import ReviewStats from '@/components/ReviewStats'
import ReviewFilter from '@/components/ReviewFilter'
import ReviewModal from '@/components/ReviewModal'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(mockReviews)
  const [filter, setFilter] = useState<ReviewFilterType>({})
  const [filteredReviews, setFilteredReviews] = useState(mockReviews)
  const [stats, setStats] = useState(calculateReviewStats(mockReviews))
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [selectedGosiwon, setSelectedGosiwon] = useState({ id: '1', name: '강남역 프리미엄 고시원' })

  useEffect(() => {
    const filtered = filterReviews(reviews, filter)
    setFilteredReviews(filtered)
    setStats(calculateReviewStats(filtered))
  }, [reviews, filter])

  const handleHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpfulCount: review.helpfulCount + 1 }
        : review
    ))
  }

  const handleReport = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, reportCount: review.reportCount + 1 }
        : review
    ))
  }

  const handleSubmitReview = (reviewData: any) => {
    const newReview = {
      id: Date.now().toString(),
      ...reviewData,
      userId: 'current-user',
      userName: '현재 사용자',
      userAvatar: '/avatars/current-user.jpg',
      isVerified: true,
      helpfulCount: 0,
      reportCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setReviews(prev => [newReview, ...prev])
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-accent-800 mb-2">리뷰 & 평점</h1>
              <p className="text-accent-600">
                실제 이용자들의 생생한 후기를 확인해보세요
              </p>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-accent-700 transition-colors duration-200"
            >
              <Plus size={20} />
              <span>리뷰 작성</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats */}
            <ReviewStats stats={stats} />
            
            {/* Filter */}
            <ReviewFilter
              filter={filter}
              onFilterChange={setFilter}
              totalReviews={reviews.length}
              filteredCount={filteredReviews.length}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-accent-800">
                  리뷰 {filteredReviews.length}개
                </h2>
                {filteredReviews.length !== reviews.length && (
                  <span className="text-sm text-accent-600">
                    (전체 {reviews.length}개 중)
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-accent-600">
                <MessageSquare size={16} />
                <span>최신순으로 정렬</span>
              </div>
            </div>

            {/* Reviews List */}
            {filteredReviews.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {filteredReviews.map((review) => (
                  <motion.div key={review.id} variants={itemVariants}>
                    <ReviewCard
                      review={review}
                      onHelpful={handleHelpful}
                      onReport={handleReport}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={24} className="text-accent-400" />
                </div>
                <h3 className="text-lg font-medium text-accent-800 mb-2">
                  조건에 맞는 리뷰가 없습니다
                </h3>
                <p className="text-accent-600 mb-4">
                  필터 조건을 변경하거나 첫 번째 리뷰를 작성해보세요
                </p>
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-6 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-accent-700 transition-colors duration-200"
                >
                  리뷰 작성하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleSubmitReview}
        gosiwonId={selectedGosiwon.id}
        gosiwonName={selectedGosiwon.name}
      />
    </div>
  )
} 