export interface Review {
  id: string
  gosiwonId: string
  gosiwonName: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  categoryRatings: {
    cleanliness: number
    location: number
    price: number
    facilities: number
    safety: number
  }
  title: string
  content: string
  images?: string[]
  isVerified: boolean
  helpfulCount: number
  reportCount: number
  createdAt: string
  updatedAt: string
  reservationId?: string
}

export interface ReviewStats {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  categoryAverages: {
    cleanliness: number
    location: number
    price: number
    facilities: number
    safety: number
  }
}

export interface ReviewFilter {
  rating?: number
  category?: 'cleanliness' | 'location' | 'price' | 'facilities' | 'safety'
  sortBy?: 'recent' | 'rating' | 'helpful'
  verifiedOnly?: boolean
}

// 모의 리뷰 데이터
export const mockReviews: Review[] = [
  {
    id: '1',
    gosiwonId: '1',
    gosiwonName: '강남역 프리미엄 고시원',
    userId: '1',
    userName: '김철수',
    userAvatar: '/avatars/user1.jpg',
    rating: 4.5,
    categoryRatings: {
      cleanliness: 5,
      location: 4,
      price: 4,
      facilities: 5,
      safety: 4
    },
    title: '깔끔하고 안전한 고시원',
    content: '강남역에서 가깝고 깔끔한 고시원입니다. 시설도 좋고 관리도 잘 되고 있어요. 특히 청결도가 정말 좋습니다. 가격도 합리적이고 안전도 좋아서 추천합니다!',
    images: ['/reviews/review1_1.jpg', '/reviews/review1_2.jpg'],
    isVerified: true,
    helpfulCount: 12,
    reportCount: 0,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    reservationId: '1'
  },
  {
    id: '2',
    gosiwonId: '1',
    gosiwonName: '강남역 프리미엄 고시원',
    userId: '2',
    userName: '이영희',
    userAvatar: '/avatars/user2.jpg',
    rating: 4.0,
    categoryRatings: {
      cleanliness: 4,
      location: 5,
      price: 3,
      facilities: 4,
      safety: 4
    },
    title: '위치가 정말 좋아요',
    content: '강남역에서 도보 5분 거리라서 정말 편리합니다. 지하철역이 가깝고 주변에 편의점도 많아요. 다만 가격이 조금 비싸다는 점이 아쉽습니다.',
    images: ['/reviews/review2_1.jpg'],
    isVerified: true,
    helpfulCount: 8,
    reportCount: 0,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    reservationId: '2'
  },
  {
    id: '3',
    gosiwonId: '2',
    gosiwonName: '홍대입구 스튜디오 고시원',
    userId: '3',
    userName: '박민수',
    userAvatar: '/avatars/user3.jpg',
    rating: 3.5,
    categoryRatings: {
      cleanliness: 3,
      location: 4,
      price: 5,
      facilities: 3,
      safety: 3
    },
    title: '가격 대비 괜찮아요',
    content: '가격이 저렴해서 선택했는데, 생각보다 괜찮습니다. 위치도 홍대입구에서 가깝고요. 다만 청결도가 조금 아쉽고 시설이 오래된 편입니다.',
    images: [],
    isVerified: false,
    helpfulCount: 3,
    reportCount: 0,
    createdAt: '2024-01-08T16:20:00Z',
    updatedAt: '2024-01-08T16:20:00Z',
    reservationId: '3'
  },
  {
    id: '4',
    gosiwonId: '2',
    gosiwonName: '홍대입구 스튜디오 고시원',
    userId: '4',
    userName: '최지영',
    userAvatar: '/avatars/user4.jpg',
    rating: 2.0,
    categoryRatings: {
      cleanliness: 2,
      location: 3,
      price: 4,
      facilities: 1,
      safety: 2
    },
    title: '실망스러운 경험',
    content: '가격이 저렴하다고 해서 선택했는데 정말 실망했습니다. 청결도가 떨어지고 시설도 많이 부족해요. 안전도도 걱정됩니다.',
    images: ['/reviews/review4_1.jpg'],
    isVerified: true,
    helpfulCount: 15,
    reportCount: 1,
    createdAt: '2024-01-05T11:15:00Z',
    updatedAt: '2024-01-05T11:15:00Z',
    reservationId: '4'
  }
]

// 리뷰 통계 계산 함수
export const calculateReviewStats = (reviews: Review[]): ReviewStats => {
  if (reviews.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      categoryAverages: {
        cleanliness: 0,
        location: 0,
        price: 0,
        facilities: 0,
        safety: 0
      }
    }
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / reviews.length

  const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach(review => {
    const rating = Math.round(review.rating)
    ratingDistribution[rating as keyof typeof ratingDistribution]++
  })

  const categoryTotals = {
    cleanliness: 0,
    location: 0,
    price: 0,
    facilities: 0,
    safety: 0
  }

  reviews.forEach(review => {
    Object.keys(categoryTotals).forEach(category => {
      categoryTotals[category as keyof typeof categoryTotals] += 
        review.categoryRatings[category as keyof typeof review.categoryRatings]
    })
  })

  const categoryAverages = {
    cleanliness: categoryTotals.cleanliness / reviews.length,
    location: categoryTotals.location / reviews.length,
    price: categoryTotals.price / reviews.length,
    facilities: categoryTotals.facilities / reviews.length,
    safety: categoryTotals.safety / reviews.length
  }

  return {
    averageRating: Math.round(averageRating * 10) / 10,
    totalReviews: reviews.length,
    ratingDistribution,
    categoryAverages
  }
}

// 리뷰 필터링 함수
export const filterReviews = (reviews: Review[], filter: ReviewFilter): Review[] => {
  let filtered = [...reviews]

  if (filter.rating) {
    filtered = filtered.filter(review => review.rating >= filter.rating!)
  }

  if (filter.category) {
    filtered = filtered.filter(review => 
      review.categoryRatings[filter.category!] >= 4
    )
  }

  if (filter.verifiedOnly) {
    filtered = filtered.filter(review => review.isVerified)
  }

  // 정렬
  if (filter.sortBy) {
    switch (filter.sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'helpful':
        filtered.sort((a, b) => b.helpfulCount - a.helpfulCount)
        break
    }
  }

  return filtered
}

// 별점 표시 함수
export const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  // JSX 대신 데이터만 반환
  return {
    fullStars,
    hasHalfStar,
    emptyStars,
    sizeClass: sizeClasses[size]
  }
}

// 날짜 포맷 함수
export const formatReviewDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return '오늘'
  } else if (diffInDays === 1) {
    return '어제'
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays / 7)}주 전`
  } else {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
} 