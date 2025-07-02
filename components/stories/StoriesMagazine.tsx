'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Heart, 
  MessageCircle, 
  Share2, 
  Clock, 
  User,
  Search,
  Filter,
  Plus,
  MapPin,
  Star,
  TrendingUp,
  MessageSquare,
  Edit3
} from 'lucide-react'

export default function StoriesMagazine() {
  const [activeTab, setActiveTab] = useState('stories')
  const [activeCategory, setActiveCategory] = useState('all')
  const [showWriteForm, setShowWriteForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'free'
  })

  const tabs = [
    { id: 'stories', name: '고시원 스토리', icon: BookOpen },
    { id: 'freeboard', name: '자유게시판', icon: MessageSquare }
  ]

  const categories = [
    { id: 'all', name: '전체', count: 89 },
    { id: 'interview', name: '입주자 인터뷰', count: 23 },
    { id: 'tips', name: '꾸미기 팁', count: 18 },
    { id: 'guide', name: '지역 가이드', count: 15 },
    { id: 'study', name: '스터디 그룹', count: 12 },
    { id: 'life', name: '고시원 라이프', count: 21 }
  ]

  const freeboardCategories = [
    { id: 'all', name: '전체', count: 156 },
    { id: 'daily', name: '일상', count: 45 },
    { id: 'complaint', name: '불만/건의', count: 23 },
    { id: 'question', name: '질문', count: 34 },
    { id: 'humor', name: '유머', count: 28 },
    { id: 'info', name: '정보공유', count: 26 }
  ]

  // 자유게시판 더미 데이터
  const freeboardPosts = [
    {
      id: 1,
      title: '고시원 이웃이 너무 시끄러워요 ㅠㅠ',
      content: '새벽 2시까지 음악을 틀어대는데 어떻게 해야 할까요? 직접 말하기는 좀 그렇고...',
      author: '조용한사람',
      category: 'complaint',
      createdAt: '2024-01-15',
      views: 89,
      replies: 12
    },
    {
      id: 2,
      title: '고시원에서 키우는 반려식물 추천해주세요!',
      content: '창가에 작은 화분을 놓고 싶은데, 햇빛이 적은 고시원에 적합한 식물이 있을까요?',
      author: '식물러버',
      category: 'question',
      createdAt: '2024-01-14',
      views: 67,
      replies: 8
    },
    {
      id: 3,
      title: '오늘 고시원에서 생긴 웃픈 일',
      content: '세탁기에서 빨래를 꺼내려는데 속옷이 사라졌어요... 누가 가져간 걸까요? ㅋㅋ',
      author: '웃음사랑',
      category: 'humor',
      createdAt: '2024-01-13',
      views: 234,
      replies: 25
    },
    {
      id: 4,
      title: '강남역 근처 맛있는 치킨집 발견!',
      content: '강남역 3번 출구 근처에 새로 생긴 치킨집인데 정말 맛있어요. 가성비도 좋고 추천합니다!',
      author: '맛집탐험가',
      category: 'info',
      createdAt: '2024-01-12',
      views: 156,
      replies: 15
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 실제로는 API 호출
    console.log('새 글 작성:', newPost)
    setNewPost({ title: '', content: '', category: 'free' })
    setShowWriteForm(false)
  }

  const featuredStory = {
    id: '1',
    title: '강남역 고시원에서 2년간 살면서 배운 것들',
    excerpt: '처음 고시원에 입주할 때는 걱정이 많았는데, 지금은 정말 만족하며 살고 있어요. 고시원 라이프의 모든 것을 공유합니다.',
    author: '김고시생',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    publishedAt: '2024-01-15',
    readTime: '8분',
    views: 1247,
    likes: 89,
    category: 'interview',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=400&fit=crop'
  }

  const stories = [
    {
      id: '2',
      title: '6평 고시원을 10평처럼 보이게 하는 꿀팁',
      excerpt: '작은 공간을 효율적으로 활용하는 방법들을 소개합니다. 실제로 적용해보니 정말 만족해요!',
      author: '인테리어러버',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      publishedAt: '2024-01-14',
      readTime: '5분',
      views: 892,
      likes: 67,
      category: 'tips',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop'
    },
    {
      id: '3',
      title: '홍대입구 맛집 베스트 10곳',
      excerpt: '홍대입구 고시원에서 1년간 살면서 발견한 진짜 맛집들을 소개합니다. 가성비 최고!',
      author: '맛집탐험가',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      publishedAt: '2024-01-13',
      readTime: '6분',
      views: 756,
      likes: 45,
      category: 'guide',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop'
    },
    {
      id: '4',
      title: '고시원에서 공부하는 법 - 조용한 환경 만들기',
      excerpt: '시험 준비생들을 위한 고시원 공부 환경 조성법을 알려드립니다.',
      author: '공부하는사람',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      publishedAt: '2024-01-12',
      readTime: '7분',
      views: 634,
      likes: 52,
      category: 'study',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop'
    },
    {
      id: '5',
      title: '고시원 이웃과 친해지는 방법',
      excerpt: '고시원에서 혼자가 아닌 따뜻한 이웃들과 함께 사는 법을 공유합니다.',
      author: '친화력만렙',
      authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      publishedAt: '2024-01-11',
      readTime: '4분',
      views: 523,
      likes: 38,
      category: 'life',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop'
    },
    {
      id: '6',
      title: '월 30만원으로 사는 고시원 꾸미기',
      excerpt: '예산에 맞춰 고시원을 예쁘게 꾸미는 방법을 알려드립니다. 월 30만원으로 가능해요!',
      author: '절약마스터',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      publishedAt: '2024-01-10',
      readTime: '9분',
      views: 445,
      likes: 41,
      category: 'tips',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop'
    }
  ]

  const popularTags = [
    '고시원꾸미기', '인테리어', '맛집', '공부법', '절약', '이웃', '생활팁', '지역정보'
  ]

  return (
    <div className="bg-secondary-200 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-info-600 to-info-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4 text-gray-800">고시원 스토리</h1>
            <p className="text-xl mb-8 text-gray-600">
              입주자들의 생생한 이야기와 자유로운 소통 공간
            </p>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-white text-info-600 shadow-lg font-semibold'
                          : 'bg-gray-200 text-gray-700 font-medium'
                      }`}
                    >
                      <Icon size={18} />
                      <span>{tab.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <button 
              onClick={() => setShowWriteForm(true)}
              className="btn-primary bg-white text-info-600 hover:bg-gray-100"
            >
              <Plus size={18} className="mr-2" />
              {activeTab === 'stories' ? '스토리 작성하기' : '글쓰기'}
            </button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Write Form Modal */}
        {showWriteForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowWriteForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-accent-800">
                  {activeTab === 'stories' ? '새 스토리 작성' : '새 글 작성'}
                </h3>
                <button
                  onClick={() => setShowWriteForm(false)}
                  className="text-accent-500 hover:text-accent-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    제목
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="w-full p-3 border border-accent-200 rounded-lg focus:ring-2 focus:ring-info-500 focus:border-transparent"
                    placeholder="제목을 입력하세요"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    내용
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    rows={8}
                    className="w-full p-3 border border-accent-200 rounded-lg focus:ring-2 focus:ring-info-500 focus:border-transparent"
                    placeholder="내용을 입력하세요"
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowWriteForm(false)}
                    className="px-4 py-2 text-accent-600 hover:text-accent-800"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    작성하기
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'stories' ? (
          <>
            {/* Featured Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12"
            >
              <div className="card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="relative">
                    <img
                      src={featuredStory.image}
                      alt={featuredStory.title}
                      className="w-full h-64 lg:h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-info-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        추천 스토리
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-info-100 text-info-700 px-2 py-1 rounded text-xs font-medium">
                        입주자 인터뷰
                      </span>
                      <span className="text-accent-500 text-sm">{featuredStory.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-accent-800 mb-4">{featuredStory.title}</h2>
                    <p className="text-accent-600 mb-6 line-clamp-3">{featuredStory.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={featuredStory.authorAvatar}
                          alt={featuredStory.author}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-accent-800">{featuredStory.author}</p>
                          <p className="text-sm text-accent-500">{featuredStory.publishedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-accent-500">
                        <span>조회 {featuredStory.views}</span>
                        <span>좋아요 {featuredStory.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                {/* Categories */}
                <div className="card mb-6">
                  <h3 className="text-lg font-semibold text-accent-800 mb-4">카테고리</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                          activeCategory === category.id
                            ? 'bg-info-100 text-info-700'
                            : 'text-accent-600 hover:bg-secondary-100'
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm bg-accent-100 text-accent-600 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="card mb-6">
                  <h3 className="text-lg font-semibold text-accent-800 mb-4">인기 태그</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        className="bg-secondary-100 text-accent-700 px-3 py-1 rounded-full text-sm hover:bg-accent-100 transition-colors duration-200"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trending Stories */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-accent-800 mb-4">트렌딩</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <TrendingUp size={16} className="text-info-600" />
                      <div>
                        <p className="text-sm font-medium text-accent-800 line-clamp-1">
                          고시원에서 공부하는 법
                        </p>
                        <p className="text-xs text-accent-500">1,247 조회</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp size={16} className="text-info-600" />
                      <div>
                        <p className="text-sm font-medium text-accent-800 line-clamp-1">
                          월 30만원 꾸미기
                        </p>
                        <p className="text-xs text-accent-500">892 조회</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp size={16} className="text-info-600" />
                      <div>
                        <p className="text-sm font-medium text-accent-800 line-clamp-1">
                          홍대입구 맛집 가이드
                        </p>
                        <p className="text-xs text-accent-500">756 조회</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-3"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stories.map((story) => (
                    <motion.div
                      key={story.id}
                      whileHover={{ y: -5 }}
                      className="card overflow-hidden cursor-pointer"
                    >
                      <div className="relative">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-info-500 text-white px-2 py-1 rounded text-xs font-medium">
                            {categories.find(c => c.id === story.category)?.name}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-accent-500 text-sm">{story.readTime}</span>
                          <span className="text-accent-400">•</span>
                          <span className="text-accent-500 text-sm">{story.publishedAt}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-accent-800 mb-3 line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-accent-600 mb-4 line-clamp-3">{story.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <img
                              src={story.authorAvatar}
                              alt={story.author}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-medium text-accent-700">{story.author}</span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-accent-500">
                            <span className="flex items-center">
                              <MessageCircle size={14} className="mr-1" />
                              {story.views}
                            </span>
                            <span className="flex items-center">
                              <Heart size={14} className="mr-1" />
                              {story.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg">이전</button>
                    <button className="px-3 py-2 bg-info-600 text-white rounded-lg">1</button>
                    <button className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg">2</button>
                    <button className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg">3</button>
                    <button className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg">다음</button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          // 자유게시판
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              {/* Categories */}
              <div className="card mb-6">
                <h3 className="text-lg font-semibold text-accent-800 mb-4">카테고리</h3>
                <div className="space-y-2">
                  {freeboardCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                        activeCategory === category.id
                          ? 'bg-info-100 text-info-700'
                          : 'text-accent-600 hover:bg-secondary-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="text-sm bg-accent-100 text-accent-600 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card">
                <h3 className="text-lg font-semibold text-accent-800 mb-4">게시판 현황</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-accent-600">총 게시글</span>
                    <span className="font-medium text-accent-800">156개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-accent-600">오늘 새글</span>
                    <span className="font-medium text-info-600">12개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-accent-600">활성 사용자</span>
                    <span className="font-medium text-accent-800">89명</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3"
            >
              {/* Search and Filter */}
              <div className="card mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400" size={20} />
                    <input
                      type="text"
                      placeholder="게시글 검색..."
                      className="w-full pl-10 pr-4 py-3 border border-accent-200 rounded-lg focus:ring-2 focus:ring-info-500 focus:border-transparent"
                    />
                  </div>
                  <button className="btn-secondary flex items-center">
                    <Filter size={18} className="mr-2" />
                    필터
                  </button>
                </div>
              </div>

              {/* Posts List */}
              <div className="space-y-4">
                {freeboardPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ y: -2 }}
                    className="card cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            post.category === 'complaint' ? 'bg-red-100 text-red-700' :
                            post.category === 'question' ? 'bg-blue-100 text-blue-700' :
                            post.category === 'humor' ? 'bg-yellow-100 text-yellow-700' :
                            post.category === 'info' ? 'bg-green-100 text-green-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {freeboardCategories.find(c => c.id === post.category)?.name}
                          </span>
                          <span className="text-sm text-accent-500">{post.createdAt}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-accent-800 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-accent-600 mb-3 line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-accent-500">
                            <span className="flex items-center">
                              <User size={14} className="mr-1" />
                              {post.author}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle size={14} className="mr-1" />
                              댓글 {post.replies}
                            </span>
                            <span>조회 {post.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg">이전</button>
                  <button className="px-3 py-2 bg-info-600 text-white rounded-lg">1</button>
                  <button className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg">2</button>
                  <button className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg">3</button>
                  <button className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg">다음</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
} 