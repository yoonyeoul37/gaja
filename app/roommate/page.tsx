"use client"

import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Calendar, User, MessageCircle, Plus, Filter, Home, Users, Building, Star, Phone, Mail, Edit, Trash2, Camera, X } from 'lucide-react';
import Header from '@/components/Header';

// 편의시설 옵션
const amenityOptions = [
  '에어컨', '인터넷', '주차', '세탁기', '냉장고', '주방', '개인화장실', 
  '공용화장실', '거실', '발코니', '엘리베이터', 'CCTV', '24시간보안',
  '편의점', '카페', '독서실', '헬스장', '공용라운지'
];

// 룸메이트 광고 더미 데이터
const mockRoommateAds = [
  {
    id: 1,
    title: '강남역 2인실 룸메이트 모집',
    businessName: '강남하우스',
    location: '강남구',
    price: '35만원',
    type: '룸메이트',
    roomType: '2인실',
    availableDate: '2024-02-01',
    description: '강남역 3번 출구 도보 5분 거리의 깔끔한 2인실입니다. 에어컨, 인터넷, 주차 완비. 조용하고 성실한 분 환영합니다.',
    contact: '010-1234-5678',
    email: 'gangnam@house.com',
    createdAt: '2024-01-15',
    views: 45,
    rating: 4.5,
    images: ['/room1.jpg', '/room2.jpg'],
    amenities: ['에어컨', '인터넷', '주차', '세탁기', '냉장고'],
    deposit: '50만원'
  },
  {
    id: 2,
    title: '홍대입구 1인실 룸메이트 모집',
    businessName: '홍대하우스',
    location: '마포구',
    price: '28만원',
    type: '룸메이트',
    roomType: '1인실',
    availableDate: '2024-01-25',
    description: '홍대입구역 근처 1인실입니다. 개인 화장실, 주방 공용. 깔끔하고 조용한 환경입니다.',
    contact: '010-9876-5432',
    email: 'hongdae@house.com',
    createdAt: '2024-01-14',
    views: 32,
    rating: 4.2,
    images: ['/room3.jpg'],
    amenities: ['에어컨', '인터넷', '개인화장실', '주방'],
    deposit: '30만원'
  },
  {
    id: 3,
    title: '신촌역 3인실 룸메이트 모집',
    businessName: '신촌하우스',
    location: '서대문구',
    price: '25만원',
    type: '룸메이트',
    roomType: '3인실',
    availableDate: '2024-01-20',
    description: '신촌역 2번 출구 근처 3인실입니다. 대학생, 직장인 모두 환영합니다.',
    contact: '010-5555-1234',
    email: 'sinchon@house.com',
    createdAt: '2024-01-13',
    views: 28,
    rating: 4.0,
    images: ['/room4.jpg', '/room5.jpg'],
    amenities: ['에어컨', '인터넷', '세탁기', '주방'],
    deposit: '20만원'
  }
];

// 쉐어하우스 광고 더미 데이터
const mockSharehouseAds = [
  {
    id: 1,
    title: '강남역 3룸 쉐어하우스 모집',
    businessName: '강남쉐어하우스',
    location: '강남구',
    price: '85만원',
    type: '쉐어하우스',
    roomType: '3룸 아파트',
    availableDate: '2024-02-01',
    description: '강남역 근처 3룸 아파트에서 쉐어하우스 멤버를 모집합니다. 각자 개인방이고 공용 주방, 거실, 화장실 사용 가능합니다.',
    contact: '010-1234-5678',
    email: 'gangnam@sharehouse.com',
    createdAt: '2024-01-15',
    views: 38,
    rating: 4.3,
    images: ['/share1.jpg', '/share2.jpg', '/share3.jpg'],
    amenities: ['에어컨', '인터넷', '주차', '세탁기', '주방', '거실', '발코니'],
    deposit: '100만원',
    currentMembers: 2,
    maxMembers: 4
  },
  {
    id: 2,
    title: '홍대 근처 2룸 쉐어하우스 모집',
    businessName: '홍대쉐어하우스',
    location: '마포구',
    price: '65만원',
    type: '쉐어하우스',
    roomType: '2룸 원룸',
    availableDate: '2024-01-25',
    description: '홍대 근처 2룸 원룸에서 쉐어하우스 멤버를 모집합니다. 깔끔하고 조용한 분 환영합니다.',
    contact: '010-9876-5432',
    email: 'hongdae@sharehouse.com',
    createdAt: '2024-01-14',
    views: 25,
    rating: 4.1,
    images: ['/share4.jpg', '/share5.jpg'],
    amenities: ['에어컨', '인터넷', '세탁기', '주방', '화장실'],
    deposit: '80만원',
    currentMembers: 1,
    maxMembers: 3
  }
];

