import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-accent-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">가</span>
              </div>
              <span className="text-xl font-bold">가자고시원</span>
            </div>
            <p className="text-accent-200 mb-6 max-w-md">
              편안하고 따뜻한 고시원 정보 플랫폼으로, 
              당신의 새로운 시작을 응원합니다.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-accent-300 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-accent-300 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-accent-300 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/business" className="text-accent-300 hover:text-white transition-colors duration-200">
                  사업주전용
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-accent-300 hover:text-white transition-colors duration-200">
                  구인구직
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-accent-300 hover:text-white transition-colors duration-200">
                  고시원스토리
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-accent-300 hover:text-white transition-colors duration-200">
                  고시원 검색
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-accent-400" />
                <span className="text-accent-300">1588-1234</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-accent-400" />
                <span className="text-accent-300">info@gajagosiwon.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-accent-400" />
                <span className="text-accent-300">서울시 강남구 테헤란로 123</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-accent-300 text-sm">
              © {currentYear} 가자고시원. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-accent-300 hover:text-white text-sm transition-colors duration-200">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-accent-300 hover:text-white text-sm transition-colors duration-200">
                이용약관
              </Link>
              <Link href="/help" className="text-accent-300 hover:text-white text-sm transition-colors duration-200">
                고객센터
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 