"use client"

import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Calendar, User, MessageCircle, Plus, Filter, Home, Users, Building, Star, Phone, Mail, Edit, Trash2, Camera, X, Heart, Eye } from 'lucide-react';
import Header from '@/components/Header';

// 찾아요 게시글 더미 데이터
const mockFindPosts = [
  {
    id: 1,
    title: '강남역 근처 고시원 찾아요',
    author: '김학생',
    location: '강남구',
    budget: '40만원',
    type: '고시원',
    roomType: '1인실',
    moveInDate: '2024-02-01',
    description: '강남역 3번 출구 근처 고시원 찾고 있습니다. 에어컨, 인터넷 필수이고 주차 가능하면 더 좋습니다. 깔끔하고 조용한 곳 원해요.',
    contact: '010-1234-5678',
    email: 'student@email.com',
    createdAt: '2024-01-15',
    views: 45,
    likes: 12,
    isUrgent: true,
    tags: ['강남역', '학생', '1인실', '주차가능']
  },
  {
    id: 2,
    title: '홍대입구 룸메이트 찾아요',
    author: '박직장인',
    location: '마포구',
    budget: '35만원',
    type: '룸메이트',
    roomType: '2인실',
    moveInDate: '2024-01-25',
    description: '홍대입구역 근처에서 룸메이트 찾고 있습니다. 직장인이고 규칙적인 생활을 합니다. 조용하고 깔끔한 분 환영합니다.',
    contact: '010-9876-5432',
    email: 'worker@email.com',
    createdAt: '2024-01-14',
    views: 32,
    likes: 8,
    isUrgent: false,
    tags: ['홍대입구', '직장인', '2인실', '규칙적']
  }
];

const locations = ['전체', '강남구', '마포구', '서대문구', '종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서초구', '강서구', '양천구', '영등포구', '동작구', '관악구', '금천구', '구로구'];
const types = ['전체', '고시원', '룸메이트', '쉐어하우스'];
const roomTypes = ['전체', '1인실', '2인실', '3인실', '4인실+', '개인방', '공용방'];
const budgetRanges = ['전체', '20만원 이하', '20-30만원', '30-40만원', '40-50만원', '50-70만원', '70-100만원', '100만원 이상'];

export default function FindGosiwonPage() {
  const [posts, setPosts] = useState(mockFindPosts);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '전체',
    type: '전체',
    roomType: '전체',
    budgetRange: '전체'
  });

  const [newPost, setNewPost] = useState({
    title: '',
    author: '',
    location: '',
    budget: '',
    type: '고시원',
    roomType: '',
    moveInDate: '',
    description: '',
    contact: '',
    email: '',
    tags: [] as string[],
    isUrgent: false
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getFilteredPosts = () => {
    let filtered = posts.filter(post => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          post.title.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      
      if (filters.location !== '전체' && post.location !== filters.location) return false;
      if (filters.type !== '전체' && post.type !== filters.type) return false;
      if (filters.roomType !== '전체' && post.roomType !== filters.roomType) return false;
      
      return true;
    });

    return filtered;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = Math.max(...posts.map(p => p.id)) + 1;
    const post = {
      ...newPost,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0
    };
    setPosts(prev => [post, ...prev]);
    
    setNewPost({
      title: '',
      author: '',
      location: '',
      budget: '',
      type: '고시원',
      roomType: '',
      moveInDate: '',
      description: '',
      contact: '',
      email: '',
      tags: [],
      isUrgent: false
    });
    setShowWriteForm(false);
  };

  const toggleTag = (tag: string) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const validateForm = () => {
    return (
      newPost.title.trim() &&
      newPost.author.trim() &&
      newPost.location.trim() &&
      newPost.budget.trim() &&
      newPost.roomType.trim() &&
      newPost.moveInDate.trim() &&
      newPost.description.trim() &&
      newPost.contact.trim() &&
      newPost.email.trim()
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '고시원': return 'bg-blue-100 text-blue-800';
      case '룸메이트': return 'bg-green-100 text-green-800';
      case '쉐어하우스': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 제목 및 글쓰기 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">찾아요</h1>
            <p className="text-gray-600 mt-1">원하는 고시원, 룸메이트, 쉐어하우스를 찾아보세요</p>
          </div>
          <button
            onClick={() => setShowWriteForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            글쓰기
          </button>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="제목, 작성자, 내용으로 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={filters.roomType}
                onChange={(e) => handleFilterChange('roomType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {roomTypes.map(roomType => (
                  <option key={roomType} value={roomType}>{roomType}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                    {post.isUrgent && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">급구</span>
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(post.type)}`}>
                      {post.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {post.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {post.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Home className="w-4 h-4" />
                      {post.roomType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.moveInDate}
                    </span>
                  </div>

                  <p className="text-gray-700 mb-3">{post.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </span>
                      <span>{post.createdAt}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 글쓰기 모달 */}
        {showWriteForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">새 글 작성</h2>
                  <button
                    onClick={() => setShowWriteForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">제목 *</label>
                      <input
                        type="text"
                        value={newPost.title}
                        onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">작성자 *</label>
                      <input
                        type="text"
                        value={newPost.author}
                        onChange={(e) => setNewPost(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">지역 *</label>
                      <select
                        value={newPost.location}
                        onChange={(e) => setNewPost(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">지역 선택</option>
                        {locations.slice(1).map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">타입 *</label>
                      <select
                        value={newPost.type}
                        onChange={(e) => setNewPost(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        {types.slice(1).map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">방 타입 *</label>
                      <select
                        value={newPost.roomType}
                        onChange={(e) => setNewPost(prev => ({ ...prev, roomType: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">방 타입 선택</option>
                        {roomTypes.slice(1).map(roomType => (
                          <option key={roomType} value={roomType}>{roomType}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">예산 *</label>
                      <input
                        type="text"
                        value={newPost.budget}
                        onChange={(e) => setNewPost(prev => ({ ...prev, budget: e.target.value }))}
                        placeholder="예: 40만원"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">입주 희망일 *</label>
                      <input
                        type="date"
                        value={newPost.moveInDate}
                        onChange={(e) => setNewPost(prev => ({ ...prev, moveInDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
                      <input
                        type="tel"
                        value={newPost.contact}
                        onChange={(e) => setNewPost(prev => ({ ...prev, contact: e.target.value }))}
                        placeholder="010-1234-5678"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
                      <input
                        type="email"
                        value={newPost.email}
                        onChange={(e) => setNewPost(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="example@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">상세 설명 *</label>
                    <textarea
                      value={newPost.description}
                      onChange={(e) => setNewPost(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="원하는 조건이나 특별한 요구사항을 자세히 작성해주세요."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
                    <div className="flex flex-wrap gap-2">
                      {['강남역', '학생', '직장인', '주차가능', '개인화장실', '공용시설', '조용한환경', '급구', '규칙적', '재택근무'].map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            newPost.tags.includes(tag)
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isUrgent"
                      checked={newPost.isUrgent}
                      onChange={(e) => setNewPost(prev => ({ ...prev, isUrgent: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isUrgent" className="text-sm text-gray-700">
                      급구로 표시
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowWriteForm(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      disabled={!validateForm()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      등록
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
