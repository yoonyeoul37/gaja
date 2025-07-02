'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, 
  MapPin, 
  Wifi, 
  Snowflake, 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  Train, 
  GraduationCap, 
  Clock, 
  Tag, 
  AlertTriangle, 
  Percent, 
  Gift, 
  Bed, 
  UserCheck, 
  CalendarDays,
  Phone,
  Mail,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Utensils,
  Coffee,
  Tv,
  WashingMachine,
  Wifi as WifiIcon,
  AirVent,
  Refrigerator,
  Microwave,
  Toaster,
  Blender,
  Coffee as CoffeeIcon,
  Thermometer,
  Shield,
  Wifi as WifiIcon2
} from 'lucide-react'
import ReservationModal from '@/components/ReservationModal'
import VisitModal from '@/components/VisitModal'

interface GosiwonDetailProps {
  params: {
    id: string
  }
}

export default function GosiwonDetailPage({ params }: GosiwonDetailProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showReservationModal, setShowReservationModal] = useState(false)
  const [showVisitModal, setShowVisitModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)

  // 샘플 데이터 (나중에 실제 데이터로 교체)
  const gosiwon = {
    id: params.id,
    name: '청담고시원',
    address: '서울특별시 강남구 청담동 123-45',
    homepage: 'https://www.cheongdam-gosiwon.com',
    subway: {
      line: '2호선',
      station: '강남역',
      exit: '3번출구',
      distance: '도보 5분'
    },
    rating: 4.5,
    reviewCount: 128,
    price: {
      deposit: 500000,
      monthly: 350000
    },
    images: [
      '/placeholder-image.jpg',
      '/placeholder-image.jpg',
      '/placeholder-image.jpg'
    ],
    description: '청담동 중심가에 위치한 깔끔하고 안전한 고시원입니다. 대학생과 직장인들이 많이 이용하며, 편리한 교통과 다양한 편의시설을 제공합니다.',
    basicInfo: {
      openingYear: '2019년 3월',
      floors: '5층',
      totalRooms: 25,
      operationHours: '24시간',
      checkIn: '14:00',
      checkOut: '11:00'
    },
    // 예약 가능한 방 정보 (구체적인 호수별)
    availableRooms: [
      {
        id: 'room-202',
        type: '1인실',
        roomNumber: '202호',
        floor: '2층',
        size: '3.5평',
        price: 350000,
        deposit: 500000,
        image: '/placeholder-room-202.jpg',
        available: true,
        windowType: '외창',
        facilities: ['에어컨', 'TV', '침대', '책상', '장롱', '냉장고'],
        options: {
          individualAircon: true,
          centralAircon: false,
          tv: true,
          bed: true,
          desk: true,
          closet: true,
          refrigerator: true,
          shoerack: true,
          electronicLock: true,
          privateShower: true,
          privateBathroom: true
        }
      },
      {
        id: 'room-305',
        type: '1인실',
        roomNumber: '305호',
        floor: '3층',
        size: '3.5평',
        price: 380000,
        deposit: 550000,
        image: '/placeholder-room-305.jpg',
        available: true,
        windowType: '외창',
        facilities: ['에어컨', 'TV', '침대', '책상', '장롱', '냉장고'],
        options: {
          individualAircon: true,
          centralAircon: false,
          tv: true,
          bed: true,
          desk: true,
          closet: true,
          refrigerator: true,
          shoerack: true,
          electronicLock: true,
          privateShower: true,
          privateBathroom: true
        }
      },
      {
        id: 'room-401',
        type: '2인실',
        roomNumber: '401호',
        floor: '4층',
        size: '5평',
        price: 250000,
        deposit: 300000,
        image: '/placeholder-room-401.jpg',
        available: true,
        windowType: '내창(복도창)',
        facilities: ['에어컨', '침대', '책상', '장롱'],
        options: {
          individualAircon: false,
          centralAircon: true,
          tv: false,
          bed: true,
          desk: true,
          closet: true,
          refrigerator: false,
          shoerack: true,
          electronicLock: false,
          privateShower: true,
          privateBathroom: false
        }
      },
      {
        id: 'room-502',
        type: '4인실',
        roomNumber: '502호',
        floor: '5층',
        size: '8평',
        price: 180000,
        deposit: 200000,
        image: '/placeholder-room-502.jpg',
        available: false, // 예약 불가능한 방 예시
        windowType: '창문 없음',
        facilities: ['에어컨', '침대', '책상', '장롱'],
        options: {
          individualAircon: false,
          centralAircon: true,
          tv: false,
          bed: true,
          desk: true,
          closet: true,
          refrigerator: false,
          shoerack: false,
          electronicLock: false,
          privateShower: false,
          privateBathroom: false
        }
      }
    ],
    // 기존 roomTypes는 기본 정보용으로 유지
    roomTypes: [
      {
        type: '1인실',
        size: '3.5평',
        priceRange: {
          min: 300000,
          max: 400000
        },
        depositRange: {
          min: 400000,
          max: 600000
        },
        available: 2,
        scheduledVacancy: 1,
        windowType: '외창',
        facilities: ['에어컨', 'TV', '침대', '책상', '장롱', '냉장고'],
        options: {
          individualAircon: true,
          centralAircon: false,
          tv: true,
          bed: true,
          desk: true,
          closet: true,
          refrigerator: true,
          shoerack: true,
          electronicLock: true,
          privateShower: true,
          privateBathroom: true
        }
      },
      {
        type: '2인실',
        size: '5평',
        priceRange: {
          min: 200000,
          max: 300000
        },
        depositRange: {
          min: 250000,
          max: 350000
        },
        available: 1,
        scheduledVacancy: 0,
        windowType: '내창(복도창)',
        facilities: ['에어컨', '침대', '책상', '장롱'],
        options: {
          individualAircon: false,
          centralAircon: true,
          tv: false,
          bed: true,
          desk: true,
          closet: true,
          refrigerator: false,
          shoerack: true,
          electronicLock: false,
          privateShower: true,
          privateBathroom: false
        }
      },
      {
        type: '4인실',
        size: '8평',
        priceRange: {
          min: 150000,
          max: 200000
        },
        depositRange: {
          min: 150000,
          max: 250000
        },
        available: 0,
        scheduledVacancy: 2,
        windowType: '창문 없음',
        facilities: ['에어컨', '침대', '책상', '장롱'],
        options: {
          individualAircon: false,
          centralAircon: true,
          tv: false,
          bed: true,
          desk: true,
          closet: true,
          refrigerator: false,
          shoerack: false,
          electronicLock: false,
          privateShower: false,
          privateBathroom: false
        }
      }
    ],
    rules: {
      gender: '공용',
      floorSeparation: '남녀분리층',
      ageLimit: '20세 이상',
      minStay: '1주일',
      maxStay: '1년',
      companionAllowed: false,
      contractOptions: [
        { period: '1주일', discount: 0, description: '단기 체류' },
        { period: '2주일', discount: 0, description: '단기 체류' },
        { period: '1개월', discount: 0, description: '기본' },
        { period: '3개월', discount: 3, description: '3% 할인' },
        { period: '6개월', discount: 8, description: '8% 할인' },
        { period: '1년', discount: 12, description: '12% 할인' }
      ]
    },
    meals: {
      ramen: true,
      rice: true,
      kimchi: true,
      egg: true,
      sideDishes: true,
      soup: false,
      dessert: false,
      milk: true,
      fruit: true
    },
    kitchenFacilities: {
      microwave: true,
      refrigerator: true,
      waterPurifier: true,
      gasStove: true,
      dishwasher: true,
      coffeeMachine: true,
      toaster: true,
      blender: true,
      oven: false
    },
    commonFacilities: {
      shower: true,
      laundry: true,
      laundryDetergent: true,
      fabricSoftener: true,
      kitchen: true,
      bathroom: true,
      dryer: true,
      wifi: true,
      security: true,
      temperatureControl: true
    },
    reviews: [
      {
        id: 1,
        author: '김학생',
        rating: 5,
        date: '2024-01-15',
        content: '깔끔하고 안전해서 좋습니다. 위치도 좋고 편의시설도 잘 되어있어요.',
        helpful: 12
      },
      {
        id: 2,
        author: '이직장인',
        rating: 4,
        date: '2024-01-10',
        content: '가격 대비 만족스럽습니다. 다만 소음이 조금 있는 편이에요.',
        helpful: 8
      }
    ]
  }

  const tabs = [
    { id: 'overview', name: '개요', icon: Home },
    { id: 'rooms', name: '예약 가능한 방', icon: Bed },
    { id: 'facilities', name: '시설', icon: Wifi },
    { id: 'reviews', name: '리뷰', icon: MessageSquare },
    { id: 'location', name: '위치', icon: MapPin }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">{gosiwon.name}</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={gosiwon.images[currentImageIndex]}
                  alt={gosiwon.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              
              {/* Image Navigation */}
              {gosiwon.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? gosiwon.images.length - 1 : prev - 1)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === gosiwon.images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Image Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {gosiwon.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{gosiwon.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin size={16} />
                    <span>{gosiwon.address}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Train size={16} />
                    <span>{gosiwon.subway.line} {gosiwon.subway.station} {gosiwon.subway.exit}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {renderStars(gosiwon.rating)}
                  <span className="text-gray-600">리뷰 {gosiwon.reviewCount}개</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">보증금</p>
                    <p className="text-lg font-semibold">{formatPrice(gosiwon.price.deposit)}원</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">월세</p>
                    <p className="text-lg font-semibold">{formatPrice(gosiwon.price.monthly)}원</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <a
                  href={gosiwon.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>홈페이지 바로가기</span>
                </a>
                <button 
                  onClick={() => setShowVisitModal(true)}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MapPin size={20} />
                  <span>방문하기</span>
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Heart size={20} />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-4">고시원 소개</h3>
              <p className="text-gray-700 leading-relaxed">{gosiwon.description}</p>
            </div>

            {/* Basic Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">기본 정보</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">개업년도</p>
                  <p className="font-semibold">{gosiwon.basicInfo.openingYear}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">총 층수</p>
                  <p className="font-semibold">{gosiwon.basicInfo.floors}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">총 방 개수</p>
                  <p className="font-semibold">{gosiwon.basicInfo.totalRooms}개</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">운영시간</p>
                  <p className="font-semibold">{gosiwon.basicInfo.operationHours}</p>
                </div>
              </div>
              
              {/* 홈페이지 링크 */}
              <div className="mt-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600 mb-2">홈페이지</p>
                  <a 
                    href={gosiwon.homepage} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline font-medium flex items-center space-x-2"
                  >
                    <span>{gosiwon.homepage}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div>
              <h3 className="text-xl font-semibold mb-4">입주 규정</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">성별 구분</p>
                  <p className="font-semibold">{gosiwon.rules.gender}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">층별 구분</p>
                  <p className="font-semibold">{gosiwon.rules.floorSeparation}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">연령 제한</p>
                  <p className="font-semibold">{gosiwon.rules.ageLimit}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">최소 입주기간</p>
                  <p className="font-semibold">{gosiwon.rules.minStay}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">최대 입주기간</p>
                  <p className="font-semibold">{gosiwon.rules.maxStay}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-gray-600">남여혼숙 여부</p>
                  <p className="font-semibold">{gosiwon.rules.companionAllowed ? '가능' : '불가'}</p>
                </div>
              </div>

              {/* 계약 기간 옵션 */}
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="text-lg font-semibold mb-4">계약 기간 옵션</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {gosiwon.rules.contractOptions.map((option, index) => (
                    <div key={index} className="text-center p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="font-semibold text-gray-900">{option.period}</div>
                      {option.discount > 0 ? (
                        <div className="text-sm text-green-600 font-medium">{option.description}</div>
                      ) : (
                        <div className="text-sm text-gray-500">{option.description}</div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  * 할인율은 사업주별로 다를 수 있습니다. 정확한 할인율은 문의해 주세요.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">예약 가능한 방</h3>
              <div className="text-sm text-gray-600">
                총 {gosiwon.availableRooms.filter(room => room.available).length}개 방 예약 가능
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gosiwon.availableRooms
                .filter(room => room.available)
                .map((room, index) => (
                  <div key={room.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    {/* 방 이미지 */}
                    <div className="relative h-48 bg-gray-200">
                      <img
                        src={room.image}
                        alt={`${room.roomNumber} ${room.type}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {room.floor} {room.roomNumber}
                      </div>
                      <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        예약 가능
                      </div>
                    </div>

                    {/* 방 정보 */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{room.type}</h4>
                          <p className="text-gray-600">{room.size}</p>
                          <p className="text-gray-500 text-sm mt-1">창문: {room.windowType}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">보증금</p>
                          <p className="font-semibold text-gray-900">{formatPrice(room.deposit)}원</p>
                          <p className="text-sm text-gray-600">월세</p>
                          <p className="font-semibold text-lg text-blue-600">{formatPrice(room.price)}원</p>
                        </div>
                      </div>

                      {/* 주요 옵션 */}
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 mb-2">주요 옵션</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(room.options)
                            .filter(([key, value]) => value === true)
                            .slice(0, 6) // 최대 6개만 표시
                            .map(([key, value]) => (
                              <div key={key} className="flex items-center space-x-2">
                                <Check size={14} className="text-green-500 flex-shrink-0" />
                                <span className="text-sm text-gray-700">
                                  {key === 'individualAircon' ? '개인용 에어컨' : 
                                   key === 'centralAircon' ? '공동에어컨' : 
                                   key === 'tv' ? 'TV' : 
                                   key === 'bed' ? '침대' : 
                                   key === 'desk' ? '책상' : 
                                   key === 'closet' ? '장롱' : 
                                   key === 'refrigerator' ? '냉장고' :
                                   key === 'shoerack' ? '신발장' :
                                   key === 'electronicLock' ? '전자도어락' :
                                   key === 'privateShower' ? '개인 샤워실' :
                                   key === 'privateBathroom' ? '개인 화장실' : key}
                                </span>
                              </div>
                            ))}
                        </div>
                        {Object.entries(room.options).filter(([key, value]) => value === true).length > 6 && (
                          <p className="text-xs text-gray-500 mt-2">+ 더 많은 옵션</p>
                        )}
                      </div>

                      {/* 예약 버튼 */}
                      <button
                        onClick={() => {
                          setSelectedRoom(room)
                          setShowReservationModal(true)
                        }}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
                      >
                        <Calendar size={16} />
                        <span>예약하기</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* 공실 예정 방 안내 */}
            {gosiwon.availableRooms.filter(room => !room.available).length > 0 && (
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                  <Calendar size={20} className="mr-2" />
                  공실 예정 방
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {gosiwon.availableRooms
                    .filter(room => !room.available)
                    .map((room, index) => (
                      <div key={room.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-gray-900">{room.floor} {room.roomNumber}</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                {room.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{room.size} • {room.windowType}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">월세</p>
                            <p className="font-semibold text-blue-600">{formatPrice(room.price)}원</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar size={14} className="text-blue-600" />
                            <span className="text-gray-700">공실 예정: <span className="font-medium">12월 15일</span></span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock size={14} className="text-blue-600" />
                            <span className="text-gray-700">보증금: <span className="font-medium">{formatPrice(room.deposit)}원</span></span>
                          </div>
                        </div>

                        <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
                          공실 알림 신청
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="space-y-8">
            {/* Meals */}
            <div>
              <h3 className="text-xl font-semibold mb-4">식사 제공</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {Object.entries(gosiwon.meals)
                  .filter(([key, value]) => value === true)
                  .map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded-lg border text-center">
                      <div className="flex justify-center mb-2">
                        <Check size={20} className="text-green-500" />
                      </div>
                      <p className="text-sm font-medium">
                        {key === 'ramen' ? '라면' : key === 'rice' ? '밥' : key === 'kimchi' ? '김치' : key === 'egg' ? '계란' : key === 'sideDishes' ? '반찬' : key === 'soup' ? '국' : key === 'dessert' ? '디저트' : key === 'milk' ? '우유' : '과일'}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Kitchen Facilities */}
            <div>
              <h3 className="text-xl font-semibold mb-4">주방 시설</h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {Object.entries(gosiwon.kitchenFacilities)
                  .filter(([key, value]) => value === true)
                  .map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded-lg border text-center">
                      <div className="flex justify-center mb-2">
                        <Check size={20} className="text-green-500" />
                      </div>
                      <p className="text-sm font-medium">
                        {key === 'microwave' ? '전자레인지' : key === 'refrigerator' ? '냉장고' : key === 'waterPurifier' ? '정수기' : key === 'gasStove' ? '가스레인지' : key === 'dishwasher' ? '식기세척기' : key === 'coffeeMachine' ? '커피머신' : key === 'toaster' ? '토스터기' : key === 'blender' ? '믹서기' : '오븐'}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Common Facilities */}
            <div>
              <h3 className="text-xl font-semibold mb-4">공용 시설</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(gosiwon.commonFacilities)
                  .filter(([key, value]) => value === true)
                  .map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center space-x-3">
                        <div className="flex justify-center w-8">
                          <Check size={20} className="text-green-500" />
                        </div>
                        <span className="font-medium">
                          {key === 'shower' ? '샤워실' : 
                           key === 'laundry' ? '세탁기' : 
                           key === 'laundryDetergent' ? '세탁세제 제공' :
                           key === 'fabricSoftener' ? '섬유유연제 제공' :
                           key === 'kitchen' ? '주방' : 
                           key === 'bathroom' ? '화장실' : 
                           key === 'dryer' ? '건조기' : 
                           key === 'wifi' ? 'WiFi' : 
                           key === 'security' ? '보안' : 
                           key === 'temperatureControl' ? '온도조절' : key}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">리뷰</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                리뷰 작성
              </button>
            </div>
            
            {gosiwon.reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">{review.author}</span>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    <MessageSquare size={16} />
                  </button>
                </div>
                <p className="text-gray-700 mb-4">{review.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-blue-600">
                    <span>👍</span>
                    <span>도움됨 ({review.helpful})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'location' && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">위치 정보</h3>
            
            <div className="bg-white rounded-lg border p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">주소</h4>
                  <p className="text-gray-700">{gosiwon.address}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">지하철</h4>
                  <div className="flex items-center space-x-2">
                    <Train size={16} />
                    <span>{gosiwon.subway.line} {gosiwon.subway.station} {gosiwon.subway.exit}</span>
                    <span className="text-gray-500">({gosiwon.subway.distance})</span>
                  </div>
                </div>
              </div>
              
              {/* 지도 영역 (나중에 실제 지도 API 연동) */}
              <div className="mt-6 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">지도가 여기에 표시됩니다</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={showReservationModal}
        onClose={() => setShowReservationModal(false)}
        gosiwon={gosiwon}
        selectedRoom={selectedRoom}
      />

      {/* Visit Modal */}
      <VisitModal
        isOpen={showVisitModal}
        onClose={() => setShowVisitModal(false)}
        gosiwon={gosiwon}
      />
    </div>
  )
} 