'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Calculator,
  MessageCircle,
  User,
  Tag,
  Percent,
  Gift,
  Clock,
  AlertTriangle,
  Target,
  BarChart3
} from 'lucide-react'
import BusinessAnalyzer from './BusinessAnalyzer'
import { useRouter } from 'next/navigation'
import TenantManagement from './TenantManagement'

interface FixedCostItem {
  id: string
  category: string
  name: string
  amount: number
  description?: string
}

interface MarketingStrategy {
  id: string
  name: string
  type: 'discount' | 'free_deposit' | 'first_month_free' | 'referral_bonus' | 'early_bird'
  description: string
  discountRate?: number
  startDate: string
  endDate: string
  targetOccupancy: number
  currentOccupancy: number
  status: 'active' | 'paused' | 'ended'
  budget: number
  spent: number
  conversions: number
}

export default function BusinessDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview')
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false)
  const [analysisData, setAnalysisData] = useState<{
    fixedCosts: { items: FixedCostItem[], totalCost: number }
    investment: {
      totalInvestment: number
      breakEvenMonths: number
      breakEvenYears: number
      annualROI: number
      monthlyProfit: number
    }
  }>({
    fixedCosts: {
      items: [
        {
          id: '1',
          category: '임대료',
          name: '고시원 건물 임대료',
          amount: 5000000,
          description: '월 임대료'
        },
        {
          id: '2',
          category: '관리비',
          name: '건물 관리비',
          amount: 800000,
          description: '월 관리비'
        },
        {
          id: '3',
          category: '전기세',
          name: '전기 사용료',
          amount: 400000,
          description: '월 전기세'
        }
      ],
      totalCost: 7000000
    },
    investment: {
      totalInvestment: 360000000,
      breakEvenMonths: 120,
      breakEvenYears: 10,
      annualROI: 10,
      monthlyProfit: 3000000
    }
  })

  const [marketingStrategies] = useState<MarketingStrategy[]>([
    {
      id: '1',
      name: '겨울 얼리버드 할인',
      type: 'early_bird',
      description: '겨울 시즌 얼리버드 20% 할인',
      discountRate: 0.2,
      startDate: '2023-12-01',
      endDate: '2024-01-31',
      targetOccupancy: 85,
      currentOccupancy: 45,
      status: 'active',
      budget: 5000000,
      spent: 1200000,
      conversions: 8
    },
    {
      id: '2',
      name: '보증금 무료 프로모션',
      type: 'free_deposit',
      description: '신규 입주자 보증금 무료',
      startDate: '2023-11-15',
      endDate: '2024-02-15',
      targetOccupancy: 90,
      currentOccupancy: 67,
      status: 'active',
      budget: 3000000,
      spent: 1800000,
      conversions: 12
    },
    {
      id: '3',
      name: '첫달 무료 이벤트',
      type: 'first_month_free',
      description: '첫달 월세 무료 + 보증금 50% 할인',
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      targetOccupancy: 95,
      currentOccupancy: 23,
      status: 'active',
      budget: 8000000,
      spent: 2100000,
      conversions: 7
    }
  ])

  const stats = [
    {
      title: '총 고시원 수',
      value: '24개',
      change: '+2',
      icon: Building2,
      color: 'accent'
    },
    {
      title: '총 직원 수',
      value: '156명',
      change: '+12',
      icon: Users,
      color: 'success'
    },
    {
      title: '월 총 비용',
      value: `₩${(89000000 + analysisData.fixedCosts.totalCost).toLocaleString()}`,
      change: '-5%',
      icon: DollarSign,
      color: 'warning'
    },
    {
      title: '평균 입주율',
      value: '94%',
      change: '+3%',
      icon: TrendingUp,
      color: 'info'
    }
  ]

  const marketingStats = [
    {
      title: '활성 프로모션',
      value: marketingStrategies.filter(s => s.status === 'active').length.toString(),
      change: '+1',
      icon: Tag,
      color: 'purple'
    },
    {
      title: '총 전환율',
      value: `${Math.round((marketingStrategies.reduce((sum, s) => sum + s.conversions, 0) / 
        marketingStrategies.reduce((sum, s) => sum + s.spent, 0) * 1000000) * 100)}%`,
      change: '+2.5%',
      icon: Target,
      color: 'green'
    },
    {
      title: '마케팅 예산',
      value: `₩${marketingStrategies.reduce((sum, s) => sum + s.budget, 0).toLocaleString()}`,
      change: '-10%',
      icon: DollarSign,
      color: 'orange'
    },
    {
      title: 'ROI',
      value: `${Math.round((marketingStrategies.reduce((sum, s) => sum + s.conversions * 300000, 0) / 
        marketingStrategies.reduce((sum, s) => sum + s.spent, 0)) * 100)}%`,
      change: '+15%',
      icon: BarChart3,
      color: 'blue'
    }
  ]

  const recentBookings = [
    {
      id: '1',
      employee: '김철수',
      gosiwon: '강남역 프리미엄 고시원',
      checkIn: '2024-01-15',
      checkOut: '2024-04-15',
      status: 'active',
      cost: '₩1,350,000'
    },
    {
      id: '2',
      employee: '이영희',
      gosiwon: '홍대입구 스튜디오 고시원',
      checkIn: '2024-01-20',
      checkOut: '2024-03-20',
      status: 'pending',
      cost: '₩1,140,000'
    },
    {
      id: '3',
      employee: '박민수',
      gosiwon: '신촌역 경제형 고시원',
      checkIn: '2024-01-25',
      checkOut: '2024-06-25',
      status: 'active',
      cost: '₩960,000'
    }
  ]

  const tabs = [
    { id: 'overview', name: '개요', icon: Eye },
    { id: 'bookings', name: '예약 관리', icon: Calendar },
    { id: 'employees', name: '직원 관리', icon: Users },
    { id: 'tenants', name: '입실자 관리하기', icon: Users },
    { id: 'marketing', name: '마케팅 전략', icon: Tag },
    { id: 'fixed-costs', name: '고정지출 계산', icon: Calculator },
    { id: 'analyzer', name: '분석도구 열기', icon: BarChart3 },
    { id: 'community', name: '커뮤니티 참여하기', icon: MessageCircle },
    { id: 'reports', name: '보고서', icon: FileText }
  ]

  const handleAnalysisSave = (data: {
    fixedCosts: { items: FixedCostItem[], totalCost: number }
    investment: {
      totalInvestment: number
      breakEvenMonths: number
      breakEvenYears: number
      annualROI: number
      monthlyProfit: number
    }
  }) => {
    setAnalysisData(data)
  }

  const getPromotionIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return <Percent size={16} />
      case 'free_deposit':
        return <Gift size={16} />
      case 'first_month_free':
        return <Gift size={16} />
      case 'referral_bonus':
        return <Users size={16} />
      case 'early_bird':
        return <Clock size={16} />
      default:
        return <Tag size={16} />
    }
  }

  const getPromotionColor = (type: string) => {
    switch (type) {
      case 'discount':
        return 'bg-red-100 text-red-700'
      case 'free_deposit':
        return 'bg-green-100 text-green-700'
      case 'first_month_free':
        return 'bg-blue-100 text-blue-700'
      case 'referral_bonus':
        return 'bg-purple-100 text-purple-700'
      case 'early_bird':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-secondary-200 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-600 to-accent-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">사업주 전용 대시보드</h1>
            <p className="text-xl opacity-90">
              기업을 위한 고시원 관리 시스템으로 비용을 절약하고 효율성을 높이세요
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const colorClass = {
              accent: 'bg-accent-100 text-accent-600',
              success: 'bg-success-100 text-success-600',
              warning: 'bg-warning-100 text-warning-600',
              info: 'bg-info-100 text-info-600'
            }[stat.color]

            return (
              <div key={stat.title} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-accent-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-accent-800">{stat.value}</p>
                    <p className="text-sm text-success-600 flex items-center">
                      <TrendingUp size={14} className="mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${colorClass}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* Marketing Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-accent-800 mb-4">마케팅 성과</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingStats.map((stat, index) => {
              const Icon = stat.icon
              const colorClass = {
                purple: 'bg-purple-100 text-purple-600',
                green: 'bg-green-100 text-green-600',
                orange: 'bg-orange-100 text-orange-600',
                blue: 'bg-blue-100 text-blue-600'
              }[stat.color]

              return (
                <div key={stat.title} className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-accent-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-accent-800">{stat.value}</p>
                      <p className="text-sm text-success-600 flex items-center">
                        <TrendingUp size={14} className="mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${colorClass}`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-6 bg-white rounded-xl p-8 shadow-soft">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'community') {
                      router.push('/business-community')
                    } else {
                      setActiveTab(tab.id)
                    }
                  }}
                  className={`flex flex-col items-center space-y-3 px-8 py-6 rounded-xl text-sm font-medium transition-all duration-200 min-w-[140px] ${
                    activeTab === tab.id
                      ? 'bg-accent-500 text-white shadow-soft transform scale-105'
                      : 'text-accent-600 hover:text-accent-700 hover:bg-secondary-100 hover:transform hover:scale-105'
                  }`}
                >
                  <Icon size={28} />
                  <span className="text-center">{tab.name}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Bookings */}
              <div className="lg:col-span-2">
                <div className="card mb-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-accent-800">최근 예약</h3>
                    <button className="btn-primary">
                      <Plus size={16} className="mr-2" />
                      새 예약
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                            <Users size={20} className="text-accent-600" />
                          </div>
                          <div>
                            <p className="font-medium text-accent-800">{booking.employee}</p>
                            <p className="text-sm text-accent-600">{booking.gosiwon}</p>
                            <p className="text-xs text-accent-500">
                              {booking.checkIn} ~ {booking.checkOut}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-accent-800">{booking.cost}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'active' 
                              ? 'bg-success-100 text-success-700'
                              : 'bg-warning-100 text-warning-700'
                          }`}>
                            {booking.status === 'active' ? '입주중' : '대기중'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fixed Cost Summary */}
                <div className="card mb-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-accent-800">월 고정지출 현황</h3>
                    <button 
                      onClick={() => setIsAnalyzerOpen(true)}
                      className="btn-primary"
                    >
                      <Calculator size={16} className="mr-2" />
                      고정지출 계산
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl">
                      <p className="text-sm text-accent-600 mb-1">총 고정지출</p>
                      <p className="text-2xl font-bold text-accent-800">
                        ₩{analysisData.fixedCosts.totalCost.toLocaleString()}
                      </p>
                      <p className="text-xs text-accent-500 mt-1">월 기준</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-xl">
                      <p className="text-sm text-success-600 mb-1">연간 예상</p>
                      <p className="text-2xl font-bold text-success-800">
                        ₩{(analysisData.fixedCosts.totalCost * 12).toLocaleString()}
                      </p>
                      <p className="text-xs text-success-500 mt-1">연 기준</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-warning-50 to-warning-100 rounded-xl">
                      <p className="text-sm text-warning-600 mb-1">항목 수</p>
                      <p className="text-2xl font-bold text-warning-800">
                        {analysisData.fixedCosts.items.length}개
                      </p>
                      <p className="text-xs text-warning-500 mt-1">총 항목</p>
                    </div>
                  </div>
                  
                  {/* Top Categories */}
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-accent-800 mb-3">주요 지출 카테고리</h4>
                    <div className="space-y-2">
                      {analysisData.fixedCosts.items
                        .sort((a, b) => b.amount - a.amount)
                        .slice(0, 3)
                        .map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full">
                                {item.category}
                              </span>
                              <span className="text-sm text-accent-800">{item.name}</span>
                            </div>
                            <span className="font-semibold text-accent-800">
                              ₩{item.amount.toLocaleString()}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* 투자 회수 분석 섹션 */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-accent-800">투자 회수 분석</h3>
                    <button 
                      onClick={() => setIsAnalyzerOpen(true)}
                      className="btn-primary"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      분석 도구 열기
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
                      <p className="text-sm text-purple-600 mb-1">총 투자 비용</p>
                      <p className="text-2xl font-bold text-purple-800">
                        ₩{analysisData.investment.totalInvestment.toLocaleString()}
                      </p>
                      <p className="text-xs text-purple-500 mt-1">초기 투자</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                      <p className="text-sm text-green-600 mb-1">투자 회수 기간</p>
                      <p className="text-2xl font-bold text-green-800">
                        {analysisData.investment.breakEvenYears.toFixed(1)}년
                      </p>
                      <p className="text-xs text-green-500 mt-1">({analysisData.investment.breakEvenMonths}개월)</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                      <p className="text-sm text-blue-600 mb-1">연간 수익률</p>
                      <p className="text-2xl font-bold text-blue-800">
                        {analysisData.investment.annualROI.toFixed(1)}%
                      </p>
                      <p className="text-xs text-blue-500 mt-1">ROI</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-md font-medium text-accent-800 mb-3">수익성 분석</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">월 순이익</span>
                        <span className="font-semibold text-green-600">
                          ₩{analysisData.investment.monthlyProfit.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">월 수익률</span>
                        <span className="font-semibold text-blue-600">
                          {((analysisData.investment.monthlyProfit / analysisData.investment.totalInvestment) * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 사업주 커뮤니티 섹션 */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-accent-800">사업주 커뮤니티</h3>
                    <a 
                      href="/business-community"
                      className="btn-primary"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      커뮤니티 참여하기
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                      <p className="text-sm text-blue-600 mb-1">활성 멤버</p>
                      <p className="text-2xl font-bold text-blue-800">
                        156명
                      </p>
                      <p className="text-xs text-blue-500 mt-1">사업주</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                      <p className="text-sm text-green-600 mb-1">오늘 게시글</p>
                      <p className="text-2xl font-bold text-green-800">
                        3개
                      </p>
                      <p className="text-xs text-green-500 mt-1">새로운 소식</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
                      <p className="text-sm text-purple-600 mb-1">총 게시글</p>
                      <p className="text-2xl font-bold text-purple-800">
                        1,247개
                      </p>
                      <p className="text-xs text-purple-500 mt-1">지식 공유</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-md font-medium text-accent-800 mb-3">최근 인기 토픽</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">#입주율 관리</span>
                        <span className="text-xs text-gray-500">23개 댓글</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">#전기세 절약</span>
                        <span className="text-xs text-gray-500">18개 댓글</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">#보안 시스템</span>
                        <span className="text-xs text-gray-500">15개 댓글</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 입실자 관리 섹션 */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-accent-800">입실자 관리</h3>
                    <button className="btn-primary">
                      <Plus size={16} className="mr-2" />
                      입실자 추가
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <Users size={48} className="text-blue-600 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-blue-800 mb-2">총 입실자</h4>
                      <p className="text-3xl font-bold text-blue-600">156명</p>
                      <p className="text-sm text-blue-600 mt-2">입주율 94%</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <Calendar size={48} className="text-green-600 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-green-800 mb-2">이번 달 신규</h4>
                      <p className="text-3xl font-bold text-green-600">12명</p>
                      <p className="text-sm text-green-600 mt-2">+8% 증가</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                      <DollarSign size={48} className="text-orange-600 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-orange-800 mb-2">월 수익</h4>
                      <p className="text-3xl font-bold text-orange-600">₩89M</p>
                      <p className="text-sm text-orange-600 mt-2">+5% 증가</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <div className="card">
                  <h3 className="text-lg font-semibold text-accent-800 mb-6">빠른 액션</h3>
                  <div className="space-y-3">
                    <button className="w-full btn-primary">
                      <Calendar size={16} className="mr-2" />
                      대량 예약
                    </button>
                    <button className="w-full btn-secondary">
                      <FileText size={16} className="mr-2" />
                      세금계산서 발행
                    </button>
                    <button className="w-full btn-outline">
                      <Download size={16} className="mr-2" />
                      비용 보고서
                    </button>
                    <button className="w-full btn-outline">
                      <Users size={16} className="mr-2" />
                      직원 관리
                    </button>
                  </div>
                </div>

                {/* Cost Savings */}
                <div className="card mt-6">
                  <h3 className="text-lg font-semibold text-accent-800 mb-4">비용 절약 현황</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>이번 달 절약</span>
                        <span className="font-semibold text-success-600">₩4,200,000</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div className="bg-success-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>목표 달성률</span>
                        <span className="font-semibold text-accent-600">75%</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div className="bg-accent-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-accent-800">예약 관리</h3>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400" size={16} />
                    <input
                      type="text"
                      placeholder="직원명 또는 고시원명 검색"
                      className="input-field pl-10 w-64"
                    />
                  </div>
                  <button className="btn-secondary">
                    <Filter size={16} className="mr-2" />
                    필터
                  </button>
                </div>
              </div>
              <p className="text-accent-600">예약 관리 기능이 여기에 표시됩니다.</p>
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-accent-800">직원 관리</h3>
                <button className="btn-primary">
                  <Plus size={16} className="mr-2" />
                  직원 추가
                </button>
              </div>
              <p className="text-accent-600">직원 관리 기능이 여기에 표시됩니다.</p>
            </div>
          )}

          {activeTab === 'marketing' && (
            <div className="space-y-6">
              {/* Marketing Strategy Overview */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-accent-800">마케팅 전략 관리</h3>
                  <button className="btn-primary">
                    <Plus size={16} className="mr-2" />
                    전략 추가
                  </button>
                </div>
                
                {/* Strategy Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {marketingStrategies.map((strategy) => (
                    <div key={strategy.id} className="border border-secondary-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${getPromotionColor(strategy.type)}`}>
                            {getPromotionIcon(strategy.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-accent-800">{strategy.name}</h4>
                            <p className="text-sm text-accent-600">{strategy.description}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          strategy.status === 'active' ? 'bg-green-100 text-green-700' :
                          strategy.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {strategy.status === 'active' ? '활성' : 
                           strategy.status === 'paused' ? '일시정지' : '종료'}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-accent-600">입주율 목표</span>
                          <span className="font-medium">{strategy.currentOccupancy}% / {strategy.targetOccupancy}%</span>
                        </div>
                        <div className="w-full bg-secondary-200 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${Math.min((strategy.currentOccupancy / strategy.targetOccupancy) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-secondary-50 rounded-lg">
                          <p className="text-xs text-accent-600 mb-1">예산 사용률</p>
                          <p className="text-lg font-bold text-accent-800">
                            {Math.round((strategy.spent / strategy.budget) * 100)}%
                          </p>
                        </div>
                        <div className="text-center p-3 bg-secondary-50 rounded-lg">
                          <p className="text-xs text-accent-600 mb-1">전환율</p>
                          <p className="text-lg font-bold text-accent-800">
                            {strategy.conversions}명
                          </p>
                        </div>
                      </div>

                      {/* Date Range */}
                      <div className="flex justify-between text-sm text-accent-600 mb-4">
                        <span>{strategy.startDate} ~ {strategy.endDate}</span>
                        <span>₩{strategy.spent.toLocaleString()} / ₩{strategy.budget.toLocaleString()}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button className="flex-1 btn-secondary text-sm">
                          <Edit size={14} className="mr-1" />
                          수정
                        </button>
                        <button className="flex-1 btn-outline text-sm">
                          <BarChart3 size={14} className="mr-1" />
                          분석
                        </button>
                        <button className={`px-3 py-2 rounded-md text-sm ${
                          strategy.status === 'active' 
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}>
                          {strategy.status === 'active' ? '일시정지' : '활성화'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Marketing Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recommended Strategies */}
                <div className="card">
                  <h4 className="text-lg font-semibold text-accent-800 mb-4">추천 전략</h4>
                  <div className="space-y-3">
                    <div className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-accent-800">빈방이 많을 때</h5>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">긴급</span>
                      </div>
                      <p className="text-sm text-accent-600 mb-2">입주율이 30% 이하일 때 추천하는 전략들</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">첫달 무료</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">보증금 무료</span>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">20% 할인</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-secondary-200 rounded-lg hover:bg-secondary-50 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-accent-800">시즌별 프로모션</h5>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">시즌</span>
                      </div>
                      <p className="text-sm text-accent-600 mb-2">학기 시작 시기에 맞춘 전략</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">얼리버드</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">추천인 보너스</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Analytics */}
                <div className="card">
                  <h4 className="text-lg font-semibold text-accent-800 mb-4">성과 분석</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>평균 전환율</span>
                        <span className="font-medium">12.5%</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '12.5%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>ROI</span>
                        <span className="font-medium">340%</span>
                      </div>
                      <div className="w-full bg-secondary-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-secondary-200">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">27</p>
                        <p className="text-xs text-accent-600">총 전환</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">₩5.1M</p>
                        <p className="text-xs text-accent-600">총 수익</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-accent-800">보고서</h3>
                <button className="btn-secondary">
                  <Download size={16} className="mr-2" />
                  내보내기
                </button>
              </div>
              <p className="text-accent-600">보고서 기능이 여기에 표시됩니다.</p>
            </div>
          )}

          {activeTab === 'tenants' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-accent-800">입실자 관리</h3>
                <button className="btn-primary">
                  <Plus size={16} className="mr-2" />
                  입실자 추가
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Users size={48} className="text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-blue-800 mb-2">총 입실자</h4>
                  <p className="text-3xl font-bold text-blue-600">156명</p>
                  <p className="text-sm text-blue-600 mt-2">입주율 94%</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <Calendar size={48} className="text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-green-800 mb-2">이번 달 신규</h4>
                  <p className="text-3xl font-bold text-green-600">12명</p>
                  <p className="text-sm text-green-600 mt-2">+8% 증가</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <DollarSign size={48} className="text-orange-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-orange-800 mb-2">월 수익</h4>
                  <p className="text-3xl font-bold text-orange-600">₩89M</p>
                  <p className="text-sm text-orange-600 mt-2">+5% 증가</p>
                </div>
              </div>
              <p className="text-accent-600 mt-6">입실자 관리 기능이 여기에 표시됩니다.</p>
            </div>
          )}

          {activeTab === 'fixed-costs' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-accent-800">고정지출 계산</h3>
                <button 
                  onClick={() => setIsAnalyzerOpen(true)}
                  className="btn-primary"
                >
                  <Calculator size={16} className="mr-2" />
                  분석도구 열기
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl">
                  <p className="text-sm text-accent-600 mb-1">총 고정지출</p>
                  <p className="text-2xl font-bold text-accent-800">
                    ₩{analysisData.fixedCosts.totalCost.toLocaleString()}
                  </p>
                  <p className="text-xs text-accent-500 mt-1">월 기준</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-xl">
                  <p className="text-sm text-success-600 mb-1">연간 예상</p>
                  <p className="text-2xl font-bold text-success-800">
                    ₩{(analysisData.fixedCosts.totalCost * 12).toLocaleString()}
                  </p>
                  <p className="text-xs text-success-500 mt-1">연 기준</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-warning-50 to-warning-100 rounded-xl">
                  <p className="text-sm text-warning-600 mb-1">손익분기점</p>
                  <p className="text-2xl font-bold text-warning-800">
                    {analysisData.investment.breakEvenMonths}개월
                  </p>
                  <p className="text-xs text-warning-500 mt-1">투자 회수</p>
                </div>
              </div>
              <p className="text-accent-600">고정지출 계산 기능이 여기에 표시됩니다.</p>
            </div>
          )}

          {activeTab === 'analyzer' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-accent-800">분석도구</h3>
                <button 
                  onClick={() => setIsAnalyzerOpen(true)}
                  className="btn-primary"
                >
                  <BarChart3 size={16} className="mr-2" />
                  분석 시작
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <h4 className="text-lg font-semibold text-purple-800 mb-4">투자 분석</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-purple-600">총 투자금액</span>
                      <span className="font-semibold">₩{analysisData.investment.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">연간 ROI</span>
                      <span className="font-semibold">{analysisData.investment.annualROI}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">월 수익</span>
                      <span className="font-semibold">₩{analysisData.investment.monthlyProfit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <h4 className="text-lg font-semibold text-blue-800 mb-4">성과 지표</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-600">평균 입주율</span>
                      <span className="font-semibold">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">고객 만족도</span>
                      <span className="font-semibold">4.8/5.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">재계약율</span>
                      <span className="font-semibold">87%</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-accent-600 mt-6">분석도구 기능이 여기에 표시됩니다.</p>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-accent-800">커뮤니티</h3>
                <button className="btn-primary">
                  <MessageCircle size={16} className="mr-2" />
                  새 글 작성
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <h4 className="text-lg font-semibold text-green-800 mb-4">최근 토론</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg">
                      <h5 className="font-medium text-green-800">고시원 운영 팁 공유</h5>
                      <p className="text-sm text-green-600">입주율 향상을 위한 노하우를 나눠요</p>
                      <p className="text-xs text-green-500 mt-1">댓글 23개 • 2시간 전</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <h5 className="font-medium text-green-800">시장 동향 분석</h5>
                      <p className="text-sm text-green-600">2024년 고시원 시장 전망</p>
                      <p className="text-xs text-green-500 mt-1">댓글 15개 • 5시간 전</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <h4 className="text-lg font-semibold text-orange-800 mb-4">커뮤니티 통계</h4>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">1,247</p>
                      <p className="text-sm text-orange-600">총 회원수</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">89</p>
                      <p className="text-sm text-orange-600">오늘 새 글</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">156</p>
                      <p className="text-sm text-orange-600">활성 토론</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-accent-600 mt-6">커뮤니티 기능이 여기에 표시됩니다.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Business Analyzer Modal */}
      <BusinessAnalyzer
        isOpen={isAnalyzerOpen}
        onClose={() => setIsAnalyzerOpen(false)}
        onSave={handleAnalysisSave}
      />
    </div>
  )
} 