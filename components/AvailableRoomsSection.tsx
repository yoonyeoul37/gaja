'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bed, MapPin, Calendar, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { gosiwonData } from '@/lib/data'
import ReservationModal from './ReservationModal'

interface AvailableRoom {
  id: string
  gosiwonId: string
  gosiwonName: string
  gosiwonLocation: string
  gosiwonRating: number
  gosiwonImage: string
  roomType: string
  size: string
  priceRange: {
    min: number
    max: number
  }
  depositRange: {
    min: number
    max: number
  }
  windowType: string
  facilities: string[]
  available: number
}

export default function AvailableRoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoom | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 모든 고시원에서 빈방이 있는 객실들을 추출
  const availableRooms: AvailableRoom[] = []
  
  gosiwonData.forEach(gosiwon => {
    if (gosiwon.rooms && gosiwon.rooms.length > 0) {
      gosiwon.rooms.forEach(room => {
        if (room.status === 'available') {
          availableRooms.push({
            id: room.id,
            gosiwonId: gosiwon.id,
            gosiwonName: gosiwon.name,
            gosiwonLocation: gosiwon.location,
            gosiwonRating: gosiwon.rating,
            gosiwonImage: gosiwon.images[0],
            roomType: room.type === 'single' ? '1인실' : room.type === 'double' ? '2인실' : room.type === 'studio' ? '원룸' : '공용실',
            size: `${room.area}평`,
            priceRange: {
              min: room.price,
              max: room.price
            },
            depositRange: {
              min: room.deposit,
              max: room.deposit
            },
            windowType: '외창', // 기본값으로 설정
            facilities: room.facilities,
            available: 1
          })
        }
      })
    }
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">({rating})</span>
      </div>
    )
  }

  const handleReserve = (room: AvailableRoom) => {
    setSelectedRoom(room)
    setIsModalOpen(true)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            현재 입주 가능한 방
          </h2>
          <p className="text-lg text-gray-600">
            지금 바로 입주할 수 있는 {availableRooms.length}개의 방을 확인해보세요
          </p>
        </motion.div>

        {/* Available Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {availableRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Room Image - Clickable */}
              <Link href={`/gosiwon/${room.gosiwonId}`}>
                <div className="relative h-48 bg-gray-200 cursor-pointer group">
                  <img
                    src={room.gosiwonImage}
                    alt={room.gosiwonName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      입주가능
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                      상세보기
                    </div>
                  </div>
                </div>
              </Link>

              {/* Room Info */}
              <div className="p-4">
                {/* Gosiwon Info */}
                <div className="mb-3">
                  <Link href={`/gosiwon/${room.gosiwonId}`} className="hover:text-primary-600 transition-colors">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {room.gosiwonName}
                    </h3>
                  </Link>
                  <div className="flex items-center text-xs text-gray-600 mb-2">
                    <MapPin size={12} className="mr-1" />
                    {room.gosiwonLocation}
                  </div>
                  {renderStars(room.gosiwonRating)}
                </div>

                {/* Room Type & Size */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-lg text-gray-900">
                      {room.roomType}
                    </h4>
                    <span className="text-sm text-gray-600">
                      {room.size}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    창문: {room.windowType}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-600">보증금</p>
                    <p className="font-semibold text-sm">
                      {formatPrice(room.depositRange.min)}원
                    </p>
                    <p className="text-xs text-gray-600">월세</p>
                    <p className="font-bold text-lg text-primary-600">
                      {formatPrice(room.priceRange.min)}원
                    </p>
                  </div>
                </div>

                {/* Facilities */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">주요 시설</p>
                  <div className="flex flex-wrap gap-1">
                    {room.facilities.slice(0, 4).map((facility, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {facility}
                      </span>
                    ))}
                    {room.facilities.length > 4 && (
                      <span className="text-xs text-gray-500">
                        +{room.facilities.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Reserve Button */}
                <button
                  onClick={() => handleReserve(room)}
                  className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Calendar size={16} />
                  <span>예약하기</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {availableRooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bed size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              현재 입주 가능한 방이 없습니다
            </h3>
            <p className="text-gray-500">
              곧 새로운 방이 추가될 예정입니다. 조금만 기다려주세요!
            </p>
          </motion.div>
        )}
      </div>

      {/* Reservation Modal */}
      {selectedRoom && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          gosiwon={{
            id: selectedRoom.id,
            name: selectedRoom.gosiwonName,
            location: selectedRoom.gosiwonLocation,
            rating: selectedRoom.gosiwonRating,
            price: selectedRoom.priceRange.min,
            images: [selectedRoom.gosiwonImage],
            tags: [],
            description: '',
            roomTypes: [{
              type: selectedRoom.roomType,
              size: selectedRoom.size,
              priceRange: selectedRoom.priceRange,
              depositRange: selectedRoom.depositRange,
              available: 1,
              scheduledVacancy: 0,
              windowType: selectedRoom.windowType,
              facilities: selectedRoom.facilities,
              options: {}
            }]
          }}
        />
      )}
    </section>
  )
} 