const locations = ['전체', '강남구', '마포구', '서대문구', '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서초구', '강서구', '양천구', '영등포구', '동작구', '관악구', '금천구', '구로구'];
const roomTypes = ['전체', '1인실', '2인실', '3인실', '4인실+', '2룸', '3룸', '4룸+'];
const priceRanges = ['전체', '20만원 이하', '20-30만원', '30-40만원', '40-50만원', '50-70만원', '70-100만원', '100만원 이상'];

type TabType = 'roommate' | 'sharehouse';

export default function RoommatePage() {
  const [activeTab, setActiveTab] = useState<TabType>('roommate');
  const [roommateAds, setRoommateAds] = useState(mockRoommateAds);
  const [sharehouseAds, setSharehouseAds] = useState(mockSharehouseAds);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [editingAd, setEditingAd] = useState<any>(null);
  const [filters, setFilters] = useState({
    location: '전체',
    roomType: '전체',
    priceRange: '전체'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'price' | 'rating' | 'views'>('latest');

  const [newAd, setNewAd] = useState({
    title: '',
    businessName: '',
    location: '',
    price: '',
    roomType: '',
    availableDate: '',
    description: '',
    contact: '',
    email: '',
    deposit: '',
    amenities: [] as string[],
    images: [] as string[],
    currentMembers: 1,
    maxMembers: 2,
    type: 'roommate'
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getFilteredAds = () => {
    const ads = activeTab === 'roommate' ? roommateAds : sharehouseAds;
    
    let filtered = ads.filter(ad => {
      // 검색 필터
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          ad.title.toLowerCase().includes(query) ||
          ad.businessName.toLowerCase().includes(query) ||
          ad.description.toLowerCase().includes(query) ||
          ad.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      
      // 지역 필터
      if (filters.location !== '전체' && ad.location !== filters.location) return false;
      
      // 방 타입 필터
      if (filters.roomType !== '전체' && ad.roomType !== filters.roomType) return false;
      
      // 가격대 필터
      if (filters.priceRange !== '전체') {
        const price = parseInt(ad.price.replace('만원', ''));
        const range = filters.priceRange;
        
        if (range === '20만원 이하' && price > 20) return false;
        if (range === '20-30만원' && (price < 20 || price > 30)) return false;
        if (range === '30-40만원' && (price < 30 || price > 40)) return false;
        if (range === '40-50만원' && (price < 40 || price > 50)) return false;
        if (range === '50-70만원' && (price < 50 || price > 70)) return false;
        if (range === '70-100만원' && (price < 70 || price > 100)) return false;
        if (range === '100만원 이상' && price < 100) return false;
      }
      
      return true;
    });

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'price':
          const priceA = parseInt(a.price.replace('만원', ''));
          const priceB = parseInt(b.price.replace('만원', ''));
          return priceA - priceB;
        case 'rating':
          return b.rating - a.rating;
        case 'views':
          return b.views - a.views;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (!validateForm()) {
      return;
    }
    
    if (editingAd) {
      // 수정 모드
      const updatedAd = {
        ...editingAd,
        ...newAd,
        type: activeTab === 'roommate' ? '룸메이트' : '쉐어하우스'
      };

      if (activeTab === 'roommate') {
        setRoommateAds(roommateAds.map(ad => ad.id === editingAd.id ? updatedAd : ad));
      } else {
        setSharehouseAds(sharehouseAds.map(ad => ad.id === editingAd.id ? updatedAd : ad));
      }
      setEditingAd(null);
      alert('광고가 성공적으로 수정되었습니다!');
    } else {
      // 새 등록 모드
      const newAdData = {
        id: Math.max(...roommateAds.map(a => a.id), ...sharehouseAds.map(a => a.id)) + 1,
        ...newAd,
        createdAt: new Date().toISOString().split('T')[0],
        views: 0,
        rating: 0,
        type: activeTab === 'roommate' ? '룸메이트' : '쉐어하우스'
      };

      if (activeTab === 'roommate') {
        setRoommateAds([newAdData, ...roommateAds]);
      } else {
        setSharehouseAds([newAdData, ...sharehouseAds]);
      }
      alert('광고가 성공적으로 등록되었습니다!');
    }

    // 폼 초기화
    setNewAd({
      title: '',
      businessName: '',
      location: '',
      price: '',
      roomType: '',
      availableDate: '',
      description: '',
      contact: '',
      email: '',
      deposit: '',
      amenities: [],
      images: [],
      currentMembers: 1,
      maxMembers: 2,
      type: 'roommate'
    });
    setShowWriteForm(false);
  };

  const handleEdit = (ad: any) => {
    setEditingAd(ad);
    setNewAd({
      title: ad.title,
      businessName: ad.businessName,
      location: ad.location,
      price: ad.price,
      roomType: ad.roomType,
      availableDate: ad.availableDate,
      description: ad.description,
      contact: ad.contact,
      email: ad.email,
      deposit: ad.deposit,
      amenities: ad.amenities || [],
      images: ad.images || [],
      currentMembers: ad.currentMembers || 1,
      maxMembers: ad.maxMembers || 2,
      type: 'roommate'
    });
    setShowWriteForm(true);
  };

  const handleDelete = (adId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      if (activeTab === 'roommate') {
        setRoommateAds(roommateAds.filter(ad => ad.id !== adId));
      } else {
        setSharehouseAds(sharehouseAds.filter(ad => ad.id !== adId));
      }
    }
  };

  const toggleAmenity = (amenity: string) => {
    setNewAd(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // 파일 크기 제한 (5MB)
      const maxSize = 5 * 1024 * 1024;
      const validFiles = Array.from(files).filter(file => {
        if (file.size > maxSize) {
          alert(`${file.name} 파일이 너무 큽니다. 5MB 이하의 파일만 업로드 가능합니다.`);
          return false;
        }
        return true;
      });

      const imageUrls = validFiles.map(file => URL.createObjectURL(file));
      setNewAd(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
    }
  };

  const removeImage = (index: number) => {
    setNewAd(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    if (!newAd.title.trim()) {
      alert('광고 제목을 입력해주세요.');
      return false;
    }
    if (!newAd.businessName.trim()) {
      alert('사업체명을 입력해주세요.');
      return false;
    }
    if (!newAd.location) {
      alert('지역을 선택해주세요.');
      return false;
    }
    if (!newAd.price.trim()) {
      alert('월세를 입력해주세요.');
      return false;
    }
    if (!newAd.roomType) {
      alert('방 타입을 선택해주세요.');
      return false;
    }
    if (!newAd.availableDate) {
      alert('입주 가능일을 선택해주세요.');
      return false;
    }
    if (!newAd.description.trim()) {
      alert('상세 설명을 입력해주세요.');
      return false;
    }
    if (!newAd.contact.trim()) {
      alert('연락처를 입력해주세요.');
      return false;
    }
    if (!newAd.email.trim()) {
      alert('이메일을 입력해주세요.');
      return false;
    }
    if (!newAd.deposit.trim()) {
      alert('보증금을 입력해주세요.');
      return false;
    }
    return true;
  };

  const getTabInfo = () => {
    switch (activeTab) {
      case 'roommate':
        return {
          title: '룸메이트',
          icon: Users,
          description: '룸메이트를 모집하는 광고를 등록하세요',
          color: 'bg-blue-500'
        };
      case 'sharehouse':
        return {
          title: '쉐어하우스',
          icon: Building,
          description: '쉐어하우스 멤버를 모집하는 광고를 등록하세요',
          color: 'bg-green-500'
        };
    }
  };

  const tabInfo = getTabInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 제목 및 광고 등록 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">룸/쉐어하우스</h1>
            <p className="text-gray-600 mt-1">사업주 광고 등록 및 관리</p>
          </div>
          <button
            onClick={() => {
              setEditingAd(null);
              setNewAd({
                title: '',
                businessName: '',
                location: '',
                price: '',
                roomType: '',
                availableDate: '',
                description: '',
                contact: '',
                email: '',
                deposit: '',
                amenities: [],
                images: [],
                currentMembers: 1,
                maxMembers: 2,
                type: 'roommate'
              });
              setShowWriteForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            광고 등록
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          {[
            { id: 'roommate', label: '룸메이트', icon: Users },
            { id: 'sharehouse', label: '쉐어하우스', icon: Building }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 필터 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">필터</h3>
          
          {/* 검색 */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="제목, 사업체명, 설명, 지역으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 정렬 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">정렬</label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'latest', label: '최신순' },
                { value: 'price', label: '가격순' },
                { value: 'rating', label: '평점순' },
                { value: 'views', label: '조회순' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as any)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    sortBy === option.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">지역</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">방 타입</label>
              <select
                value={filters.roomType}
                onChange={(e) => handleFilterChange('roomType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roomTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">가격대</label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 필터 결과 */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                총 {getFilteredAds().length}개의 광고
              </span>
              <button
                onClick={() => {
                  setFilters({ location: '전체', roomType: '전체', priceRange: '전체' });
                  setSearchQuery('');
                  setSortBy('latest');
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                필터 초기화
              </button>
            </div>
          </div>
        </div>

        {/* 광고 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredAds().map((ad) => (
            <div key={ad.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover-lift transition-all duration-200">
              {/* 이미지 */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                {ad.images && ad.images.length > 0 ? (
                  <img
                    src={ad.images[0]}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Camera size={48} />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleEdit(ad)}
                    className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                    title="수정"
                  >
                    <Edit size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                    title="삭제"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
                {ad.images && ad.images.length > 1 && (
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    +{ad.images.length - 1}
                  </div>
                )}
              </div>

              {/* 내용 */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{ad.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ad.type === '룸메이트' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {ad.type}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{ad.businessName}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin size={14} className="mr-1" />
                  {ad.location}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-blue-600">{ad.price}</span>
                    <span className="text-sm text-gray-500">보증금 {ad.deposit}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star size={14} className="mr-1 text-yellow-400" />
                    {ad.rating}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{ad.roomType}</span>
                  <span>입주가능: {ad.availableDate}</span>
                </div>

                {ad.type === '쉐어하우스' && ad.currentMembers && ad.maxMembers && (
                  <div className="text-sm text-gray-500 mb-3">
                    멤버: {ad.currentMembers}/{ad.maxMembers}명
                  </div>
                )}

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{ad.description}</p>

                {/* 편의시설 */}
                {ad.amenities && ad.amenities.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {ad.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                          {amenity}
                        </span>
                      ))}
                      {ad.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded">
                          +{ad.amenities.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>조회 {ad.views}</span>
                    <span>•</span>
                    <span>{ad.createdAt}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      onClick={() => {
                        // 조회수 증가
                        if (activeTab === 'roommate') {
                          setRoommateAds(roommateAds.map(a => 
                            a.id === ad.id ? { ...a, views: a.views + 1 } : a
                          ));
                        } else {
                          setSharehouseAds(sharehouseAds.map(a => 
                            a.id === ad.id ? { ...a, views: a.views + 1 } : a
                          ));
                        }
                      }}
                    >
                      상세보기
                    </button>
                    <button 
                      className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
                      onClick={() => {
                        // 연락처 정보 표시
                        alert(`연락처: ${ad.contact}\n이메일: ${ad.email}`);
                      }}
                    >
                      연락하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {getFilteredAds().length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Building size={64} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">등록된 광고가 없습니다</h3>
            <p className="text-gray-500">첫 번째 광고를 등록해보세요!</p>
          </div>
        )}
      </div>

      {/* 등록/수정 모달 */}
      {showWriteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingAd ? '광고 수정' : '광고 등록'}
                </h2>
                <button
                  onClick={() => {
                    setShowWriteForm(false);
                    setEditingAd(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">광고 제목 *</label>
                  <input
                    type="text"
                    value={newAd.title}
                    onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">사업체명 *</label>
                  <input
                    type="text"
                    value={newAd.businessName}
                    onChange={(e) => setNewAd({...newAd, businessName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">지역 *</label>
                  <select
                    value={newAd.location}
                    onChange={(e) => setNewAd({...newAd, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">지역 선택</option>
                    {locations.slice(1).map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">월세 *</label>
                  <input
                    type="text"
                    value={newAd.price}
                    onChange={(e) => setNewAd({...newAd, price: e.target.value})}
                    placeholder="예: 35만원"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">방 타입 *</label>
                  <select
                    value={newAd.roomType}
                    onChange={(e) => setNewAd({...newAd, roomType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">방 타입 선택</option>
                    {roomTypes.slice(1).map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">입주 가능일 *</label>
                  <input
                    type="date"
                    value={newAd.availableDate}
                    onChange={(e) => setNewAd({...newAd, availableDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
                  <input
                    type="tel"
                    value={newAd.contact}
                    onChange={(e) => setNewAd({...newAd, contact: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이메일 *</label>
                  <input
                    type="email"
                    value={newAd.email}
                    onChange={(e) => setNewAd({...newAd, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">보증금 *</label>
                  <input
                    type="text"
                    value={newAd.deposit}
                    onChange={(e) => setNewAd({...newAd, deposit: e.target.value})}
                    placeholder="예: 50만원"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* 쉐어하우스 전용 필드 */}
              {activeTab === 'sharehouse' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">현재 멤버 수</label>
                    <input
                      type="number"
                      min="1"
                      value={newAd.currentMembers}
                      onChange={(e) => setNewAd({...newAd, currentMembers: parseInt(e.target.value) || 1})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">최대 멤버 수</label>
                    <input
                      type="number"
                      min="2"
                      value={newAd.maxMembers}
                      onChange={(e) => setNewAd({...newAd, maxMembers: parseInt(e.target.value) || 2})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* 상세 설명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">상세 설명 *</label>
                <textarea
                  value={newAd.description}
                  onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* 편의시설 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">편의시설</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenityOptions.map(amenity => (
                    <label key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newAd.amenities.includes(amenity)}
                        onChange={() => toggleAmenity(amenity)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 이미지 업로드 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이미지 업로드</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {newAd.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                    {newAd.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`이미지 ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 버튼 */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowWriteForm(false);
                    setEditingAd(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingAd ? '수정하기' : '등록하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 