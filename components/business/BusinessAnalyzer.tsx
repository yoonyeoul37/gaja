'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calculator, Save, Download, Plus, Trash2, TrendingUp, DollarSign, Calendar, Target } from 'lucide-react'

interface FixedCostItem {
  id: string
  category: string
  name: string
  amount: number
  description?: string
}

interface InvestmentData {
  initialInvestment: number
  renovationCost: number
  otherCosts: number
  monthlyRevenue: number
  occupancyRate: number
}

interface BusinessAnalyzerProps {
  isOpen: boolean
  onClose: () => void
  onSave: (analysisData: any) => void
}

const defaultCategories = [
  '임대료',
  '관리비',
  '전기세',
  '수도세',
  '가스비',
  '인터넷/통신비',
  '보험료',
  '세금',
  '유지보수비',
  '기타'
]

export default function BusinessAnalyzer({ isOpen, onClose, onSave }: BusinessAnalyzerProps) {
  const [activeTab, setActiveTab] = useState('fixed-costs')
  const [items, setItems] = useState<FixedCostItem[]>([
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
    },
    {
      id: '4',
      category: '수도세',
      name: '수도 사용료',
      amount: 200000,
      description: '월 수도세'
    },
    {
      id: '5',
      category: '인터넷/통신비',
      name: '인터넷 및 통신비',
      amount: 150000,
      description: '월 통신비'
    }
  ])

  const [investmentData, setInvestmentData] = useState<InvestmentData>({
    initialInvestment: 300000000, // 3억
    renovationCost: 50000000,     // 5천만원
    otherCosts: 10000000,         // 1천만원
    monthlyRevenue: 10000000,     // 1천만원
    occupancyRate: 85             // 85%
  })

  const totalFixedCost = items.reduce((sum, item) => sum + item.amount, 0)
  const totalInvestment = investmentData.initialInvestment + investmentData.renovationCost + investmentData.otherCosts
  const effectiveMonthlyRevenue = investmentData.monthlyRevenue * (investmentData.occupancyRate / 100)
  const monthlyProfit = effectiveMonthlyRevenue - totalFixedCost
  const breakEvenMonths = monthlyProfit > 0 ? Math.ceil(totalInvestment / monthlyProfit) : 0
  const breakEvenYears = breakEvenMonths / 12
  const annualROI = ((monthlyProfit * 12) / totalInvestment) * 100

  const addItem = () => {
    const newItem: FixedCostItem = {
      id: Date.now().toString(),
      category: '기타',
      name: '',
      amount: 0,
      description: ''
    }
    setItems([...items, newItem])
  }

  const updateItem = (id: string, field: keyof FixedCostItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const exportToCSV = () => {
    const csvContent = [
      ['카테고리', '항목명', '금액', '설명'],
      ...items.map(item => [item.category, item.name, item.amount.toLocaleString(), item.description || '']),
      ['', '총 고정지출', totalFixedCost.toLocaleString(), '']
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = '사업분석_결과.csv'
    link.click()
  }

  const saveAnalysis = () => {
    const analysisData = {
      fixedCosts: {
        items,
        totalCost: totalFixedCost
      },
      investment: {
        ...investmentData,
        totalInvestment,
        breakEvenMonths,
        breakEvenYears,
        annualROI,
        monthlyProfit
      }
    }
    onSave(analysisData)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Calculator className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">사업 분석 도구</h2>
                    <p className="text-gray-600">고정지출 계산 및 투자 회수 분석</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('fixed-costs')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'fixed-costs'
                      ? 'bg-white text-amber-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  고정지출 계산
                </button>
                <button
                  onClick={() => setActiveTab('investment')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'investment'
                      ? 'bg-white text-amber-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 inline mr-2" />
                  투자 회수 분석
                </button>
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'summary'
                      ? 'bg-white text-amber-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Target className="w-4 h-4 inline mr-2" />
                  종합 분석
                </button>
              </div>

              {/* Fixed Costs Tab */}
              {activeTab === 'fixed-costs' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-amber-600">
                        {totalFixedCost.toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-600">월 총 고정지출</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">
                        {(totalFixedCost * 12).toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-600">연간 예상 고정지출</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">
                        {items.length}개
                      </div>
                      <div className="text-sm text-gray-600">등록된 항목</div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">고정지출 항목</h3>
                      <button
                        onClick={addItem}
                        className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>항목 추가</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                          <select
                            value={item.category}
                            onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          >
                            {defaultCategories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            placeholder="항목명"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                          <input
                            type="number"
                            value={item.amount}
                            onChange={(e) => updateItem(item.id, 'amount', parseInt(e.target.value) || 0)}
                            placeholder="금액"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            value={item.description || ''}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            placeholder="설명 (선택)"
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Investment Analysis Tab */}
              {activeTab === 'investment' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">초기 투자 비용</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            매입 비용 (원)
                          </label>
                          <input
                            type="number"
                            value={investmentData.initialInvestment}
                            onChange={(e) => setInvestmentData({
                              ...investmentData,
                              initialInvestment: parseInt(e.target.value) || 0
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            리모델링 비용 (원)
                          </label>
                          <input
                            type="number"
                            value={investmentData.renovationCost}
                            onChange={(e) => setInvestmentData({
                              ...investmentData,
                              renovationCost: parseInt(e.target.value) || 0
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            기타 비용 (원)
                          </label>
                          <input
                            type="number"
                            value={investmentData.otherCosts}
                            onChange={(e) => setInvestmentData({
                              ...investmentData,
                              otherCosts: parseInt(e.target.value) || 0
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">수익 예상</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            월 예상 수익 (원)
                          </label>
                          <input
                            type="number"
                            value={investmentData.monthlyRevenue}
                            onChange={(e) => setInvestmentData({
                              ...investmentData,
                              monthlyRevenue: parseInt(e.target.value) || 0
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            입주율 (%)
                          </label>
                          <input
                            type="number"
                            value={investmentData.occupancyRate}
                            onChange={(e) => setInvestmentData({
                              ...investmentData,
                              occupancyRate: parseInt(e.target.value) || 0
                            })}
                            min="0"
                            max="100"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">
                        {totalInvestment.toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-600">총 투자 비용</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-green-600">
                        {effectiveMonthlyRevenue.toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-600">실효 월 수익</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600">
                        {monthlyProfit.toLocaleString()}원
                      </div>
                      <div className="text-sm text-gray-600">월 순이익</div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600">
                        {breakEvenMonths}개월
                      </div>
                      <div className="text-sm text-gray-600">손익분기점</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Tab */}
              {activeTab === 'summary' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-amber-800 mb-4">투자 회수 분석 결과</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="text-3xl font-bold text-amber-600 mb-2">
                          {breakEvenYears.toFixed(1)}년
                        </div>
                        <div className="text-gray-600">투자 회수 기간</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-amber-600 mb-2">
                          {annualROI.toFixed(1)}%
                        </div>
                        <div className="text-gray-600">연간 수익률 (ROI)</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">비용 구조</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">월 고정지출</span>
                          <span className="font-semibold">{totalFixedCost.toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">총 투자 비용</span>
                          <span className="font-semibold">{totalInvestment.toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">월 순이익</span>
                          <span className="font-semibold text-green-600">{monthlyProfit.toLocaleString()}원</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">수익성 지표</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">월 수익률</span>
                          <span className="font-semibold">{((monthlyProfit / totalInvestment) * 100).toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">연간 수익률</span>
                          <span className="font-semibold">{annualROI.toFixed(2)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">손익분기점</span>
                          <span className="font-semibold">{breakEvenMonths}개월</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 p-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={exportToCSV}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>CSV 내보내기</span>
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    onClick={saveAnalysis}
                    className="flex items-center space-x-2 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>분석 저장</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 