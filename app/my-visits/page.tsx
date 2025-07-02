'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  X, 
  CheckCircle, 
  AlertCircle,
  Trash2,
  Edit,
  Eye
} from 'lucide-react'

interface VisitReservation {
  id: string
  gosiwonName: string
  gosiwonAddress: string
  visitDate: string
  visitTime: string
  name: string
  phone: string
  gender: string
  ageGroup: string
  type: string
  message?: string
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  createdAt: string
}

export default function MyVisitsPage() {
  const [visits, setVisits] = useState<VisitReservation[]>([])
  const [selectedVisit, setSelectedVisit] = useState<VisitReservation | null>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 샘플 데이터 (실제로는 API에서 가져옴)
  useEffect(() => {
    const sampleVisits: VisitReservation[] = [
      {
        id: '1',
        gosiwonName: '청담고시원',
        gosiwonAddress: '서울특별시 강남구 청담동 123-45',
        visitDate: '2024-12-15',
        visitTime: '10:00-14:00',
        name: '김철수',
        phone: '010-1234-5678',
        gender: 'male',
        ageGroup: '20s',
        type: 'student',
        message: '방을 구경하고 싶습니다.',
        status: 'confirmed',
        createdAt: '2024-12-10'
      },
      {
        id: '2',
        gosiwonName: '강남고시원',
        gosiwonAddress: '서울특별시 강남구 역삼동 456-78',
        visitDate: '2024-12-20',
        visitTime: '14:00-18:00',
        name: '김철수',
        phone: '010-1234-5678',
        gender: 'male',
        ageGroup: '20s',
        type: 'student',
        status: 'pending',
        createdAt: '2024-12-12'
      },
      {
        id: '3',
        gosiwonName: '홍대고시원',
        gosiwonAddress: '서울특별시 마포구 홍대로 789-12',
        visitDate: '2024-12-08',
        visitTime: 'flexible',
        name: '김철수',
        phone: '010-1234-5678',
        gender: 'male',
        ageGroup: '20s',
        type: 'student',
        status: 'completed',
        createdAt: '2024-12-05'
      }
    ]

    setTimeout(() => {
      setVisits(sampleVisits)
      setIsLoading(false)
    }, 1000)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    })
  }

  const formatTime = (timeString: string) => {
    if (timeString === 'flexible') {
      return '시간 조율 가능'
    }
    
    if (timeString.includes('-')) {
      const [startTime, endTime] = timeString.split('-')
      const [startHour, startMin] = startTime.split(':')
      const [endHour, endMin] = endTime.split(':')
      
      const startHourNum = parseInt(startHour)
      const endHourNum = parseInt(endHour)
      
      const startAmpm = startHourNum >= 12 ? '오후' : '오전'
      const endAmpm = endHourNum >= 12 ? '오후' : '오전'
      
      const startDisplayHour = startHourNum > 12 ? startHourNum - 12 : startHourNum
      const endDisplayHour = endHourNum > 12 ? endHourNum - 12 : endHourNum
      
      return `${startAmpm} ${startDisplayHour}시~${endAmpm} ${endDisplayHour}시`
    }
    
    // 기존 단일 시간 처리 (하위 호환성)
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? '오후' : '오전'
    const displayHour = hour > 12 ? hour - 12 : hour
    return `${ampm} ${displayHour}시${minutes !== '00' ? ` ${minutes}분` : ''}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '확정됨'
      case 'pending':
        return '대기중'
      case 'cancelled':
        return '취소됨'
      case 'completed':
        return '완료됨'
      default:
        return '알 수 없음'
    }
  }

  const handleCancelVisit = (visit: VisitReservation) => {
    setSelectedVisit(visit)
    setShowCancelModal(true)
  }

  const confirmCancel = () => {
    if (selectedVisit) {
      setVisits(prev => prev.map(visit => 
        visit.id === selectedVisit.id 
          ? { ...visit, status: 'cancelled' as const }
          : visit
      ))
      setShowCancelModal(false)
      setSelectedVisit(null)
    }
  }

  const filteredVisits = visits.filter(visit => visit.status !== 'cancelled')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">방문 예약 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">내 방문 예약</h1>
              <p className="text-gray-600 mt-1">방문 예약 현황을 확인하고 관리하세요</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredVisits.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">방문 예약이 없습니다</h3>
            <p className="text-gray-600 mb-6">고시원을 방문하고 싶으시다면 예약을 신청해보세요.</p>
            <a
              href="/find-gosiwon"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              고시원 찾기
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredVisits.map((visit) => (
              <motion.div
                key={visit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm border p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{visit.gosiwonName}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visit.status)}`}>
                        {getStatusText(visit.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{visit.gosiwonAddress}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{formatDate(visit.visitDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{formatTime(visit.visitTime)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {visit.status === 'pending' && (
                      <button
                        onClick={() => handleCancelVisit(visit)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="예약 취소"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedVisit(visit)}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title="상세 보기"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">예약자</span>
                    <p className="font-medium">{visit.name}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">연락처</span>
                    <p className="font-medium">{visit.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">성별/연령</span>
                    <p className="font-medium">
                      {visit.gender === 'male' ? '남성' : '여성'} / {visit.ageGroup}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">구분</span>
                    <p className="font-medium">
                      {visit.type === 'student' ? '학생' : '직장인'}
                    </p>
                  </div>
                </div>

                {visit.message && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500">추가 메시지</span>
                    <p className="text-sm mt-1">{visit.message}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedVisit(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">방문 예약 상세</h2>
                <p className="text-sm text-gray-600">{selectedVisit.gosiwonName}</p>
              </div>
              <button
                onClick={() => setSelectedVisit(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">고시원 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{selectedVisit.gosiwonAddress}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{formatDate(selectedVisit.visitDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-400" />
                      <span>{formatTime(selectedVisit.visitTime)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">예약자 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span>{selectedVisit.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gray-400" />
                      <span>{selectedVisit.phone}</span>
                    </div>
                    <div>
                      <span>성별: {selectedVisit.gender === 'male' ? '남성' : '여성'}</span>
                    </div>
                    <div>
                      <span>연령대: {selectedVisit.ageGroup}</span>
                    </div>
                    <div>
                      <span>구분: {selectedVisit.type === 'student' ? '학생' : '직장인'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedVisit.message && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">추가 메시지</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedVisit.message}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedVisit.status)}`}>
                    {getStatusText(selectedVisit.status)}
                  </span>
                  <span className="text-sm text-gray-500">
                    예약일: {formatDate(selectedVisit.createdAt)}
                  </span>
                </div>

                {selectedVisit.status === 'pending' && (
                  <button
                    onClick={() => handleCancelVisit(selectedVisit)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    예약 취소
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCancelModal(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">방문 예약 취소</h2>
              <p className="text-gray-600 mb-6">
                <strong>{selectedVisit.gosiwonName}</strong>의 방문 예약을 취소하시겠습니까?
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 text-sm">
                <p className="text-gray-700">
                  {formatDate(selectedVisit.visitDate)} {formatTime(selectedVisit.visitTime)}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={confirmCancel}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  예약 취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 