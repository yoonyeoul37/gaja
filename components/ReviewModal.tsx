'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Camera, Send, AlertCircle } from 'lucide-react'
import { Review } from '@/lib/reviews'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (review: Omit<Review, 'id' | 'userId' | 'userName' | 'userAvatar' | 'isVerified' | 'helpfulCount' | 'reportCount' | 'createdAt' | 'updatedAt'>) => void
  gosiwonId: string
  gosiwonName: string
}

const categoryLabels = {
  cleanliness: '청결도',
  location: '위치',
  price: '가격',
  facilities: '시설',
  safety: '안전도'
}

export default function ReviewModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  gosiwonId, 
  gosiwonName 
}: ReviewModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    rating: 0,
    categoryRatings: {
      cleanliness: 0,
      location: 0,
      price: 0,
      facilities: 0,
      safety: 0
    },
    images: [] as string[]
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }))
    }
  }

  const handleCategoryRatingChange = (category: string, rating: number) => {
    setFormData(prev => ({
      ...prev,
      categoryRatings: {
        ...prev.categoryRatings,
        [category]: rating
      }
    }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요'
    }

    if (!formData.content.trim()) {
      newErrors.content = '리뷰 내용을 입력해주세요'
    }

    if (formData.rating === 0) {
      newErrors.rating = '전체 평점을 선택해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    onSubmit({
      gosiwonId,
      gosiwonName,
      title: formData.title,
      content: formData.content,
      rating: formData.rating,
      categoryRatings: formData.categoryRatings,
      images: formData.images
    })

    // Reset form
    setFormData({
      title: '',
      content: '',
      rating: 0,
      categoryRatings: {
        cleanliness: 0,
        location: 0,
        price: 0,
        facilities: 0,
        safety: 0
      },
      images: []
    })
    setStep(1)
    setErrors({})
    onClose()
  }

  const renderStars = (rating: number, onRatingChange: (rating: number) => void, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className={`${sizeClasses[size]} transition-colors duration-200 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400`}
          >
            ★
          </button>
        ))}
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <div>
                <h2 className="text-xl font-semibold text-accent-800">리뷰 작성</h2>
                <p className="text-sm text-accent-600 mt-1">{gosiwonName}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
              >
                <X size={20} className="text-accent-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? 'bg-accent-600 text-white' : 'bg-secondary-200 text-accent-600'
                  }`}>
                    1
                  </div>
                  <div className={`w-16 h-1 ${
                    step >= 2 ? 'bg-accent-600' : 'bg-secondary-200'
                  }`} />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? 'bg-accent-600 text-white' : 'bg-secondary-200 text-accent-600'
                  }`}>
                    2
                  </div>
                </div>
              </div>

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Overall Rating */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-accent-800 mb-3">전체 평점</h3>
                    <div className="flex items-center space-x-4">
                      {renderStars(formData.rating, handleRatingChange, 'lg')}
                      <span className="text-lg font-medium text-accent-800">
                        {formData.rating > 0 ? `${formData.rating}점` : '평점 선택'}
                      </span>
                    </div>
                    {errors.rating && (
                      <p className="text-error-600 text-sm mt-2 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.rating}
                      </p>
                    )}
                  </div>

                  {/* Category Ratings */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-accent-800 mb-3">카테고리별 평점</h3>
                    <div className="space-y-4">
                      {Object.entries(categoryLabels).map(([category, label]) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-accent-700">{label}</span>
                          <div className="flex items-center space-x-3">
                            {renderStars(
                              formData.categoryRatings[category as keyof typeof formData.categoryRatings],
                              (rating) => handleCategoryRatingChange(category, rating),
                              'md'
                            )}
                            <span className="text-sm text-accent-600 w-8">
                              {formData.categoryRatings[category as keyof typeof formData.categoryRatings] > 0 
                                ? `${formData.categoryRatings[category as keyof typeof formData.categoryRatings]}점`
                                : ''
                              }
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={formData.rating === 0}
                    className="w-full px-6 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-accent-700 disabled:bg-secondary-300 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    다음 단계
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {/* Title */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-accent-800 mb-2">
                      리뷰 제목
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="리뷰 제목을 입력해주세요"
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      maxLength={50}
                    />
                    {errors.title && (
                      <p className="text-error-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-accent-800 mb-2">
                      리뷰 내용
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="고시원 이용 경험을 자세히 작성해주세요"
                      rows={6}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                      maxLength={1000}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-accent-500">
                        {formData.content.length}/1000자
                      </span>
                      {errors.content && (
                        <p className="text-error-600 text-sm flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.content}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-3 border border-secondary-300 text-accent-700 rounded-lg font-medium hover:bg-secondary-50 transition-colors duration-200"
                    >
                      이전
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 px-6 py-3 bg-accent-600 text-white rounded-lg font-medium hover:bg-accent-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Send size={16} />
                      <span>리뷰 등록</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 