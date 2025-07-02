'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Building2, Users, BookOpen, Shield, Clock, Star } from 'lucide-react'

export default function Features() {
  const features = [
    {
      title: '사업주전용',
      description: '기업을 위한 대량 예약과 관리 시스템',
      icon: Building2,
      href: '/business',
      color: 'accent',
      features: ['대량 예약 시스템', '기업 계정 관리', '세금계산서 자동 발행', '비용 절약 분석']
    },
    {
      title: '구인구직',
      description: '고시원 커뮤니티에서 인재를 찾고 일자리를 구하세요',
      icon: Users,
      href: '/jobs',
      color: 'success',
      features: ['위치 기반 매칭', '실시간 채팅', '신원 인증', '후기 시스템']
    },
    {
      title: '고시원스토리',
      description: '입주자들의 생생한 이야기와 유용한 정보',
      icon: BookOpen,
      href: '/stories',
      color: 'info',
      features: ['입주자 인터뷰', '꾸미기 팁', '지역 가이드', '스터디 그룹']
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: '안전한 거래',
      description: '검증된 고시원과 안전한 예약 시스템'
    },
    {
      icon: Clock,
      title: '24시간 서비스',
      description: '언제든지 편리하게 이용할 수 있는 서비스'
    },
    {
      icon: Star,
      title: '검증된 정보',
      description: '실제 입주자들의 생생한 후기와 평점'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">가자고시원의 특별한 서비스</h2>
          <p className="section-subtitle">
            각각의 서비스가 당신의 고시원 라이프를 더욱 편안하고 풍요롭게 만들어드립니다
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const colorClass = {
              accent: 'bg-accent-50 border-accent-200 text-accent-600',
              success: 'bg-success-50 border-success-200 text-success-600',
              info: 'bg-info-50 border-info-200 text-info-600'
            }[feature.color]

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:shadow-large transition-all duration-300"
              >
                <div className={`w-16 h-16 ${colorClass} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-accent-800 mb-3">{feature.title}</h3>
                <p className="text-accent-600 mb-6">{feature.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-accent-600">
                      <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <Link href={feature.href} className="btn-outline w-full text-center">
                  자세히 보기
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-secondary-200 to-primary-100 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-accent-800 text-center mb-8">
            왜 가자고시원인가요?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <Icon size={28} className="text-accent-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-accent-800 mb-2">{benefit.title}</h4>
                  <p className="text-accent-600">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 