'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Filter, Trash2, Check, Settings, Calendar, CreditCard, Star, MessageCircle, Settings as SettingsIcon, Gift, X } from 'lucide-react'
import { 
  mockNotifications, 
  filterNotifications, 
  sortNotifications, 
  formatNotificationDate,
  notificationConfig,
  NotificationSettings,
  defaultNotificationSettings
} from '@/lib/notifications'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settings, setSettings] = useState<NotificationSettings>(defaultNotificationSettings)

  const filteredNotifications = sortNotifications(
    filterNotifications(notifications, filter),
    sortBy
  )

  const unreadCount = notifications.filter(n => !n.isRead).length

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

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.isRead))
  }

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      reservation: Calendar,
      payment: CreditCard,
      review: Star,
      chat: MessageCircle,
      system: SettingsIcon,
      promotion: Gift
    }
    const Icon = iconMap[type as keyof typeof iconMap] || Bell
    return <Icon size={16} />
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-accent-800 mb-2">알림</h1>
              <p className="text-accent-600">
                {unreadCount > 0 ? `읽지 않은 알림 ${unreadCount}개` : '모든 알림을 확인했습니다'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 text-accent-600 hover:text-accent-800 border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
              >
                <Settings size={16} />
                <span>설정</span>
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200"
                >
                  모두 읽음
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl border border-secondary-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-accent-800">필터</h2>
            <div className="flex items-center space-x-2 text-sm text-accent-600">
              <Filter size={16} />
              <span>총 {filteredNotifications.length}개</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {/* Filter Tabs */}
            <div className="flex border border-secondary-300 rounded-lg">
              {[
                { key: 'all', label: '전체' },
                { key: 'unread', label: '읽지 않음' },
                { key: 'read', label: '읽음' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as 'all' | 'unread' | 'read')}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    filter === tab.key
                      ? 'bg-accent-600 text-white'
                      : 'text-accent-600 hover:text-accent-800 hover:bg-secondary-50'
                  } ${tab.key === 'all' ? 'rounded-l-lg' : ''} ${tab.key === 'read' ? 'rounded-r-lg' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex border border-secondary-300 rounded-lg">
              <button
                onClick={() => setSortBy('recent')}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  sortBy === 'recent'
                    ? 'bg-accent-600 text-white rounded-l-lg'
                    : 'text-accent-600 hover:text-accent-800 hover:bg-secondary-50 rounded-l-lg'
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setSortBy('oldest')}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  sortBy === 'oldest'
                    ? 'bg-accent-600 text-white rounded-r-lg'
                    : 'text-accent-600 hover:text-accent-800 hover:bg-secondary-50 rounded-r-lg'
                }`}
              >
                오래된순
              </button>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              {notifications.some(n => n.isRead) && (
                <button
                  onClick={deleteAllRead}
                  className="flex items-center space-x-1 px-3 py-2 text-error-600 hover:text-error-800 border border-error-300 rounded-lg hover:bg-error-50 transition-colors duration-200"
                >
                  <Trash2 size={14} />
                  <span className="text-sm">읽은 알림 삭제</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredNotifications.map((notification) => {
              const style = getNotificationStyle(notification.type)
              return (
                <motion.div
                  key={notification.id}
                  variants={itemVariants}
                  className={`bg-white rounded-xl border ${style.borderColor} p-6 hover:shadow-lg transition-all duration-200 ${
                    !notification.isRead ? 'ring-2 ring-accent-200' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full ${style.bgColor} flex items-center justify-center flex-shrink-0`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold ${style.textColor} mb-2`}>
                            {notification.title}
                          </h3>
                          <p className="text-accent-700 leading-relaxed mb-3">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-accent-500">
                              {formatNotificationDate(notification.createdAt)}
                            </p>
                            {notification.actionUrl && (
                              <a
                                href={notification.actionUrl}
                                className="text-sm text-accent-600 hover:text-accent-800 font-medium"
                              >
                                자세히 보기 →
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 hover:bg-success-50 rounded-lg transition-colors duration-200"
                              title="읽음 표시"
                            >
                              <Check size={16} className="text-success-600" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 hover:bg-error-50 rounded-lg transition-colors duration-200"
                            title="삭제"
                          >
                            <Trash2 size={16} className="text-error-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={24} className="text-accent-400" />
            </div>
            <h3 className="text-lg font-medium text-accent-800 mb-2">
              {filter === 'unread' ? '읽지 않은 알림이 없습니다' : '알림이 없습니다'}
            </h3>
            <p className="text-accent-600">
              {filter === 'unread' ? '새로운 알림이 도착하면 여기에 표시됩니다' : '새로운 알림을 기다려보세요'}
            </p>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsSettingsOpen(false)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-accent-800">알림 설정</h2>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 hover:bg-secondary-100 rounded-lg transition-colors duration-200"
              >
                <X size={20} className="text-accent-600" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Notification Methods */}
              <div>
                <h3 className="font-medium text-accent-800 mb-3">알림 방법</h3>
                <div className="space-y-3">
                  {[
                    { key: 'email', label: '이메일' },
                    { key: 'push', label: '푸시 알림' },
                    { key: 'sms', label: 'SMS' }
                  ].map(method => (
                    <label key={method.key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings[method.key as keyof typeof settings]}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          [method.key]: e.target.checked
                        }))}
                        className="w-4 h-4 text-accent-600 border-secondary-300 rounded focus:ring-accent-500"
                      />
                      <span className="text-accent-700">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notification Types */}
              <div>
                <h3 className="font-medium text-accent-800 mb-3">알림 유형</h3>
                <div className="space-y-3">
                  {[
                    { key: 'reservation', label: '예약 관련' },
                    { key: 'payment', label: '결제 관련' },
                    { key: 'review', label: '리뷰 관련' },
                    { key: 'chat', label: '채팅 관련' },
                    { key: 'system', label: '시스템 알림' },
                    { key: 'promotion', label: '프로모션' }
                  ].map(type => (
                    <label key={type.key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.types[type.key as keyof typeof settings.types]}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          types: {
                            ...prev.types,
                            [type.key]: e.target.checked
                          }
                        }))}
                        className="w-4 h-4 text-accent-600 border-secondary-300 rounded focus:ring-accent-500"
                      />
                      <span className="text-accent-700">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="flex-1 px-4 py-2 border border-secondary-300 text-accent-700 rounded-lg hover:bg-secondary-50 transition-colors duration-200"
              >
                취소
              </button>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="flex-1 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 