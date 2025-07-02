'use client'

import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Users, Train, GraduationCap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary-200 via-primary-100 to-secondary-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-accent-800 mb-6">
              당신의 새로운 시작,
              <span className="text-accent-600"> 가자고시원</span>
            </h1>
            <p className="text-xl text-accent-600 mb-8 max-w-3xl mx-auto">
              지하철역별, 대학별로 편리하게 찾는 고시원. 
              사업주전용, 구인구직, 그리고 다양한 스토리를 만나보세요.
            </p>
          </motion.div>

          {/* Quick Search Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-3">
              <button className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-accent-700 font-medium hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl">
                <Train size={16} className="inline mr-2" />
                강남역 고시원
              </button>
              <button className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-accent-700 font-medium hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl">
                <GraduationCap size={16} className="inline mr-2" />
                서울대 근처
              </button>
              <button className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-accent-700 font-medium hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl">
                <GraduationCap size={16} className="inline mr-2" />
                연세대 근처
              </button>
              <button className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full text-accent-700 font-medium hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl">
                <Train size={16} className="inline mr-2" />
                홍대입구역
              </button>
            </div>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="card p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400" size={20} />
                    <input
                      type="text"
                      placeholder="지하철역, 대학, 지역으로 검색"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400" size={20} />
                    <input
                      type="date"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <div>
                  <button className="btn-primary w-full">
                    <Search size={18} className="mr-2" />
                    검색
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Train size={24} className="text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-accent-800 mb-2">지하철역별 검색</h3>
              <p className="text-accent-600 text-sm">원하는 지하철역 근처 고시원을 쉽게 찾아보세요</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap size={24} className="text-success-600" />
              </div>
              <h3 className="text-lg font-semibold text-accent-800 mb-2">대학별 검색</h3>
              <p className="text-accent-600 text-sm">대학 근처 고시원으로 통학 시간을 단축하세요</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-info-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin size={24} className="text-info-600" />
              </div>
              <h3 className="text-lg font-semibold text-accent-800 mb-2">실시간 예약</h3>
              <p className="text-accent-600 text-sm">원하는 고시원을 바로 예약하고 입주하세요</p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold text-accent-800 mb-2">1,200+</h3>
              <p className="text-accent-600">등록된 고시원</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Train size={32} className="text-success-600" />
              </div>
              <h3 className="text-2xl font-bold text-accent-800 mb-2">50+</h3>
              <p className="text-accent-600">지하철역</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-info-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={32} className="text-info-600" />
              </div>
              <h3 className="text-2xl font-bold text-accent-800 mb-2">30+</h3>
              <p className="text-accent-600">대학 근처</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-accent-800 mb-2">5,000+</h3>
              <p className="text-accent-600">만족한 고객</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </section>
  )
} 