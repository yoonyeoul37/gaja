'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, CheckCircle, AlertCircle, Info, FileText, Calendar, Shield, Send, MessageCircle, CreditCard, Clock } from 'lucide-react'
import { Gosiwon } from '@/lib/data'

interface RoomType {
  id: string
  type: string
  roomNumber: string
  floor: string
  size: string
  price: number
  deposit: number
  image: string
  available: boolean
  windowType: string
  options: Record<string, boolean>
}

interface ReservationModalProps {
  gosiwon: Gosiwon | null
  selectedRoom?: RoomType
  isOpen: boolean
  onClose: () => void
}

export default function ReservationModal({ gosiwon, selectedRoom, isOpen, onClose }: ReservationModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phoneNumber.trim()) return

    setIsLoading(true)
    
    // 실제 구현에서는 API 호출로 카톡/문자 발송
    // 여기서는 시뮬레이션
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const handlePaymentConfirmation = () => {
    setShowPaymentConfirmation(true)
    // 실제 구현에서는 사업주에게 입금 확인 알림 발송
    // 해당 방타입을 예약 불가로 변경
  }

  const handleClose = () => {
    setPhoneNumber('')
    setIsSubmitted(false)
    setShowPaymentConfirmation(false)
    onClose()
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString()
  }

  if (showPaymentConfirmation) {
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
                <h2 className="text-xl font-semibold text-gray-900 mb-2">입금 확인 완료!</h2>
                <p className="text-gray-600 mb-4">
                  입금 확인이 사업주에게 전송되었습니다.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="space-y-2 text-sm text-blue-700">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>예약 확정 대기 중</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>24시간 내 확정 예정</span>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-2">예약 정보 발송 완료!</h2>
                <p className="text-gray-600 mb-4">
                  입력하신 연락처로 상세 예약 정보를 카톡/문자로 발송했습니다.
                </p>
                
                {/* 선택된 방 정보 */}
                {selectedRoom && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">선택된 방</h3>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p><span className="font-medium">호수:</span> {selectedRoom.floor} {selectedRoom.roomNumber}</p>
                      <p><span className="font-medium">타입:</span> {selectedRoom.type}</p>
                      <p><span className="font-medium">크기:</span> {selectedRoom.size}</p>
                      <p><span className="font-medium">월세:</span> {formatPrice(selectedRoom.price)}원</p>
                      <p><span className="font-medium">보증금:</span> {formatPrice(selectedRoom.deposit)}원</p>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="space-y-2 text-sm text-blue-700">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>계좌번호, 가격, 입실시간 등 상세 정보</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle size={14} className="text-blue-600" />
                      <span>예약금 입금 후 "입금 확인" 버튼 클릭</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-center space-x-2 text-yellow-700">
                    <MessageCircle size={16} />
                    <span className="text-sm font-medium">입금 완료 후 아래 버튼을 클릭하세요</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handlePaymentConfirmation}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <CreditCard size={20} />
                    <span>입금 확인</span>
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    나중에 확인
                  </button>
                </div>
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
            className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">예약 정보 받기</h2>
                <p className="text-sm text-gray-600">{gosiwon?.name || '고시원'}</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex">
              {/* 왼쪽: 연락처 입력 */}
              <div className="w-1/2 p-6 border-r border-gray-200">
                {/* 안내 메시지 */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="flex items-start space-x-3">
                    <Shield size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">안전한 예약 서비스</h3>
                      <p className="text-sm text-blue-700">
                        연락처를 입력하시면 상세 예약 정보를 카톡/문자로 안전하게 받으실 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 연락처 입력 폼 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      연락처 (휴대폰 번호)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="010-1234-5678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !phoneNumber.trim()}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>발송 중...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>예약 정보 받기</span>
                      </>
                    )}
                  </button>
                </form>

                {/* 개인정보 보호 안내 */}
                <div className="text-xs text-gray-500 text-center mt-4">
                  입력하신 연락처는 예약 목적으로만 사용되며, 예약 완료 후 즉시 삭제됩니다.
                </div>
              </div>

              {/* 오른쪽: 정보 안내 */}
              <div className="w-1/2 p-6 overflow-y-auto max-h-[60vh]">
                {/* 프로세스 안내 */}
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                    <Info size={18} className="mr-2 text-yellow-600" />
                    예약 프로세스
                  </h3>
                  <div className="space-y-2 text-sm text-yellow-800">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                      <span>연락처 입력 후 "예약 정보 받기" 클릭</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                      <span>입력하신 번호로 카톡/문자 발송</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                      <span>상세 계좌정보 및 예약 안내 확인</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                      <span>사업주와 직접 연락하여 입주 확정</span>
                    </div>
                  </div>
                </div>

                {/* 제공되는 정보 안내 */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Info size={18} className="mr-2 text-gray-600" />
                    발송되는 예약 정보
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span>입금 계좌번호 및 예금주명</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span>고시원명, 사업자 대표명</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span>호수, 방타입, 위치</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span>총 가격, 예약금, 월세</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span>예약 입실시간</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span>준비물 안내</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span>예약금 법적보호 설명</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={14} className="text-green-500" />
                      <span>예약 완료 확인 방법</span>
                    </div>
                  </div>
                </div>

                {/* 예약 완료 안내 */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center">
                    <CheckCircle size={18} className="mr-2 text-green-600" />
                    예약 완료 후
                  </h3>
                  <div className="space-y-2 text-sm text-green-800">
                    <p>• 예약금 입금 후 24시간 내 예약 확정</p>
                    <p>• 예약 확인은 "내 예약" 메뉴에서 가능</p>
                    <p>• 입주 전까지 예약금은 안전하게 보관</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 