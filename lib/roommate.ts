export interface RoommatePost {
  id: string
  type: 'find' | 'offer' // find: 룸메구해요, offer: 하메찾아요
  title: string
  content: string
  location: string
  budget: string
  moveInDate: string
  lifestyle: string
  author: {
    name: string
    age: number
    gender: '남성' | '여성'
    occupation: string
    avatar?: string
  }
  createdAt: string
  viewCount: number
  likeCount: number
  commentCount: number
}

export interface RoommateFilter {
  location: string
  budget: string
  moveInDate: string
  lifestyle: string
  sortBy: 'recent' | 'popular' | 'budget'
}

// 샘플 데이터
export const sampleRoommatePosts: RoommatePost[] = [
  {
    id: '1',
    type: 'find',
    title: '홍대 근처 룸메이트 구해요!',
    content: '홍대입구역 5분 거리에 있는 원룸에서 룸메이트를 구합니다. 20대 여성분이었으면 좋겠어요. 깔끔하고 조용한 분이면 됩니다.',
    location: '홍대',
    budget: '50-60만원',
    moveInDate: '2024-02-01',
    lifestyle: '조용한 타입',
    author: {
      name: '김미영',
      age: 25,
      gender: '여성',
      occupation: '대학생',
      avatar: '/avatars/user1.jpg'
    },
    createdAt: '2024-01-15T10:30:00Z',
    viewCount: 45,
    likeCount: 3,
    commentCount: 2
  },
  {
    id: '2',
    type: 'offer',
    title: '강남역 근처 하우스메이트 모집',
    content: '강남역 3번 출구 근처 3룸 아파트에서 하우스메이트를 모집합니다. 각자 개인방이고 공용 주방, 거실 사용 가능합니다.',
    location: '강남',
    budget: '80-100만원',
    moveInDate: '2024-01-25',
    lifestyle: '사교적인 타입',
    author: {
      name: '박준호',
      age: 28,
      gender: '남성',
      occupation: '회사원',
      avatar: '/avatars/user2.jpg'
    },
    createdAt: '2024-01-14T15:20:00Z',
    viewCount: 78,
    likeCount: 5,
    commentCount: 4
  },
  {
    id: '3',
    type: 'find',
    title: '신촌역 근처 룸메이트 구합니다',
    content: '신촌역 2번 출구 근처 원룸에서 룸메이트를 구합니다. 연세대 학생이었으면 좋겠어요. 공부하는 분위기 좋은 곳입니다.',
    location: '신촌',
    budget: '40-50만원',
    moveInDate: '2024-02-15',
    lifestyle: '조용한 타입',
    author: {
      name: '이수진',
      age: 22,
      gender: '여성',
      occupation: '대학생',
      avatar: '/avatars/user3.jpg'
    },
    createdAt: '2024-01-13T09:15:00Z',
    viewCount: 32,
    likeCount: 2,
    commentCount: 1
  }
]

// 필터링 함수
export const filterRoommatePosts = (posts: RoommatePost[], filter: RoommateFilter): RoommatePost[] => {
  let filtered = [...posts]

  if (filter.location) {
    filtered = filtered.filter(post => post.location === filter.location)
  }

  if (filter.budget) {
    filtered = filtered.filter(post => post.budget === filter.budget)
  }

  if (filter.moveInDate) {
    filtered = filtered.filter(post => post.moveInDate === filter.moveInDate)
  }

  if (filter.lifestyle) {
    filtered = filtered.filter(post => post.lifestyle === filter.lifestyle)
  }

  // 정렬
  switch (filter.sortBy) {
    case 'recent':
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'popular':
      filtered.sort((a, b) => b.viewCount - a.viewCount)
      break
    case 'budget':
      // 예산 범위의 중간값으로 정렬
      filtered.sort((a, b) => {
        const getBudgetValue = (budget: string) => {
          const match = budget.match(/(\d+)/)
          return match ? parseInt(match[1]) : 0
        }
        return getBudgetValue(a.budget) - getBudgetValue(b.budget)
      })
      break
  }

  return filtered
} 