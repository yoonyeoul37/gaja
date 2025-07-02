'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, User, ChevronDown, LogOut, Calendar, MessageCircle, Shield,
  Home, Search, Building, Users, FileText, Bell, Briefcase, BookOpen, Star
} from 'lucide-react'
import AuthModal from './AuthModal'
import NotificationBell from './NotificationBell'
import { mockUsers, getRolePermissions, getRoleDisplayName, getRoleColorClass } from '@/lib/auth'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [showAnim, setShowAnim] = useState(false)
  
  // 모의 인증 상태 (실제로는 전역 상태 관리 사용)
  const [currentUser, setCurrentUser] = useState(mockUsers[0])

  const navigation = [
    { name: '사업주전용', href: '/business', icon: Building },
    { name: '룸/쉐어하우스', href: '/roommate', icon: Users },
    { name: '구인구직', href: '/jobs', icon: Briefcase },
    { name: '고시원스토리', href: '/stories', icon: BookOpen },
    { name: '찾아요', href: '/find-gosiwon', icon: Search },
    { name: '리뷰', href: '/reviews', icon: Star },
    { name: '내 예약', href: '/my-reservations', icon: Calendar },
    { name: '내 방문', href: '/my-visits', icon: Calendar },
    { name: '채팅', href: '/chat', icon: MessageCircle },
    { name: 'FAQ', href: '/business/ads-info', icon: Shield },
  ]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const alreadyOpened = localStorage.getItem('categoryMenuAnimShown')
      if (!alreadyOpened) {
        setShowAnim(true)
        setTimeout(() => {
          setShowAnim(false)
          localStorage.setItem('categoryMenuAnimShown', 'true')
        }, 2000)
      }
    }
  }, [])

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsUserMenuOpen(false)
  }

  // 테스트용 사용자 전환 함수
  const switchUser = (userIndex: number) => {
    if (userIndex < mockUsers.length) {
      setCurrentUser(mockUsers[userIndex])
    }
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-secondary-200 sticky top-0 z-40 w-full">
        <div className="w-full px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 whitespace-nowrap">
              <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">가</span>
              </div>
              <span className="text-xl font-bold text-accent-800">가자고시원</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 text-accent-600 hover:text-accent-800 transition-colors duration-200 text-sm whitespace-nowrap">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-1 px-2 py-1"
                  >
                    <Icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <>
                  <NotificationBell />
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 text-accent-600 hover:text-accent-800 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
                        <User size={16} className="text-accent-600" />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{currentUser.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getRoleColorClass(currentUser.role)}`}>
                          {getRoleDisplayName(currentUser.role)}
                        </span>
                      </div>
                      <ChevronDown size={16} />
                    </button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-large border border-secondary-200 py-2"
                        >
                          <Link
                            href="/profile"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-accent-600 hover:bg-secondary-50 transition-colors duration-200"
                          >
                            <User size={16} />
                            <span>내 프로필</span>
                          </Link>
                          <Link
                            href="/my-reservations"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-accent-600 hover:bg-secondary-50 transition-colors duration-200"
                          >
                            <Calendar size={16} />
                            <span>내 예약</span>
                          </Link>
                          <Link
                            href="/my-visits"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-accent-600 hover:bg-secondary-50 transition-colors duration-200"
                          >
                            <Calendar size={16} />
                            <span>내 방문</span>
                          </Link>
                          <Link
                            href="/chat"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-accent-600 hover:bg-secondary-50 transition-colors duration-200"
                          >
                            <MessageCircle size={16} />
                            <span>채팅</span>
                          </Link>
                          {getRolePermissions(currentUser).canAccessBusinessDashboard && (
                            <Link
                              href="/business"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center space-x-2 px-4 py-2 text-accent-600 hover:bg-secondary-50 transition-colors duration-200"
                            >
                              <Building size={16} />
                              <span>고시원 관리</span>
                            </Link>
                          )}
                          {getRolePermissions(currentUser).canAccessRoomshareDashboard && (
                            <Link
                              href="/roommate"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center space-x-2 px-4 py-2 text-accent-600 hover:bg-secondary-50 transition-colors duration-200"
                            >
                              <Users size={16} />
                              <span>룸쉐어 관리</span>
                            </Link>
                          )}
                          {getRolePermissions(currentUser).canAccessAdmin && (
                            <Link
                              href="/admin"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center space-x-2 px-4 py-2 text-accent-600 hover:bg-secondary-50 transition-colors duration-200"
                            >
                              <Shield size={16} />
                              <span>관리자</span>
                            </Link>
                          )}
                          <div className="border-t border-secondary-200 my-1"></div>
                          
                          {/* 테스트용 사용자 전환 */}
                          <div className="px-4 py-2">
                            <div className="text-xs text-accent-500 mb-2">테스트용 사용자 전환</div>
                            <div className="space-y-1">
                              {mockUsers.map((user, index) => (
                                <button
                                  key={user.id}
                                  onClick={() => {
                                    switchUser(index)
                                    setIsUserMenuOpen(false)
                                  }}
                                  className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                                    currentUser.id === user.id
                                      ? 'bg-accent-100 text-accent-800'
                                      : 'text-accent-600 hover:bg-secondary-50'
                                  }`}
                                >
                                  {user.name} ({getRoleDisplayName(user.role)})
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="border-t border-secondary-200 my-1"></div>
                          <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 text-error-600 hover:bg-error-50 transition-colors duration-200 w-full text-left"
                          >
                            <LogOut size={16} />
                            <span>로그아웃</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="btn-primary"
                >
                  로그인
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-accent-600 hover:text-accent-800 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-secondary-200"
              >
                <nav className="py-4 space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-accent-600 hover:text-accent-800 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                      >
                        <Icon size={20} />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}
                  
                  {/* Mobile Auth */}
                  <div className="border-t border-secondary-200 pt-4 mt-4">
                    {currentUser ? (
                      <div className="space-y-2">
                        <Link
                          href="/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-accent-600 hover:text-accent-800 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                        >
                          <User size={20} />
                          <span>내 프로필</span>
                        </Link>
                        <Link
                          href="/chat"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-accent-600 hover:text-accent-800 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                        >
                          <MessageCircle size={20} />
                          <span>채팅</span>
                        </Link>
                        {getRolePermissions(currentUser).canAccessBusinessDashboard && (
                          <Link
                            href="/business"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 text-accent-600 hover:text-accent-800 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                          >
                            <Building size={20} />
                            <span>고시원 관리</span>
                          </Link>
                        )}
                        {getRolePermissions(currentUser).canAccessRoomshareDashboard && (
                          <Link
                            href="/roommate"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 text-accent-600 hover:text-accent-800 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                          >
                            <Users size={20} />
                            <span>룸쉐어 관리</span>
                          </Link>
                        )}
                        {getRolePermissions(currentUser).canAccessAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 text-accent-600 hover:text-accent-800 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                          >
                            <Shield size={20} />
                            <span>관리자</span>
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            handleLogout()
                            setIsMenuOpen(false)
                          }}
                          className="flex items-center space-x-3 px-4 py-3 text-error-600 hover:text-error-800 hover:bg-error-50 rounded-lg transition-colors duration-200 w-full text-left"
                        >
                          <LogOut size={20} />
                          <span>로그아웃</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setIsAuthModalOpen(true)
                          setIsMenuOpen(false)
                        }}
                        className="w-full btn-primary"
                      >
                        로그인
                      </button>
                    )}
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  )
} 