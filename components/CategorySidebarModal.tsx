import { AnimatePresence, motion } from 'framer-motion'
import { X, Home } from 'lucide-react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface CategorySidebarModalProps {
  isOpen: boolean
  onClose: () => void
}

const groupBg = 'bg-[#F8F5F2]'
const itemBg = 'bg-white'
const textColor = 'text-[#5B4636]'
const iconColor = '#A08B75'

const universities = [
  '서울대학교', '고려대학교', '연세대학교', '한양대학교', '성균관대학교',
  '중앙대학교', '경희대학교', '건국대학교', '동국대학교', '홍익대학교',
  '이화여자대학교', '숙명여자대학교', '숭실대학교', '서강대학교', '한국외국어대학교'
]

const categories = [
  {
    group: '고시원',
    items: [
      { label: '전체 고시원', href: '/find-gosiwon' },
      { label: '여성전용 고시원', href: '/find-gosiwon?type=female' },
      { label: '남성전용 고시원', href: '/find-gosiwon?type=male' },
      { label: '산속 고시원', href: '/find-gosiwon?type=mountain' },
      { label: '대학별 고시원', href: '/find-gosiwon?type=university', isUniversity: true },
      { label: '지하철역별 고시원', href: '/find-gosiwon?type=subway' },
      { label: '사업주전용', href: '/business' },
      { label: '내 예약', href: '/my-reservations' },
      { label: '내 방문', href: '/my-visits' },
    ],
  },
  {
    group: '커뮤니티',
    items: [
      { label: '룸쉐어', href: '/roommate' },
      { label: '구인구직', href: '/jobs' },
      { label: '스토리', href: '/stories' },
      { label: '리뷰', href: '/reviews' },
    ],
  },
  {
    group: '기타',
    items: [
      { label: '채팅', href: '/chat' },
      { label: 'FAQ', href: '/business/ads-info' },
    ],
  },
]

export default function CategorySidebarModal({ isOpen, onClose }: CategorySidebarModalProps) {
  const [showUnivModal, setShowUnivModal] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar Modal */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed top-0 left-0 z-50 w-80 max-w-full h-full bg-[#F8F5F2] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADBC8]">
              <h2 className={`text-lg font-bold ${textColor}`}>카테고리</h2>
              <button onClick={onClose} className="p-2 hover:bg-[#EADBC8] rounded-lg">
                <X size={22} color={iconColor} />
              </button>
            </div>

            {/* Category Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {categories.map((group, idx) => (
                <div key={group.group} className={`${groupBg} rounded-xl p-4 shadow-sm`}>
                  <h3 className={`text-base font-semibold mb-3 ${textColor}`}>{group.group}</h3>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      item.isUniversity ? (
                        <button
                          key={item.label}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${itemBg} ${textColor} font-medium hover:bg-[#EADBC8] transition-colors w-full`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowUnivModal(true)
                          }}
                        >
                          <Home size={18} color={iconColor} className="flex-shrink-0" />
                          <span>{item.label}</span>
                        </button>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg ${itemBg} ${textColor} font-medium hover:bg-[#EADBC8] transition-colors`}
                          onClick={onClose}
                        >
                          <Home size={18} color={iconColor} className="flex-shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>

          {/* 대학 리스트 모달 */}
          <AnimatePresence>
            {showUnivModal && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="fixed inset-0 z-[60] flex items-center justify-center"
              >
                <div 
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowUnivModal(false)
                  }} 
                />
                <div 
                  className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#5B4636]">대학별 고시원</h3>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowUnivModal(false)
                      }} 
                      className="p-2 hover:bg-[#F8F5F2] rounded-lg"
                    >
                      <X size={20} color={iconColor} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {universities.map(univ => (
                      <Link
                        key={univ}
                        href={`/find-gosiwon?type=university&univ=${encodeURIComponent(univ)}`}
                        onClick={() => {
                          setShowUnivModal(false)
                          onClose()
                        }}
                        className="bg-[#F8F5F2] hover:bg-[#EADBC8] rounded-lg px-4 py-2 text-[#5B4636] font-medium transition-colors text-center"
                      >
                        {univ}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
} 