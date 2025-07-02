'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Settings, Bell, Shield, Camera, Edit, Save, X } from 'lucide-react'
import { User as UserType, getRoleDisplayName, getRoleColorClass } from '@/lib/auth'

interface UserProfileProps {
  user: UserType
  onUpdate?: (updatedUser: UserType) => void
}

export default function UserProfile({ user, onUpdate }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile')
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  })

  const [preferences, setPreferences] = useState(user.preferences)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePreferenceChange = (category: 'notifications' | 'privacy', key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    
    // 모의 저장 처리
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const updatedUser = {
      ...user,
      ...formData,
      preferences,
      updatedAt: new Date().toISOString()
    }
    
    if (onUpdate) {
      onUpdate(updatedUser)
    }
    
    setIsLoading(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone
    })
    setPreferences(user.preferences)
    setIsEditing(false)
  }

  const tabs = [
    { id: 'profile', label: '프로필', icon: User },
    { id: 'preferences', label: '설정', icon: Settings },
    { id: 'security', label: '보안', icon: Shield }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-accent-800">내 프로필</h1>
          <p className="text-accent-600 mt-1">계정 정보를 관리하세요</p>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Edit size={16} />
            <span>편집</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-secondary-100 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-accent-800 shadow-sm'
                  : 'text-accent-600 hover:text-accent-800'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-secondary-200 p-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Avatar Section */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-accent-100 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User size={32} className="text-accent-600" />
                  )}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white hover:bg-accent-600 transition-colors duration-200">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-accent-800 mb-1">{user.name}</h3>
                <p className="text-accent-600">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColorClass(user.role)}`}>
                    {getRoleDisplayName(user.role)}
                  </span>
                  <span className="text-sm text-accent-500">
                    가입일: {new Date(user.createdAt).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-accent-700 mb-2">
                  <User size={16} className="inline mr-2" />
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-field disabled:bg-secondary-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-2">
                  <Mail size={16} className="inline mr-2" />
                  이메일
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-field disabled:bg-secondary-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-2">
                  <Phone size={16} className="inline mr-2" />
                  연락처
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-field disabled:bg-secondary-50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-accent-700 mb-2">
                  계정 유형
                </label>
                <div className="p-3 bg-secondary-50 rounded-lg">
                  <span className="text-accent-800 font-medium">
                    {getRoleDisplayName(user.role)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-accent-800 mb-4 flex items-center">
                <Bell size={20} className="mr-2" />
                알림 설정
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <div className="font-medium text-accent-800">이메일 알림</div>
                    <div className="text-sm text-accent-600">예약 상태 변경 및 중요 공지사항</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.email}
                      onChange={(e) => handlePreferenceChange('notifications', 'email', e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <div className="font-medium text-accent-800">SMS 알림</div>
                    <div className="text-sm text-accent-600">긴급한 예약 관련 알림</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.sms}
                      onChange={(e) => handlePreferenceChange('notifications', 'sms', e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <div className="font-medium text-accent-800">푸시 알림</div>
                    <div className="text-sm text-accent-600">웹 브라우저 푸시 알림</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.notifications.push}
                      onChange={(e) => handlePreferenceChange('notifications', 'push', e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-accent-800 mb-4 flex items-center">
                <Shield size={20} className="mr-2" />
                개인정보 설정
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <div className="font-medium text-accent-800">프로필 공개</div>
                    <div className="text-sm text-accent-600">다른 사용자에게 내 프로필을 보여줍니다</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.privacy.profileVisible}
                      onChange={(e) => handlePreferenceChange('privacy', 'profileVisible', e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-secondary-200 rounded-lg">
                  <div>
                    <div className="font-medium text-accent-800">연락처 공개</div>
                    <div className="text-sm text-accent-600">예약 시 연락처를 상대방에게 보여줍니다</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.privacy.showPhone}
                      onChange={(e) => handlePreferenceChange('privacy', 'showPhone', e.target.checked)}
                      disabled={!isEditing}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-secondary-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-accent-800 mb-4">보안 설정</h3>
              <div className="space-y-4">
                <div className="p-4 border border-secondary-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-accent-800">비밀번호 변경</div>
                      <div className="text-sm text-accent-600">마지막 변경: 30일 전</div>
                    </div>
                    <button className="btn-secondary text-sm">
                      변경하기
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-secondary-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-accent-800">2단계 인증</div>
                      <div className="text-sm text-accent-600">SMS 또는 이메일로 추가 보안</div>
                    </div>
                    <button className="btn-secondary text-sm">
                      설정하기
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-secondary-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-accent-800">로그인 세션</div>
                      <div className="text-sm text-accent-600">현재 활성 세션 관리</div>
                    </div>
                    <button className="btn-secondary text-sm">
                      확인하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-secondary-200">
            <button
              onClick={handleCancel}
              className="btn-secondary flex items-center space-x-2"
            >
              <X size={16} />
              <span>취소</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>저장 중...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>저장</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 