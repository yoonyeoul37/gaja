'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Building, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Activity,
  UserPlus,
  Star,
  CreditCard
} from 'lucide-react'
import { 
  mockAdminStats, 
  formatCurrency, 
  getGrowthColor,
  formatAdminDate 
} from '@/lib/admin'

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const stats = [
    {
      title: '총 사용자',
      value: mockAdminStats.totalUsers,
      growth: mockAdminStats.monthlyGrowth.users,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: '총 고시원',
      value: mockAdminStats.totalGosiwons,
      growth: mockAdminStats.monthlyGrowth.gosiwons,
      icon: Building,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: '총 예약',
      value: mockAdminStats.totalReservations,
      growth: mockAdminStats.monthlyGrowth.reservations,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: '총 매출',
      value: formatCurrency(mockAdminStats.totalRevenue),
      growth: mockAdminStats.monthlyGrowth.revenue,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]

  const activityIcons = {
    user_registration: UserPlus,
    gosiwon_registration: Building,
    reservation: Calendar,
    payment: CreditCard,
    review: Star
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-accent-800 mb-2">관리자 대시보드</h1>
              <p className="text-accent-600">
                가자고시원 플랫폼 현황을 한눈에 확인하세요
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              >
                <option value="week">이번 주</option>
                <option value="month">이번 달</option>
                <option value="quarter">이번 분기</option>
                <option value="year">올해</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-secondary-200 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.growth > 0 ? (
                      <TrendingUp size={16} className="text-success-600" />
                    ) : (
                      <TrendingDown size={16} className="text-error-600" />
                    )}
                    <span className={`text-sm font-medium ${getGrowthColor(stat.growth)}`}>
                      {stat.growth > 0 ? '+' : ''}{stat.growth}%
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-accent-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-accent-600 text-sm">
                  {stat.title}
                </p>
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-accent-800">최근 활동</h2>
                <div className="flex items-center space-x-2 text-accent-600">
                  <Activity size={16} />
                  <span className="text-sm">실시간</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {mockAdminStats.recentActivity.map((activity, index) => {
                  const Icon = activityIcons[activity.type as keyof typeof activityIcons] || Activity
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 hover:bg-secondary-50 rounded-lg transition-colors duration-200"
                    >
                      <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-accent-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-accent-800 mb-1">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-accent-600 mb-2">
                          {activity.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-accent-500">
                            {formatAdminDate(activity.timestamp)}
                          </p>
                          {activity.amount && (
                            <span className="text-sm font-medium text-accent-800">
                              {formatCurrency(activity.amount)}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <h2 className="text-xl font-semibold text-accent-800 mb-4">빠른 작업</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-accent-700 hover:bg-accent-50 rounded-lg transition-colors duration-200">
                  <UserPlus size={18} />
                  <span>사용자 관리</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-accent-700 hover:bg-accent-50 rounded-lg transition-colors duration-200">
                  <Building size={18} />
                  <span>고시원 승인</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-accent-700 hover:bg-accent-50 rounded-lg transition-colors duration-200">
                  <Calendar size={18} />
                  <span>예약 현황</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-accent-700 hover:bg-accent-50 rounded-lg transition-colors duration-200">
                  <Star size={18} />
                  <span>리뷰 관리</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl border border-secondary-200 p-6">
              <h2 className="text-xl font-semibold text-accent-800 mb-4">시스템 상태</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-600">서버 상태</span>
                  <span className="text-sm font-medium text-success-600">정상</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-600">데이터베이스</span>
                  <span className="text-sm font-medium text-success-600">정상</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-600">결제 시스템</span>
                  <span className="text-sm font-medium text-success-600">정상</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-accent-600">이메일 서비스</span>
                  <span className="text-sm font-medium text-success-600">정상</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 