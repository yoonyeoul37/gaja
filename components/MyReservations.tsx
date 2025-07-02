'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, CreditCard, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Reservation, formatDate, formatPrice } from '@/lib/reservation'

interface MyReservationsProps {
  reservations: Reservation[]
}

const statusConfig = {
  pending: {
    label: '승인 대기',
    color: 'text-warning-600',
    bgColor: 'bg-warning-50',
    icon: Clock
  },
  confirmed: {
    label: '예약 확정',
    color: 'text-success-600',
    bgColor: 'bg-success-50',
    icon: CheckCircle
  },
  cancelled: {
    label: '예약 취소',
    color: 'text-error-600',
    bgColor: 'bg-error-50',
    icon: XCircle
  },
  completed: {
    label: '이용 완료',
    color: 'text-accent-600',
    bgColor: 'bg-accent-50',
    icon: CheckCircle
  }
}

const paymentStatusConfig = {
  pending: {
    label: '결제 대기',
    color: 'text-warning-600'
  },
  paid: {
    label: '결제 완료',
    color: 'text-success-600'
  },
  refunded: {
    label: '환불 완료',
    color: 'text-error-600'
  }
}

export default function MyReservations({ reservations }: MyReservationsProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date')

  const filteredReservations = reservations.filter(reservation => {
    if (selectedStatus === 'all') return true
    return reservation.status === selectedStatus
  })

  const sortedReservations = [...filteredReservations].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else {
      return b.totalPrice - a.totalPrice
    }
  })

  const statusCounts = {
    all: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    cancelled: reservations.filter(r => r.status === 'cancelled').length,
    completed: reservations.filter(r => r.status === 'completed').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-accent-800">내 예약 내역</h2>
          <p className="text-accent-600 mt-1">총 {reservations.length}건의 예약</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'price')}
            className="px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
          >
            <option value="date">최신순</option>
            <option value="price">금액순</option>
          </select>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedStatus === status
                ? 'bg-accent-500 text-white'
                : 'bg-secondary-100 text-accent-600 hover:bg-secondary-200'
            }`}
          >
            {status === 'all' ? '전체' : statusConfig[status as keyof typeof statusConfig]?.label}
            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {sortedReservations.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle size={48} className="mx-auto text-secondary-400 mb-4" />
            <h3 className="text-lg font-medium text-accent-800 mb-2">예약 내역이 없습니다</h3>
            <p className="text-accent-600">새로운 고시원을 찾아보세요!</p>
          </div>
        ) : (
          sortedReservations.map((reservation) => {
            const status = statusConfig[reservation.status]
            const paymentStatus = paymentStatusConfig[reservation.paymentStatus]
            const StatusIcon = status.icon

            return (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-secondary-200 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                  {/* Main Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-accent-800 mb-1">
                          {reservation.gosiwonName}
                        </h3>
                        <div className="flex items-center text-accent-600 text-sm">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(reservation.checkInDate)} ~ {formatDate(reservation.checkOutDate)}
                          <span className="ml-2 text-accent-500">({reservation.totalDays}일)</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${status.bgColor} ${status.color}`}>
                          <StatusIcon size={12} />
                          <span>{status.label}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatus.color} bg-secondary-100`}>
                          {paymentStatus.label}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-accent-500">예약자</span>
                        <p className="font-medium text-accent-800">{reservation.userName}</p>
                      </div>
                      <div>
                        <span className="text-accent-500">연락처</span>
                        <p className="font-medium text-accent-800">{reservation.userPhone}</p>
                      </div>
                      <div>
                        <span className="text-accent-500">예약일</span>
                        <p className="font-medium text-accent-800">{formatDate(reservation.createdAt)}</p>
                      </div>
                    </div>

                    {reservation.message && (
                      <div className="bg-secondary-50 rounded-lg p-3">
                        <span className="text-sm text-accent-500">요청사항</span>
                        <p className="text-sm text-accent-700 mt-1">{reservation.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Price Info */}
                  <div className="lg:ml-6 lg:border-l lg:border-secondary-200 lg:pl-6">
                    <div className="bg-accent-50 rounded-lg p-4 min-w-[200px]">
                      <h4 className="font-semibold text-accent-800 mb-3">결제 정보</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>일일 요금</span>
                          <span>{formatPrice(reservation.pricePerDay)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span>숙박비</span>
                          <span>{formatPrice(reservation.totalPrice)}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span>보증금</span>
                          <span>{formatPrice(reservation.deposit)}원</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold text-accent-600">
                          <span>총 결제 금액</span>
                          <span>{formatPrice(reservation.totalPrice + reservation.deposit)}원</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-secondary-200">
                  {reservation.status === 'pending' && (
                    <>
                      <button className="px-4 py-2 text-sm font-medium text-accent-600 hover:text-accent-800 transition-colors duration-200">
                        예약 수정
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-error-600 hover:text-error-800 transition-colors duration-200">
                        예약 취소
                      </button>
                    </>
                  )}
                  {reservation.status === 'confirmed' && (
                    <button className="px-4 py-2 text-sm font-medium text-accent-600 hover:text-accent-800 transition-colors duration-200">
                      상세 보기
                    </button>
                  )}
                  <button className="px-4 py-2 text-sm font-medium text-accent-600 hover:text-accent-800 transition-colors duration-200">
                    문의하기
                  </button>
                </div>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
} 