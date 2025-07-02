'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MapPin, 
  MessageCircle, 
  Star, 
  Clock, 
  DollarSign,
  Search,
  Filter,
  Plus,
  Heart,
  Share2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function JobsCommunity() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: '전체', count: 156 },
    { id: 'cleaning', name: '청소', count: 23 },
    { id: 'management', name: '관리', count: 18 },
    { id: 'maintenance', name: '수리', count: 12 },
    { id: 'cooking', name: '요리', count: 8 },
    { id: 'other', name: '기타', count: 15 }
  ]

  const jobPosts = [
    {
      id: '1',
      type: '구인',
      title: '강남역 고시원 청소 도우미 구합니다',
      location: '서울 강남구',
      salary: '시급 12,000원',
      workType: '파트타임',
      experience: '경력 무관',
      description: '강남역 근처 고시원에서 청소 도우미를 구합니다. 주 3일, 하루 4시간 근무 가능하신 분 연락주세요.',
      postedBy: '김관리',
      postedAt: '2시간 전',
      views: 45,
      likes: 8,
      verified: true,
      urgent: true
    },
    {
      id: '2',
      type: '구직',
      title: '고시원 관리 경험자입니다',
      location: '서울 마포구',
      salary: '월급 250만원',
      workType: '풀타임',
      experience: '3년',
      description: '고시원 관리 경험 3년 있습니다. 청소, 수리, 입주자 관리 등 모든 업무 가능합니다.',
      postedBy: '이영희',
      postedAt: '5시간 전',
      views: 32,
      likes: 12,
      verified: true,
      urgent: false
    },
    {
      id: '3',
      type: '구인',
      title: '홍대입구 고시원 수리공 구합니다',
      location: '서울 마포구',
      salary: '일당 15만원',
      workType: '일용',
      experience: '경력 2년 이상',
      description: '홍대입구 고시원 수리 작업입니다. 전기, 수도, 문 수리 경험 있으신 분 연락주세요.',
      postedBy: '박사장',
      postedAt: '1일 전',
      views: 28,
      likes: 5,
      verified: false,
      urgent: false
    }
  ]

  const tabs = [
    { id: 'all', name: '전체' },
    { id: 'hiring', name: '구인' },
    { id: 'jobseeking', name: '구직' },
    { id: 'chat', name: '채팅' }
  ]

  return (
    <div className="bg-secondary-200 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-success-600 to-success-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">구인구직 커뮤니티</h1>
            <p className="text-xl opacity-90 mb-8">
              고시원에서 일할 사람을 찾고, 일자리를 구하는 사람들이 모이는 공간입니다
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-primary bg-white text-success-600 hover:bg-gray-100">
                <Plus size={18} className="mr-2" />
                구인글 작성
              </button>
              <button className="btn-outline border-white text-white hover:bg-white hover:text-success-600">
                <Users size={18} className="mr-2" />
                구직글 작성
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400" size={20} />
                <input
                  type="text"
                  placeholder="직종, 지역, 키워드로 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400" size={20} />
                <select className="input-field pl-10">
                  <option>전체 지역</option>
                  <option>강남구</option>
                  <option>마포구</option>
                  <option>서대문구</option>
                </select>
              </div>
            </div>
            <div>
              <button className="btn-secondary w-full">
                <Filter size={18} className="mr-2" />
                필터
              </button>
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
                    onClick={() => setActiveTab(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === category.id
                        ? 'bg-accent-100 text-accent-700'
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
              <h3 className="text-lg font-semibold text-accent-800 mb-4">오늘의 통계</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-accent-600">새 구인글</span>
                  <span className="font-semibold text-accent-800">12개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent-600">새 구직글</span>
                  <span className="font-semibold text-accent-800">8개</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-accent-600">매칭 성사</span>
                  <span className="font-semibold text-success-600">5건</span>
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
            {/* Tabs */}
            <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-soft mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-success-500 text-white shadow-soft'
                      : 'text-accent-600 hover:text-accent-700 hover:bg-secondary-100'
                  }`}
                >
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Job Posts */}
            <div className="space-y-4">
              {jobPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="card hover:shadow-medium transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        post.type === '구인' 
                          ? 'bg-success-100 text-success-700'
                          : 'bg-info-100 text-info-700'
                      }`}>
                        {post.type}
                      </div>
                      {post.urgent && (
                        <div className="px-2 py-1 bg-warning-100 text-warning-700 rounded-full text-xs font-medium">
                          긴급
                        </div>
                      )}
                      {post.verified && (
                        <CheckCircle size={16} className="text-success-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-accent-400 hover:text-accent-600 transition-colors duration-200">
                        <Heart size={16} />
                      </button>
                      <button className="p-2 text-accent-400 hover:text-accent-600 transition-colors duration-200">
                        <Share2 size={16} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-accent-800 mb-2">{post.title}</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-sm text-accent-600">
                      <MapPin size={14} className="mr-1" />
                      {post.location}
                    </div>
                    <div className="flex items-center text-sm text-accent-600">
                      <DollarSign size={14} className="mr-1" />
                      {post.salary}
                    </div>
                    <div className="flex items-center text-sm text-accent-600">
                      <Clock size={14} className="mr-1" />
                      {post.workType}
                    </div>
                    <div className="flex items-center text-sm text-accent-600">
                      <Users size={14} className="mr-1" />
                      {post.experience}
                    </div>
                  </div>

                  <p className="text-accent-600 mb-4 line-clamp-2">{post.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-accent-500">
                      <span>{post.postedBy}</span>
                      <span>{post.postedAt}</span>
                      <span>조회 {post.views}</span>
                      <span>좋아요 {post.likes}</span>
                    </div>
                    <button className="btn-primary">
                      <MessageCircle size={16} className="mr-2" />
                      연락하기
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="btn-outline">
                더 많은 글 보기
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 