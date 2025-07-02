'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle, AlertCircle, Building } from 'lucide-react'
import { LoginCredentials, RegisterData, validateEmail, validatePassword, validatePhone, formatPhone } from '@/lib/auth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin?: (user: any) => void
  onRegister?: (user: any) => void
}

type AuthMode = 'login' | 'register'

export default function AuthModal({ isOpen, onClose, onLogin, onRegister }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [loginData, setLoginData] = useState<LoginCredentials>({
    email: '',
    password: '',
    role: 'general'
  })

  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    role: 'general',
    agreeToTerms: false
  })

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }))
    // 에러 클리어
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // 에러 클리어
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const formatted = formatPhone(value)
    setRegisterData(prev => ({
      ...prev,
      phone: formatted
    }))
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }))
    }
  }

  const validateLoginForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!loginData.email) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
    }

    if (!loginData.password) {
      newErrors.password = '비밀번호를 입력해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateRegisterForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!registerData.email) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!validateEmail(registerData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
    }

    if (!registerData.password) {
      newErrors.password = '비밀번호를 입력해주세요'
    } else {
      const passwordValidation = validatePassword(registerData.password)
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0]
      }
    }

    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요'
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다'
    }

    if (!registerData.name) {
      newErrors.name = '이름을 입력해주세요'
    }

    if (!registerData.phone) {
      newErrors.phone = '연락처를 입력해주세요'
    } else if (!validatePhone(registerData.phone)) {
      newErrors.phone = '올바른 연락처 형식이 아닙니다 (예: 010-1234-5678)'
    }

    if (!registerData.agreeToTerms) {
      newErrors.agreeToTerms = '이용약관에 동의해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateLoginForm()) return

    setIsLoading(true)
    
    // 모의 로그인 처리
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 성공 시 콜백 호출
    if (onLogin) {
      const roleNames = {
        'general': '김철수',
        'gosiwon-business': '김고시원사장',
        'roomshare-business': '김룸쉐어사장'
      }
      onLogin({
        id: '1',
        email: loginData.email,
        name: roleNames[loginData.role],
        role: loginData.role
      })
    }
    
    setIsLoading(false)
    onClose()
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateRegisterForm()) return

    setIsLoading(true)
    
    // 모의 회원가입 처리
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 성공 시 콜백 호출
    if (onRegister) {
      onRegister({
        id: Date.now().toString(),
        email: registerData.email,
        name: registerData.name,
        role: registerData.role
      })
    }
    
    setIsLoading(false)
    onClose()
  }

  const resetForm = () => {
    setLoginData({ email: '', password: '', role: 'general' })
    setRegisterData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: '',
      role: 'general',
      agreeToTerms: false
    })
    setErrors({})
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode)
    resetForm()
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
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white rounded-2xl shadow-large max-w-md w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary-200">
              <h2 className="text-xl font-bold text-accent-800">
                {mode === 'login' ? '로그인' : '회원가입'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-accent-400 hover:text-accent-600 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Mode Tabs */}
              <div className="flex mb-6 bg-secondary-100 rounded-lg p-1">
                <button
                  onClick={() => switchMode('login')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    mode === 'login'
                      ? 'bg-white text-accent-800 shadow-sm'
                      : 'text-accent-600 hover:text-accent-800'
                  }`}
                >
                  로그인
                </button>
                <button
                  onClick={() => switchMode('register')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    mode === 'register'
                      ? 'bg-white text-accent-800 shadow-sm'
                      : 'text-accent-600 hover:text-accent-800'
                  }`}
                >
                  회원가입
                </button>
              </div>

              {/* Login Form */}
              {mode === 'login' && (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      <Mail size={16} className="inline mr-2" />
                      이메일
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      className={`input-field ${errors.email ? 'border-error-500' : ''}`}
                      placeholder="이메일을 입력하세요"
                    />
                    {errors.email && (
                      <p className="text-error-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      <Lock size={16} className="inline mr-2" />
                      비밀번호
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        className={`input-field pr-12 ${errors.password ? 'border-error-500' : ''}`}
                        placeholder="비밀번호를 입력하세요"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-400 hover:text-accent-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-error-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* 역할 선택 */}
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      <User size={16} className="inline mr-2" />
                      로그인 유형
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="role"
                          value="general"
                          checked={loginData.role === 'general'}
                          onChange={handleLoginChange}
                          className="sr-only"
                        />
                        <div className={`p-3 border rounded-lg text-center cursor-pointer transition-colors ${
                          loginData.role === 'general'
                            ? 'border-accent-500 bg-accent-50 text-accent-800'
                            : 'border-secondary-300 text-secondary-600 hover:border-accent-300'
                        }`}>
                          <User size={16} className="mx-auto mb-1" />
                          <span className="text-sm font-medium">일반</span>
                        </div>
                      </label>
                      
                      <label className="flex-1">
                        <input
                          type="radio"
                          name="role"
                          value="gosiwon-business"
                          checked={loginData.role === 'gosiwon-business'}
                          onChange={handleLoginChange}
                          className="sr-only"
                        />
                        <div className={`p-3 border rounded-lg text-center cursor-pointer transition-colors ${
                          loginData.role === 'gosiwon-business'
                            ? 'border-accent-500 bg-accent-50 text-accent-800'
                            : 'border-secondary-300 text-secondary-600 hover:border-accent-300'
                        }`}>
                          <Building size={16} className="mx-auto mb-1" />
                          <span className="text-sm font-medium">고시원사업주</span>
                        </div>
                      </label>

                      <label className="flex-1">
                        <input
                          type="radio"
                          name="role"
                          value="roomshare-business"
                          checked={loginData.role === 'roomshare-business'}
                          onChange={handleLoginChange}
                          className="sr-only"
                        />
                        <div className={`p-3 border rounded-lg text-center cursor-pointer transition-colors ${
                          loginData.role === 'roomshare-business'
                            ? 'border-accent-500 bg-accent-50 text-accent-800'
                            : 'border-secondary-300 text-secondary-600 hover:border-accent-300'
                        }`}>
                          <Building size={16} className="mx-auto mb-1" />
                          <span className="text-sm font-medium">룸쉐어사업주</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      로그인 상태 유지
                    </label>
                    <button type="button" className="text-accent-600 hover:text-accent-800">
                      비밀번호 찾기
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Register Form */}
              {mode === 'register' && (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      <Mail size={16} className="inline mr-2" />
                      이메일
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      className={`input-field ${errors.email ? 'border-error-500' : ''}`}
                      placeholder="이메일을 입력하세요"
                    />
                    {errors.email && (
                      <p className="text-error-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      <User size={16} className="inline mr-2" />
                      이름
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                      className={`input-field ${errors.name ? 'border-error-500' : ''}`}
                      placeholder="이름을 입력하세요"
                    />
                    {errors.name && (
                      <p className="text-error-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      <Phone size={16} className="inline mr-2" />
                      연락처
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={registerData.phone}
                      onChange={handlePhoneChange}
                      className={`input-field ${errors.phone ? 'border-error-500' : ''}`}
                      placeholder="010-0000-0000"
                    />
                    {errors.phone && (
                      <p className="text-error-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      계정 유형
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <label className="flex items-center p-3 border border-secondary-300 rounded-lg cursor-pointer hover:border-accent-300">
                        <input
                          type="radio"
                          name="role"
                          value="general"
                          checked={registerData.role === 'general'}
                          onChange={handleRegisterChange}
                          className="mr-2"
                        />
                        <div>
                          <div className="font-medium text-accent-800">일반</div>
                          <div className="text-xs text-accent-500">고시원 이용</div>
                        </div>
                      </label>
                      <label className="flex items-center p-3 border border-secondary-300 rounded-lg cursor-pointer hover:border-accent-300">
                        <input
                          type="radio"
                          name="role"
                          value="gosiwon-business"
                          checked={registerData.role === 'gosiwon-business'}
                          onChange={handleRegisterChange}
                          className="mr-2"
                        />
                        <div>
                          <div className="font-medium text-accent-800">고시원사업주</div>
                          <div className="text-xs text-accent-500">고시원 등록 및 관리</div>
                        </div>
                      </label>
                      <label className="flex items-center p-3 border border-secondary-300 rounded-lg cursor-pointer hover:border-accent-300">
                        <input
                          type="radio"
                          name="role"
                          value="roomshare-business"
                          checked={registerData.role === 'roomshare-business'}
                          onChange={handleRegisterChange}
                          className="mr-2"
                        />
                        <div>
                          <div className="font-medium text-accent-800">룸쉐어사업주</div>
                          <div className="text-xs text-accent-500">룸메이트/쉐어하우스 등록</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      <Lock size={16} className="inline mr-2" />
                      비밀번호
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        className={`input-field pr-12 ${errors.password ? 'border-error-500' : ''}`}
                        placeholder="비밀번호를 입력하세요"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-400 hover:text-accent-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-error-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      <Lock size={16} className="inline mr-2" />
                      비밀번호 확인
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        className={`input-field pr-12 ${errors.confirmPassword ? 'border-error-500' : ''}`}
                        placeholder="비밀번호를 다시 입력하세요"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-400 hover:text-accent-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-error-600 text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={registerData.agreeToTerms}
                        onChange={handleRegisterChange}
                        className="mt-1 mr-3"
                      />
                      <div className="text-sm text-accent-600">
                        <span className="text-accent-800 font-medium">이용약관</span> 및{' '}
                        <span className="text-accent-800 font-medium">개인정보처리방침</span>에 동의합니다
                      </div>
                    </label>
                    {errors.agreeToTerms && (
                      <p className="text-error-600 text-sm flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.agreeToTerms}
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 p-6 border-t border-secondary-200">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                취소
              </button>
              <button
                type="submit"
                onClick={mode === 'login' ? handleLogin : handleRegister}
                disabled={isLoading}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {mode === 'login' ? '로그인 중...' : '가입 중...'}
                  </div>
                ) : (
                  mode === 'login' ? '로그인' : '회원가입'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 