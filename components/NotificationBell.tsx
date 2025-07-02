'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Check, Settings } from 'lucide-react'
import { 
  Notification, 
  mockNotifications, 
  getUnreadCount, 
  filterNotifications, 
  sortNotifications, 
  formatNotificationDate,
  notificationConfig 
} from '@/lib/notifications'
import Link from 'next/link'

export default function NotificationBell() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = getUnreadCount(notifications)
  const filteredNotifications = sortNotifications(
    filterNotifications(notifications, filter)
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    )
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  const getNotificationIcon = (type: string) => {
    const config = notificationConfig[type as keyof typeof notificationConfig]
    if (!config) return <Bell size={16} />
    
    // 실제로는 동적 아이콘을 사용해야 하지만, 여기서는 간단히 처리
    return <Bell size={16} />
  }

  const getNotificationStyle = (type: string) => {
    const config = notificationConfig[type as keyof typeof notificationConfig]
    if (!config) return {
      bgColor: 'bg-secondary-50',
      textColor: 'text-secondary-700',
      borderColor: 'border-secondary-200'
    }
    return config
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-accent-600 hover:text-accent-800 transition-colors duration-200"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.div>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-large border border-secondary-200 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-secondary-200">
              <h3 className="font-semibold text-accent-800">알림</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-accent-600 hover:text-accent-800"
                  >
                    모두 읽음
                  </button>
                )}
                <Link
                  href="/notifications"
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-accent-600 hover:text-accent-800"
                >
                  모두 보기
                </Link>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b border-secondary-200">
              {[
                { key: 'all', label: '전체' },
                { key: 'unread', label: '읽지 않음' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as 'all' | 'unread' | 'read')}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    filter === tab.key
                      ? 'text-accent-800 border-b-2 border-accent-600'
                      : 'text-accent-600 hover:text-accent-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y divide-secondary-100">
                  {filteredNotifications.slice(0, 5).map((notification) => {
                    const style = getNotificationStyle(notification.type)
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 hover:bg-secondary-50 transition-colors duration-200 ${
                          !notification.isRead ? 'bg-accent-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Icon */}
                          <div className={`w-8 h-8 rounded-full ${style.bgColor} flex items-center justify-center flex-shrink-0`}>
                            {getNotificationIcon(notification.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className={`text-sm font-medium ${style.textColor} line-clamp-1`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-1 ml-2">
                                {!notification.isRead && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="p-1 hover:bg-secondary-100 rounded"
                                  >
                                    <Check size={12} className="text-accent-600" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 hover:bg-secondary-100 rounded"
                                >
                                  <X size={12} className="text-accent-400" />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-accent-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-accent-500 mt-2">
                              {formatNotificationDate(notification.createdAt)}
                            </p>
                          </div>
                        </div>

                        {/* Action Button */}
                        {notification.actionUrl && (
                          <div className="mt-3">
                            <Link
                              href={notification.actionUrl}
                              onClick={() => {
                                markAsRead(notification.id)
                                setIsOpen(false)
                              }}
                              className="text-xs text-accent-600 hover:text-accent-800 font-medium"
                            >
                              자세히 보기 →
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Bell size={32} className="text-accent-300 mx-auto mb-2" />
                  <p className="text-sm text-accent-600">
                    {filter === 'unread' ? '읽지 않은 알림이 없습니다' : '알림이 없습니다'}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {filteredNotifications.length > 5 && (
              <div className="p-4 border-t border-secondary-200">
                <Link
                  href="/notifications"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-sm text-accent-600 hover:text-accent-800 font-medium"
                >
                  모든 알림 보기 ({filteredNotifications.length}개)
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 