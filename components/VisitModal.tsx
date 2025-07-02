'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Calendar, MapPin, Phone, Send, CheckCircle, Clock } from 'lucide-react'
import { Gosiwon } from '@/lib/data'

interface VisitModalProps {
  gosiwon: Gosiwon | null
  isOpen: boolean
  onClose: () => void
}

export default function VisitModal({ gosiwon, isOpen, onClose }: VisitModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    visitDate: '',
    visitTime: '',
    gender: '',
    ageGroup: '', // 연령대 추가
    type: '', // 직장인/학생
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.visitDate || !formData.visitTime || !formData.gender || !formData.ageGroup || !formData.type) return

    setIsLoading(true)
    
    // 실제 구현에서는 API 호출로 사업주에게 방문 알림 발송
    // 여기서는 시뮬레이션
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      visitDate: '',
      visitTime: '',
      gender: '',
      ageGroup: '',
      type: '',
      message: ''
    })
    setIsSubmitted(false)
    onClose()
  }

  if (isSubmitted) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">방문 신청 완료!</h2>
                <p className="text-gray-600 mb-4">
                  방문 신청이 사업주에게 전송되었습니다.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="space-y-2 text-sm text-blue-700">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>사업주가 확인 후 연락드립니다</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>방문 전 사업주와 시간 조율</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  확인
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">방문 신청</h2>
                <p className="text-sm text-gray-600">{gosiwon?.name || '고시원'}</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* 안내 메시지 */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-start space-x-3">
                  <MapPin size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">방문 신청 안내</h3>
                    <p className="text-sm text-blue-700">
                      방문 신청을 하시면 사업주에게 알림이 전송되어, 방문 시 안내를 받으실 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 방문 신청 폼 */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 이름 */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* 연락처 */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="010-1234-5678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* 방문 날짜 */}
                  <div>
                    <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700 mb-2">
                      방문 날짜 *
                    </label>
                    <input
                      type="date"
                      id="visitDate"
                      value={formData.visitDate}
                      onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* 방문 시간 */}
                  <div>
                    <label htmlFor="visitTime" className="block text-sm font-medium text-gray-700 mb-2">
                      방문 시간대 *
                    </label>
                    <select
                      id="visitTime"
                      value={formData.visitTime}
                      onChange={(e) => setFormData({...formData, visitTime: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">시간대 선택</option>
                      <option value="09:00-12:00">오전 9시~12시</option>
                      <option value="10:00-14:00">오전 10시~오후 2시</option>
                      <option value="11:00-15:00">오전 11시~오후 3시</option>
                      <option value="12:00-16:00">오후 12시~4시</option>
                      <option value="13:00-17:00">오후 1시~5시</option>
                      <option value="14:00-18:00">오후 2시~6시</option>
                      <option value="15:00-19:00">오후 3시~7시</option>
                      <option value="16:00-20:00">오후 4시~8시</option>
                      <option value="17:00-21:00">오후 5시~9시</option>
                      <option value="18:00-22:00">오후 6시~10시</option>
                      <option value="flexible">시간 조율 가능</option>
                    </select>
                  </div>

                  {/* 성별 */}
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                      성별 *
                    </label>
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">성별 선택</option>
                      <option value="male">남성</option>
                      <option value="female">여성</option>
                    </select>
                  </div>

                  {/* 연령대 */}
                  <div>
                    <label htmlFor="ageGroup" className="block text-sm font-medium text-gray-700 mb-2">
                      연령대 *
                    </label>
                    <select
                      id="ageGroup"
                      value={formData.ageGroup}
                      onChange={(e) => setFormData({...formData, ageGroup: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">연령대 선택</option>
                      <option value="10s">10대</option>
                      <option value="20s">20대</option>
                      <option value="30s">30대</option>
                      <option value="40s">40대</option>
                      <option value="50s">50대</option>
                      <option value="60s">60대 이상</option>
                    </select>
                  </div>

                  {/* 직장인/학생 */}
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      구분 *
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">구분 선택</option>
                      <option value="student">학생</option>
                      <option value="worker">직장인</option>
                    </select>
                  </div>
                </div>

                {/* 메시지 */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    추가 메시지 (선택사항)
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={3}
                    placeholder="방문 목적이나 특별한 요청사항이 있으시면 작성해 주세요."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  disabled={isLoading || !formData.name || !formData.phone || !formData.visitDate || !formData.visitTime || !formData.gender || !formData.ageGroup || !formData.type}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>전송 중...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>방문 신청하기</span>
                    </>
                  )}
                </button>
              </form>

              {/* 안내사항 */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">안내사항</h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <p>• 방문 신청 후 사업주가 확인하여 연락드립니다.</p>
                  <p>• 방문 시간은 사업주와 조율하여 변경될 수 있습니다.</p>
                  <p>• 방문 시 신분증을 지참해 주세요.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 