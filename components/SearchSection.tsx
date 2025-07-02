'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Calendar, Filter, X, Train, GraduationCap, Tag, Percent, Gift, Clock, AlertTriangle, CalendarDays } from 'lucide-react'
import { 
  gosiwonData, 
  locations, 
  priceRanges, 
  subwayStations, 
  universities, 
  Gosiwon,
  filterBySubwayStation,
  filterByUniversity,
  filterByPromotion,
  filterByAvailability,
  sortByMarketingStrategy,
  getMarketingStats
} from '@/lib/data'
import GosiwonCard from './GosiwonCard'
import ReservationModal from './ReservationModal'

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('전체')
  const [selectedSubwayStation, setSelectedSubwayStation] = useState('전체')
  const [selectedUniversity, setSelectedUniversity] = useState('전체')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [selectedPromotion, setSelectedPromotion] = useState('전체')
  const [selectedAvailability, setSelectedAvailability] = useState('전체')
  const [sortStrategy, setSortStrategy] = useState('rating')
  const [filteredGosiwons, setFilteredGosiwons] = useState<Gosiwon[]>(gosiwonData)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGosiwon, setSelectedGosiwon] = useState<Gosiwon | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 마케팅 통계
  const marketingStats = getMarketingStats(filteredGosiwons)

  // 검색 및 필터링 로직
  useEffect(() => {
    let filtered = gosiwonData

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(gosiwon =>
        gosiwon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gosiwon.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gosiwon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // 지역 필터링
    if (selectedLocation !== '전체') {
      filtered = filtered.filter(gosiwon =>
        gosiwon.location.includes(selectedLocation)
      )
    }

    // 지하철역 필터링
    filtered = filterBySubwayStation(filtered, selectedSubwayStation)

    // 대학 필터링
    filtered = filterByUniversity(filtered, selectedUniversity)

    // 가격 범위 필터링
    if (selectedPriceRange.min > 0 || selectedPriceRange.max < 1000000) {
      filtered = filtered.filter(gosiwon =>
        gosiwon.price >= selectedPriceRange.min && gosiwon.price <= selectedPriceRange.max
      )
    }

    // 프로모션 필터링
    if (selectedPromotion !== '전체') {
      filtered = filterByPromotion(filtered, selectedPromotion)
    }

    // 가용성 필터링
    if (selectedAvailability !== '전체') {
      filtered = filterByAvailability(filtered, selectedAvailability as 'many_rooms' | 'few_rooms' | 'scheduled_vacancy' | 'urgent')
    }

    // 정렬
    filtered = sortByMarketingStrategy(filtered, sortStrategy as any)

    setFilteredGosiwons(filtered)
  }, [searchTerm, selectedLocation, selectedSubwayStation, selectedUniversity, selectedPriceRange, selectedPromotion, selectedAvailability, sortStrategy])

  const handleReserve = (gosiwon: Gosiwon) => {
    setSelectedGosiwon(gosiwon)
    setIsModalOpen(true)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedLocation('전체')
    setSelectedSubwayStation('전체')
    setSelectedUniversity('전체')
    setSelectedPriceRange(priceRanges[0])
    setSelectedPromotion('전체')
    setSelectedAvailability('전체')
    setSortStrategy('rating')
  }

  const hasActiveFilters = searchTerm || 
    selectedLocation !== '전체' || 
    selectedSubwayStation !== '전체' || 
    selectedUniversity !== '전체' || 
    selectedPriceRange.label !== '전체' ||
    selectedPromotion !== '전체' ||
    selectedAvailability !== '전체'

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title">고시원 검색</h2>
          <p className="section-subtitle">
            지하철역, 대학, 지역별로 원하는 고시원을 찾아보세요
          </p>
        </motion.div>

        {/* Marketing Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.02 }}
          className="max-w-4xl mx-auto mb-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{marketingStats.availableRooms}</div>
              <div className="text-sm text-green-700">빈방</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{marketingStats.promotionCount}</div>
              <div className="text-sm text-blue-700">프로모션</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{marketingStats.occupancyRate}%</div>
              <div className="text-sm text-orange-700">평균 입주율</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{filteredGosiwons.length}</div>
              <div className="text-sm text-purple-700">검색결과</div>
            </div>
          </div>
        </motion.div>

        {/* Marketing Quick Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.03 }}
          className="max-w-4xl mx-auto mb-6"
        >
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedPromotion('전체')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedPromotion === '전체'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-accent-700 hover:bg-secondary-200'
              }`}
            >
              <Tag size={16} className="inline mr-1" />
              전체
            </button>
            <button
              onClick={() => setSelectedPromotion('discount')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedPromotion === 'discount'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              <Percent size={16} className="inline mr-1" />
              할인
            </button>
            <button
              onClick={() => setSelectedPromotion('free_deposit')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedPromotion === 'free_deposit'
                  ? 'bg-green-500 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <Gift size={16} className="inline mr-1" />
              보증금 무료
            </button>
            <button
              onClick={() => setSelectedPromotion('first_month_free')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedPromotion === 'first_month_free'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <Gift size={16} className="inline mr-1" />
              첫달 무료
            </button>
            <button
              onClick={() => setSelectedPromotion('early_bird')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedPromotion === 'early_bird'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
            >
              <Clock size={16} className="inline mr-1" />
              얼리버드
            </button>
          </div>
        </motion.div>

        {/* Availability Quick Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.04 }}
          className="max-w-4xl mx-auto mb-6"
        >
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedAvailability('전체')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedAvailability === '전체'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-accent-700 hover:bg-secondary-200'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setSelectedAvailability('many_rooms')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedAvailability === 'many_rooms'
                  ? 'bg-green-500 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              많은 빈방
            </button>
            <button
              onClick={() => setSelectedAvailability('few_rooms')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedAvailability === 'few_rooms'
                  ? 'bg-orange-500 text-white'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
            >
              마감임박
            </button>
            <button
              onClick={() => setSelectedAvailability('scheduled_vacancy')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedAvailability === 'scheduled_vacancy'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <CalendarDays size={16} className="inline mr-1" />
              공실예정
            </button>
            <button
              onClick={() => setSelectedAvailability('urgent')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedAvailability === 'urgent'
                  ? 'bg-red-500 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              <AlertTriangle size={16} className="inline mr-1" />
              긴급
            </button>
          </div>
        </motion.div>

        {/* Quick Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-4xl mx-auto mb-6"
        >
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedSubwayStation('전체')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedSubwayStation === '전체'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-accent-700 hover:bg-secondary-200'
              }`}
            >
              <Train size={16} className="inline mr-1" />
              전체 지하철역
            </button>
            {subwayStations.slice(1, 7).map(station => (
              <button
                key={station}
                onClick={() => setSelectedSubwayStation(station)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedSubwayStation === station
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-accent-700 hover:bg-secondary-200'
                }`}
              >
                {station}
              </button>
            ))}
          </div>
        </motion.div>

        {/* University Quick Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedUniversity('전체')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedUniversity === '전체'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-accent-700 hover:bg-secondary-200'
              }`}
            >
              <GraduationCap size={16} className="inline mr-1" />
              전체 대학
            </button>
            {universities.slice(1, 7).map(university => (
              <button
                key={university}
                onClick={() => setSelectedUniversity(university)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedUniversity === university
                    ? 'bg-primary-600 text-white'
                    : 'bg-secondary-100 text-accent-700 hover:bg-secondary-200'
                }`}
              >
                {university.replace('학교', '')}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="card p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400" size={20} />
                  <input
                    type="text"
                    placeholder="고시원명, 지역, 태그로 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400" size={20} />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="input-field pl-10"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400" size={20} />
                  <select
                    value={selectedPriceRange.label}
                    onChange={(e) => {
                      const range = priceRanges.find(r => r.label === e.target.value)
                      if (range) setSelectedPriceRange(range)
                    }}
                    className="input-field pl-10"
                  >
                    {priceRanges.map(range => (
                      <option key={range.label} value={range.label}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Sort Options */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-accent-600">정렬:</span>
                <select
                  value={sortStrategy}
                  onChange={(e) => setSortStrategy(e.target.value)}
                  className="text-sm border border-accent-200 rounded-md px-3 py-1 bg-white"
                >
                  <option value="rating">평점순</option>
                  <option value="availability">빈방순</option>
                  <option value="discount">할인순</option>
                  <option value="urgency">긴급순</option>
                </select>
              </div>
              
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center text-sm text-accent-600 hover:text-accent-800 transition-colors duration-200"
                >
                  <X size={16} className="mr-1" />
                  필터 초기화
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-6"
          >
            <div className="flex flex-wrap gap-2">
              {selectedSubwayStation !== '전체' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                  <Train size={14} className="mr-1" />
                  {selectedSubwayStation}
                  <button
                    onClick={() => setSelectedSubwayStation('전체')}
                    className="ml-2 hover:text-primary-600"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedUniversity !== '전체' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                  <GraduationCap size={14} className="mr-1" />
                  {selectedUniversity}
                  <button
                    onClick={() => setSelectedUniversity('전체')}
                    className="ml-2 hover:text-primary-600"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedLocation !== '전체' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                  <MapPin size={14} className="mr-1" />
                  {selectedLocation}
                  <button
                    onClick={() => setSelectedLocation('전체')}
                    className="ml-2 hover:text-primary-600"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
              {selectedPriceRange.label !== '전체' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800">
                  {selectedPriceRange.label}
                  <button
                    onClick={() => setSelectedPriceRange(priceRanges[0])}
                    className="ml-2 hover:text-primary-600"
                  >
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <p className="text-accent-600">
            총 <span className="font-semibold text-accent-800">{filteredGosiwons.length}개</span>의 고시원을 찾았습니다
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              필터 초기화
            </button>
          )}
        </motion.div>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGosiwons.map((gosiwon, index) => (
            <motion.div
              key={gosiwon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <GosiwonCard
                gosiwon={gosiwon}
                onReserve={handleReserve}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredGosiwons.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-accent-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-accent-800 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-accent-600 mb-4">
              다른 검색어나 필터 조건을 시도해보세요
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              필터 초기화
            </button>
          </motion.div>
        )}
      </div>

      {/* Reservation Modal */}
      <ReservationModal
        gosiwon={selectedGosiwon}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedGosiwon(null)
        }}
      />
    </section>
  )
} 