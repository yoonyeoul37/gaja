'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, MapPin, Wifi, Snowflake, Home, Users, Calendar, MessageSquare, Train, GraduationCap, Clock, Tag, AlertTriangle, Percent, Gift, Bed, UserCheck, CalendarDays } from 'lucide-react'
import { Gosiwon } from '@/lib/data'

interface GosiwonCardProps {
  gosiwon: Gosiwon
  onReserve: (gosiwon: Gosiwon) => void
}

export default function GosiwonCard({ gosiwon, onReserve }: GosiwonCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showRoomDetails, setShowRoomDetails] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  const getFacilityIcon = (facility: string) => {
    switch (facility) {
      case 'WiFi':
        return <Wifi size={16} />
      case '에어컨':
        return <Snowflake size={16} />
      case '주방':
        return <Home size={16} />
      default:
        return <div className="w-4 h-4 bg-accent-300 rounded-full" />
    }
  }

  const getAvailabilityStatus = () => {
    const { availableRooms = 0, totalRooms = 0, scheduledVacancyRooms = 0 } = gosiwon.roomStatus || {}
    const occupancyRate = gosiwon.occupancyRate || 0

    if (availableRooms === 0 && scheduledVacancyRooms === 0) {
      return { text: '마감', color: 'bg-red-500', bgColor: 'bg-red-100', textColor: 'text-red-800' }
    } else if (availableRooms === 0 && scheduledVacancyRooms > 0) {
      return { text: '공실예정', color: 'bg-blue-500', bgColor: 'bg-blue-100', textColor: 'text-blue-800' }
    } else if (availableRooms <= 2) {
      return { text: '마감임박', color: 'bg-orange-500', bgColor: 'bg-orange-100', textColor: 'text-orange-800' }
    } else if (occupancyRate <= 30) {
      return { text: '많은 빈방', color: 'bg-green-500', bgColor: 'bg-green-100', textColor: 'text-green-800' }
    } else if (occupancyRate <= 60) {
      return { text: '입주가능', color: 'bg-blue-500', bgColor: 'bg-blue-100', textColor: 'text-blue-800' }
    } else {
      return { text: '입주가능', color: 'bg-green-500', bgColor: 'bg-green-100', textColor: 'text-green-800' }
    }
  }

  const getPromotionBadge = () => {
    if (!gosiwon.marketing || !gosiwon.marketing.promotion) return null

    const { promotionType, discountRate, urgencyLevel } = gosiwon.marketing
    
    let icon = <Tag size={12} />
    let text = gosiwon.marketing.promotionDescription || '프로모션'
    let bgColor = 'bg-purple-500'
    
    switch (promotionType) {
      case 'discount':
        icon = <Percent size={12} />
        text = `${Math.round((discountRate || 0) * 100)}% 할인`
        bgColor = 'bg-red-500'
        break
      case 'free_deposit':
        icon = <Gift size={12} />
        text = '보증금 무료'
        bgColor = 'bg-green-500'
        break
      case 'first_month_free':
        icon = <Gift size={12} />
        text = '첫달 무료'
        bgColor = 'bg-blue-500'
        break
      case 'referral_bonus':
        icon = <Users size={12} />
        text = '추천인 보너스'
        bgColor = 'bg-purple-500'
        break
      case 'early_bird':
        icon = <Clock size={12} />
        text = '얼리버드 할인'
        bgColor = 'bg-orange-500'
        break
    }

    return { icon, text, bgColor, urgencyLevel }
  }

  const getScheduledVacancyBadge = () => {
    if (!gosiwon.roomStatus || gosiwon.roomStatus.scheduledVacancyRooms === 0) return null

    return {
      icon: <CalendarDays size={12} />,
      text: `${gosiwon.roomStatus.scheduledVacancyRooms}개 공실예정`,
      bgColor: 'bg-blue-500'
    }
  }

  const availabilityStatus = getAvailabilityStatus()
  const promotionBadge = getPromotionBadge()
  const scheduledVacancyBadge = getScheduledVacancyBadge()

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700'
      case 'occupied':
        return 'bg-gray-100 text-gray-700'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700'
      case 'reserved':
        return 'bg-purple-100 text-purple-700'
      case 'scheduled_vacancy':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getRoomStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return '입주가능'
      case 'occupied':
        return '입주중'
      case 'maintenance':
        return '점검중'
      case 'reserved':
        return '예약됨'
      case 'scheduled_vacancy':
        return '공실예정'
      default:
        return '알 수 없음'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card group hover:shadow-large transition-all duration-300 overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={gosiwon.images && gosiwon.images[currentImageIndex] ? gosiwon.images[currentImageIndex] : '/placeholder-image.jpg'}
          alt={gosiwon.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Image Navigation */}
        {gosiwon.images && gosiwon.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {gosiwon.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Availability Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${availabilityStatus.color} text-white`}>
          {availabilityStatus.text}
        </div>

        {/* Promotion Badge */}
        {promotionBadge && (
          <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${promotionBadge.bgColor} text-white flex items-center space-x-1`}>
            {promotionBadge.icon}
            <span>{promotionBadge.text}</span>
          </div>
        )}

        {/* Scheduled Vacancy Badge */}
        {scheduledVacancyBadge && (
          <div className={`absolute top-12 left-3 px-2 py-1 rounded-full text-xs font-medium ${scheduledVacancyBadge.bgColor} text-white flex items-center space-x-1`}>
            {scheduledVacancyBadge.icon}
            <span>{scheduledVacancyBadge.text}</span>
          </div>
        )}

        {/* Rating */}
        <div className={`absolute ${promotionBadge ? 'top-12' : 'top-3'} ${scheduledVacancyBadge ? 'top-20' : ''} left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-sm flex items-center`}>
          <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
          {gosiwon.rating}
        </div>

        {/* Urgency Indicator */}
        {promotionBadge && promotionBadge.urgencyLevel === 'high' && (
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 animate-pulse">
            <AlertTriangle size={12} />
            <span>긴급</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Location */}
        <div className="mb-3">
          <h3 className="font-semibold text-accent-800 mb-1 line-clamp-1">
            {gosiwon.name}
          </h3>
          <div className="flex items-center text-accent-600 text-sm">
            <MapPin size={14} className="mr-1" />
            <span className="line-clamp-1">{gosiwon.location}</span>
          </div>
        </div>

        {/* Room Status Info */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${availabilityStatus.bgColor} ${availabilityStatus.textColor}`}>
                빈방 {gosiwon.roomStatus?.availableRooms || 0}개
              </span>
              {gosiwon.roomStatus && gosiwon.roomStatus.scheduledVacancyRooms > 0 && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  공실예정 {gosiwon.roomStatus.scheduledVacancyRooms}개
                </span>
              )}
              <span className="text-accent-600">
                총 {gosiwon.roomStatus?.totalRooms || 0}개
              </span>
            </div>
            <div className="text-accent-600">
              입주율 {gosiwon.occupancyRate || 0}%
            </div>
          </div>
        </div>

        {/* Subway Station and University Info */}
        <div className="mb-3">
          <div className="flex items-center text-sm text-accent-600 mb-1">
            <Train size={14} className="mr-1 text-primary-600" />
            <span className="font-medium text-primary-700">{gosiwon.subwayStation}</span>
            <span className="mx-1">•</span>
            <span>도보 {gosiwon.distance.subway}분</span>
          </div>
          <div className="flex items-center text-sm text-accent-600">
            <GraduationCap size={14} className="mr-1 text-primary-600" />
            <span className="line-clamp-1">
              {gosiwon.nearbyUniversities && gosiwon.nearbyUniversities.slice(0, 2).join(', ')}
              {gosiwon.nearbyUniversities && gosiwon.nearbyUniversities.length > 2 && ' 외'}
            </span>
          </div>
        </div>

        {/* Price with Promotion */}
        <div className="mb-3">
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-accent-600">
              {formatPrice(gosiwon.price)}원
            </span>
            {gosiwon.marketing && gosiwon.marketing.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(gosiwon.marketing.originalPrice)}원
              </span>
            )}
            <span className="text-sm text-accent-500 ml-2">/월</span>
          </div>
          <div className="text-sm text-accent-600">
            보증금 {formatPrice(gosiwon.deposit)}원
            {gosiwon.marketing && gosiwon.marketing.promotionType === 'free_deposit' && (
              <span className="text-green-600 font-medium ml-1">→ 무료!</span>
            )}
          </div>
          {gosiwon.marketing && gosiwon.marketing.limitedTime && (
            <div className="text-xs text-red-600 mt-1 flex items-center">
              <Clock size={12} className="mr-1" />
              한정 시간 특가
            </div>
          )}
          {gosiwon.marketing && gosiwon.marketing.scheduledVacancyPromotion?.enabled && (
            <div className="text-xs text-blue-600 mt-1 flex items-center">
              <CalendarDays size={12} className="mr-1" />
              공실예정 방 사전예약 {Math.round((gosiwon.marketing.scheduledVacancyPromotion.discountRate || 0) * 100)}% 할인
            </div>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < Math.floor(gosiwon.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-accent-800">
                {gosiwon.rating}
              </span>
            </div>
            <div className="flex items-center text-sm text-accent-600">
              <MessageSquare size={14} className="mr-1" />
              <span>리뷰 {gosiwon.reviewCount || 0}개</span>
            </div>
          </div>
        </div>

        {/* Room Details Toggle */}
        <div className="mb-3">
          <button
            onClick={() => setShowRoomDetails(!showRoomDetails)}
            className="flex items-center text-sm text-accent-600 hover:text-accent-800 transition-colors duration-200"
          >
            <Bed size={14} className="mr-1" />
            방 상세보기
            <span className="ml-1">{showRoomDetails ? '▼' : '▶'}</span>
          </button>
        </div>

        {/* Room Details */}
        {showRoomDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 p-3 bg-secondary-50 rounded-lg"
          >
            <h4 className="text-sm font-medium text-accent-800 mb-2">방 현황</h4>
            {gosiwon.rooms && gosiwon.rooms.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-2">
                  {gosiwon.rooms.slice(0, 6).map((room) => (
                    <div key={room.id} className="text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{room.number}호</span>
                        <span className={`px-1 py-0.5 rounded text-xs ${getRoomStatusColor(room.status)}`}>
                          {getRoomStatusText(room.status)}
                        </span>
                      </div>
                      {room.scheduledVacancy && (
                        <div className="text-blue-600 text-xs mt-1">
                          {room.scheduledVacancy.expectedDate} 공실예정
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {gosiwon.rooms.length > 6 && (
                  <div className="text-xs text-accent-600 mt-2">
                    외 {gosiwon.rooms.length - 6}개 방...
                  </div>
                )}
              </>
            ) : (
              <div className="text-sm text-accent-600">
                방 정보를 불러오는 중입니다...
              </div>
            )}
          </motion.div>
        )}

        {/* Facilities */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm text-accent-600 mb-2">
            <span>편의시설</span>
            <span>{gosiwon.area}평</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {gosiwon.facilities && gosiwon.facilities.slice(0, 4).map((facility, index) => (
              <div
                key={index}
                className="flex items-center bg-secondary-100 text-accent-700 px-2 py-1 rounded-md text-xs"
              >
                {getFacilityIcon(facility)}
                <span className="ml-1">{facility}</span>
              </div>
            ))}
            {gosiwon.facilities && gosiwon.facilities.length > 4 && (
              <div className="bg-secondary-100 text-accent-700 px-2 py-1 rounded-md text-xs">
                +{gosiwon.facilities.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {gosiwon.tags && gosiwon.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-accent-100 text-accent-700 px-2 py-1 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Distance Info */}
        <div className="flex items-center justify-between text-sm text-accent-600 mb-4">
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span>지하철 {gosiwon.distance.subway}분</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>버스 {gosiwon.distance.bus}분</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onReserve(gosiwon)}
          disabled={!gosiwon.roomStatus || (gosiwon.roomStatus.availableRooms === 0 && gosiwon.roomStatus.scheduledVacancyRooms === 0)}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            gosiwon.roomStatus && (gosiwon.roomStatus.availableRooms > 0 || gosiwon.roomStatus.scheduledVacancyRooms > 0)
              ? 'btn-primary'
              : 'bg-accent-200 text-accent-500 cursor-not-allowed'
          }`}
        >
          {!gosiwon.roomStatus || (gosiwon.roomStatus.availableRooms === 0 && gosiwon.roomStatus.scheduledVacancyRooms === 0)
            ? '마감' 
            : gosiwon.roomStatus.availableRooms > 0
            ? gosiwon.roomStatus.availableRooms <= 2 
              ? '마감임박! 예약하기' 
              : '예약하기'
            : '공실예정 방 사전예약'
          }
        </button>
      </div>
    </motion.div>
  )
} 