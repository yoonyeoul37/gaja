'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Upload, 
  X, 
  Check,
  Building,
  MapPin,
  DollarSign,
  Settings,
  Image,
  FileText
} from 'lucide-react'
import { 
  registrationSteps, 
  facilityOptions, 
  amenityOptions, 
  ruleOptions, 
  tagOptions,
  formatPrice 
} from '@/lib/registration'

interface RegistrationFormProps {
  onComplete: (data: any) => void
}

export default function RegistrationForm({ onComplete }: RegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // 사업자 정보
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    businessLicense: '',
    
    // 고시원 정보
    name: '',
    location: '',
    address: '',
    description: '',
    price: 0,
    deposit: 0,
    area: 0,
    capacity: 0,
    
    // 시설 정보
    facilities: [] as string[],
    amenities: [] as string[],
    rules: [] as string[],
    
    // 이미지
    images: [] as string[],
    documents: [] as string[],
    
    // 운영 정보
    checkInTime: '14:00',
    checkOutTime: '11:00',
    contactPhone: '',
    contactEmail: '',
    
    // 위치 정보
    subwayStations: [] as string[],
    busStations: [] as string[],
    
    // 추가 정보
    tags: [] as string[],
    specialFeatures: [] as string[],
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 0: // 기본 정보
        if (!formData.ownerName.trim()) newErrors.ownerName = '사업자명을 입력해주세요'
        if (!formData.ownerEmail.trim()) newErrors.ownerEmail = '이메일을 입력해주세요'
        if (!formData.ownerPhone.trim()) newErrors.ownerPhone = '연락처를 입력해주세요'
        if (!formData.businessLicense.trim()) newErrors.businessLicense = '사업자등록번호를 입력해주세요'
        if (!formData.name.trim()) newErrors.name = '고시원명을 입력해주세요'
        if (!formData.location.trim()) newErrors.location = '위치를 입력해주세요'
        if (!formData.address.trim()) newErrors.address = '상세주소를 입력해주세요'
        if (!formData.description.trim()) newErrors.description = '설명을 입력해주세요'
        if (formData.price <= 0) newErrors.price = '월세를 입력해주세요'
        if (formData.deposit < 0) newErrors.deposit = '보증금을 입력해주세요'
        if (formData.area <= 0) newErrors.area = '면적을 입력해주세요'
        if (formData.capacity <= 0) newErrors.capacity = '수용인원을 입력해주세요'
        break
      
      case 1: // 상세 정보
        if (formData.facilities.length === 0) newErrors.facilities = '최소 하나의 시설을 선택해주세요'
        if (!formData.contactPhone.trim()) newErrors.contactPhone = '연락처를 입력해주세요'
        if (!formData.contactEmail.trim()) newErrors.contactEmail = '이메일을 입력해주세요'
        break
      
      case 2: // 이미지 및 문서
        if (formData.images.length === 0) newErrors.images = '최소 하나의 이미지를 업로드해주세요'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, registrationSteps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onComplete(formData)
    }
  }

  const toggleArrayField = (field: string, value: string) => {
    const currentArray = formData[field as keyof typeof formData] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFormData(field, newArray)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* 사업자 정보 */}
            <div>
              <h3 className="text-lg font-semibold text-accent-800 mb-4 flex items-center">
                <Building size={20} className="mr-2" />
                사업자 정보
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    사업자명 *
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => updateFormData('ownerName', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="사업자명을 입력하세요"
                  />
                  {errors.ownerName && (
                    <p className="text-error-600 text-sm mt-1">{errors.ownerName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => updateFormData('ownerEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="이메일을 입력하세요"
                  />
                  {errors.ownerEmail && (
                    <p className="text-error-600 text-sm mt-1">{errors.ownerEmail}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    value={formData.ownerPhone}
                    onChange={(e) => updateFormData('ownerPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="010-1234-5678"
                  />
                  {errors.ownerPhone && (
                    <p className="text-error-600 text-sm mt-1">{errors.ownerPhone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    사업자등록번호 *
                  </label>
                  <input
                    type="text"
                    value={formData.businessLicense}
                    onChange={(e) => updateFormData('businessLicense', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="123-45-67890"
                  />
                  {errors.businessLicense && (
                    <p className="text-error-600 text-sm mt-1">{errors.businessLicense}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 고시원 기본 정보 */}
            <div>
              <h3 className="text-lg font-semibold text-accent-800 mb-4 flex items-center">
                <MapPin size={20} className="mr-2" />
                고시원 기본 정보
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    고시원명 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="고시원명을 입력하세요"
                  />
                  {errors.name && (
                    <p className="text-error-600 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      위치 *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => updateFormData('location', e.target.value)}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="서울 강남구 강남대로 123"
                    />
                    {errors.location && (
                      <p className="text-error-600 text-sm mt-1">{errors.location}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      상세주소 *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => updateFormData('address', e.target.value)}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                      placeholder="서울 강남구 강남대로 123, 4층"
                    />
                    {errors.address && (
                      <p className="text-error-600 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    설명 *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                    placeholder="고시원에 대한 상세한 설명을 입력하세요"
                  />
                  {errors.description && (
                    <p className="text-error-600 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 가격 및 규모 정보 */}
            <div>
              <h3 className="text-lg font-semibold text-accent-800 mb-4 flex items-center">
                <DollarSign size={20} className="mr-2" />
                가격 및 규모 정보
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    월세 (원) *
                  </label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => updateFormData('price', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="450000"
                  />
                  {errors.price && (
                    <p className="text-error-600 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    보증금 (원)
                  </label>
                  <input
                    type="number"
                    value={formData.deposit || ''}
                    onChange={(e) => updateFormData('deposit', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="500000"
                  />
                  {errors.deposit && (
                    <p className="text-error-600 text-sm mt-1">{errors.deposit}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    면적 (평) *
                  </label>
                  <input
                    type="number"
                    value={formData.area || ''}
                    onChange={(e) => updateFormData('area', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="6"
                  />
                  {errors.area && (
                    <p className="text-error-600 text-sm mt-1">{errors.area}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    수용인원 (명) *
                  </label>
                  <input
                    type="number"
                    value={formData.capacity || ''}
                    onChange={(e) => updateFormData('capacity', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="20"
                  />
                  {errors.capacity && (
                    <p className="text-error-600 text-sm mt-1">{errors.capacity}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* 시설 정보 */}
            <div>
              <h3 className="text-lg font-semibold text-accent-800 mb-4 flex items-center">
                <Settings size={20} className="mr-2" />
                시설 정보
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-3">
                    기본 시설 *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {facilityOptions.map(facility => (
                      <label key={facility} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.facilities.includes(facility)}
                          onChange={() => toggleArrayField('facilities', facility)}
                          className="w-4 h-4 text-accent-600 border-secondary-300 rounded focus:ring-accent-500"
                        />
                        <span className="text-sm text-accent-700">{facility}</span>
                      </label>
                    ))}
                  </div>
                  {errors.facilities && (
                    <p className="text-error-600 text-sm mt-1">{errors.facilities}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-3">
                    편의시설
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenityOptions.map(amenity => (
                      <label key={amenity} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => toggleArrayField('amenities', amenity)}
                          className="w-4 h-4 text-accent-600 border-secondary-300 rounded focus:ring-accent-500"
                        />
                        <span className="text-sm text-accent-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-3">
                    이용 규칙
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {ruleOptions.map(rule => (
                      <label key={rule} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.rules.includes(rule)}
                          onChange={() => toggleArrayField('rules', rule)}
                          className="w-4 h-4 text-accent-600 border-secondary-300 rounded focus:ring-accent-500"
                        />
                        <span className="text-sm text-accent-700">{rule}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 운영 정보 */}
            <div>
              <h3 className="text-lg font-semibold text-accent-800 mb-4">운영 정보</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    체크인 시간
                  </label>
                  <input
                    type="time"
                    value={formData.checkInTime}
                    onChange={(e) => updateFormData('checkInTime', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    체크아웃 시간
                  </label>
                  <input
                    type="time"
                    value={formData.checkOutTime}
                    onChange={(e) => updateFormData('checkOutTime', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    연락처 *
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => updateFormData('contactPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="02-1234-5678"
                  />
                  {errors.contactPhone && (
                    <p className="text-error-600 text-sm mt-1">{errors.contactPhone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-accent-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => updateFormData('contactEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                    placeholder="contact@gosiwon.com"
                  />
                  {errors.contactEmail && (
                    <p className="text-error-600 text-sm mt-1">{errors.contactEmail}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* 이미지 업로드 */}
            <div>
              <h3 className="text-lg font-semibold text-accent-800 mb-4 flex items-center">
                <Image size={20} className="mr-2" />
                이미지 업로드 *
              </h3>
              <div className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center">
                <Upload size={48} className="text-accent-400 mx-auto mb-4" />
                <p className="text-accent-600 mb-2">이미지를 드래그하여 업로드하거나 클릭하여 선택하세요</p>
                <p className="text-sm text-accent-500">최대 10개 파일, 각 파일 최대 5MB</p>
                <button className="mt-4 px-6 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200">
                  이미지 선택
                </button>
              </div>
              {errors.images && (
                <p className="text-error-600 text-sm mt-1">{errors.images}</p>
              )}
            </div>

            {/* 문서 업로드 */}
            <div>
              <h3 className="text-lg font-semibold text-accent-800 mb-4 flex items-center">
                <FileText size={20} className="mr-2" />
                문서 업로드
              </h3>
              <div className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center">
                <Upload size={48} className="text-accent-400 mx-auto mb-4" />
                <p className="text-accent-600 mb-2">사업자등록증, 건물사용승인서 등을 업로드하세요</p>
                <p className="text-sm text-accent-500">PDF, JPG, PNG 파일만 가능</p>
                <button className="mt-4 px-6 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200">
                  문서 선택
                </button>
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-secondary-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-accent-800 mb-4">입력 정보 검토</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-accent-800 mb-2">사업자 정보</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-accent-600">사업자명:</span>
                      <span className="ml-2 text-accent-800">{formData.ownerName}</span>
                    </div>
                    <div>
                      <span className="text-accent-600">이메일:</span>
                      <span className="ml-2 text-accent-800">{formData.ownerEmail}</span>
                    </div>
                    <div>
                      <span className="text-accent-600">연락처:</span>
                      <span className="ml-2 text-accent-800">{formData.ownerPhone}</span>
                    </div>
                    <div>
                      <span className="text-accent-600">사업자등록번호:</span>
                      <span className="ml-2 text-accent-800">{formData.businessLicense}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-accent-800 mb-2">고시원 정보</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-accent-600">고시원명:</span>
                      <span className="ml-2 text-accent-800">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-accent-600">위치:</span>
                      <span className="ml-2 text-accent-800">{formData.location}</span>
                    </div>
                    <div>
                      <span className="text-accent-600">상세주소:</span>
                      <span className="ml-2 text-accent-800">{formData.address}</span>
                    </div>
                    <div>
                      <span className="text-accent-600">월세:</span>
                      <span className="ml-2 text-accent-800">{formatPrice(formData.price)}</span>
                    </div>
                    <div>
                      <span className="text-accent-600">보증금:</span>
                      <span className="ml-2 text-accent-800">{formatPrice(formData.deposit)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-accent-800 mb-2">시설 정보</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-accent-600">기본 시설:</span>
                      <span className="ml-2 text-accent-800">{formData.facilities.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-accent-600">편의시설:</span>
                      <span className="ml-2 text-accent-800">{formData.amenities.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Check size={20} className="text-success-600" />
                <span className="text-success-800 font-medium">모든 정보가 올바르게 입력되었습니다</span>
              </div>
              <p className="text-success-700 text-sm mt-1">
                제출 후 관리자 검토를 거쳐 승인됩니다. 검토 기간은 보통 3-5일 소요됩니다.
              </p>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {registrationSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                index <= currentStep
                  ? 'bg-accent-600 border-accent-600 text-white'
                  : 'border-secondary-300 text-secondary-400'
              }`}>
                {index < currentStep ? (
                  <Check size={20} />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${
                  index <= currentStep ? 'text-accent-800' : 'text-secondary-400'
                }`}>
                  {step.title}
                </h3>
                <p className="text-xs text-secondary-500">{step.description}</p>
              </div>
              {index < registrationSteps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-accent-600' : 'bg-secondary-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl border border-secondary-200 p-8">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-6 py-3 border border-secondary-300 text-accent-700 rounded-lg hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <ChevronLeft size={16} />
          <span>이전</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentStep(0)}
            className="px-4 py-2 text-sm text-accent-600 hover:text-accent-800 transition-colors duration-200"
          >
            임시저장
          </button>
          {currentStep < registrationSteps.length - 1 ? (
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 px-6 py-3 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200"
            >
              <span>다음</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-6 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors duration-200"
            >
              <Check size={16} />
              <span>등록 제출</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 