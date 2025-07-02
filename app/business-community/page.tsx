'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Users, 
  Search, 
  Send, 
  MoreVertical, 
  Star,
  Heart,
  Share2,
  Flag,
  User,
  Building2,
  Calendar,
  MapPin
} from 'lucide-react'

interface CommunityPost {
  id: string
  author: {
    id: string
    name: string
    avatar: string
    businessName: string
    location: string
    memberSince: string
  }
  content: string
  images?: string[]
  likes: number
  comments: number
  shares: number
  createdAt: string
  tags: string[]
  isLiked: boolean
}

interface Comment {
  id: string
  author: {
    id: string
    name: string
    avatar: string
    businessName: string
  }
  content: string
  createdAt: string
  likes: number
}

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: '김철수',
      avatar: '/api/placeholder/40/40',
      businessName: '신촌 고시원',
      location: '서울 서대문구',
      memberSince: '2023년 3월'
    },
    content: '안녕하세요! 신촌에서 고시원 운영하고 있는 김철수입니다. 요즘 입주율이 떨어져서 고민이에요. 다른 사장님들은 어떻게 관리하고 계신가요? 특히 청소 서비스나 부대시설 관리에 대한 팁이 있으시면 공유해주세요!',
    likes: 12,
    comments: 8,
    shares: 3,
    createdAt: '2시간 전',
    tags: ['입주율', '관리팁', '청소서비스'],
    isLiked: false
  },
  {
    id: '2',
    author: {
      id: '2',
      name: '이영희',
      avatar: '/api/placeholder/40/40',
      businessName: '홍대 고시원',
      location: '서울 마포구',
      memberSince: '2022년 8월'
    },
    content: '홍대에서 2년째 운영 중인데, 최근에 CCTV 설치하고 보안을 강화했어요. 입주생들이 훨씬 안전하다고 만족해하고 있네요. 보안 시스템 구축에 관심 있으신 분들 있으시면 제가 도와드릴 수 있어요!',
    likes: 18,
    comments: 5,
    shares: 7,
    createdAt: '5시간 전',
    tags: ['보안', 'CCTV', '입주생만족도'],
    isLiked: true
  },
  {
    id: '3',
    author: {
      id: '3',
      name: '박민수',
      avatar: '/api/placeholder/40/40',
      businessName: '강남 고시원',
      location: '서울 강남구',
      memberSince: '2021년 12월'
    },
    content: '강남에서 운영 중인데, 요즘 전기세가 너무 많이 나와요. LED 조명으로 교체하고 절약하는 방법을 찾고 있는데, 다른 사장님들은 어떻게 절약하고 계신가요? 특히 공용 공간 조명 관리에 대한 조언 부탁드려요.',
    likes: 9,
    comments: 12,
    shares: 2,
    createdAt: '1일 전',
    tags: ['전기세절약', 'LED조명', '공용공간'],
    isLiked: false
  },
  {
    id: '4',
    author: {
      id: '4',
      name: '최수진',
      avatar: '/api/placeholder/40/40',
      businessName: '부산 해운대 고시원',
      location: '부산 해운대구',
      memberSince: '2023년 1월'
    },
    content: '부산에서 새로 고시원을 시작했어요! 해운대 근처라서 관광객들도 많이 찾고 있는데, 단기 임대와 장기 임대를 어떻게 운영하시는지 궁금해요. 특히 성수기와 비수기를 어떻게 관리하시는지 조언 부탁드려요.',
    likes: 15,
    comments: 6,
    shares: 4,
    createdAt: '2일 전',
    tags: ['단기임대', '관광객', '성수기관리'],
    isLiked: false
  }
]

const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      id: '2',
      name: '이영희',
      avatar: '/api/placeholder/32/32',
      businessName: '홍대 고시원'
    },
    content: '저도 비슷한 고민이었는데, 주기적인 청소 서비스와 부대시설 점검을 통해 입주생 만족도를 높였어요. 특히 공용 주방 관리를 잘하는 게 중요해요!',
    createdAt: '1시간 전',
    likes: 5
  },
  {
    id: '2',
    author: {
      id: '5',
      name: '정현우',
      avatar: '/api/placeholder/32/32',
      businessName: '대구 중앙로 고시원'
    },
    content: '입주율 관리에는 정기적인 시설 점검과 빠른 민원 처리가 핵심이에요. 작은 불편함도 빠르게 해결해주면 입주생들이 만족해하더라고요.',
    createdAt: '30분 전',
    likes: 3
  }
]

export default function BusinessCommunity() {
  const [posts, setPosts] = useState<CommunityPost[]>(mockPosts)
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null)
  const [newPost, setNewPost] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [showComments, setShowComments] = useState<string | null>(null)

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.businessName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        }
      }
      return post
    }))
  }

  const handleShare = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, shares: post.shares + 1 }
      }
      return post
    }))
  }

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: CommunityPost = {
        id: Date.now().toString(),
        author: {
          id: 'current-user',
          name: '나',
          avatar: '/api/placeholder/40/40',
          businessName: '내 고시원',
          location: '서울',
          memberSince: '2023년'
        },
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        createdAt: '방금 전',
        tags: [],
        isLiked: false
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">사업주 커뮤니티</h1>
                <p className="text-sm text-gray-600">고시원 사업주들과 정보를 공유하세요</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="게시글 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">태그 필터</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedTag('')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedTag === '' 
                      ? 'bg-amber-100 text-amber-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  전체 보기
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedTag === tag 
                        ? 'bg-amber-100 text-amber-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">커뮤니티 통계</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">총 게시글</span>
                    <span className="text-sm font-semibold">{posts.length}개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">활성 멤버</span>
                    <span className="text-sm font-semibold">156명</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">오늘 게시글</span>
                    <span className="text-sm font-semibold">3개</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Create Post */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="사업 경험을 공유하거나 궁금한 점을 물어보세요..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">태그 추가:</span>
                      <div className="flex flex-wrap gap-1">
                        {['입주율', '관리팁', '보안', '절약'].map(tag => (
                          <button
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-amber-100 hover:text-amber-700 transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      게시하기
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{post.createdAt}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Building2 className="w-3 h-3" />
                          <span>{post.author.businessName}</span>
                          <span>•</span>
                          <MapPin className="w-3 h-3" />
                          <span>{post.author.location}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-900 leading-relaxed">{post.content}</p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button
                        onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-amber-600 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-amber-600 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                    <button className="text-gray-500 hover:text-red-500 transition-colors">
                      <Flag className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Comments */}
                  {showComments === post.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <h5 className="font-medium text-gray-900 mb-3">댓글 ({mockComments.length})</h5>
                      <div className="space-y-3">
                        {mockComments.map(comment => (
                          <div key={comment.id} className="flex space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-sm text-gray-900">{comment.author.name}</span>
                                <span className="text-xs text-gray-500">{comment.author.businessName}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-400">{comment.createdAt}</span>
                              </div>
                              <p className="text-sm text-gray-700">{comment.content}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <button className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                                  좋아요 {comment.likes}
                                </button>
                                <button className="text-xs text-gray-500 hover:text-amber-600 transition-colors">
                                  답글
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="댓글을 입력하세요..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 