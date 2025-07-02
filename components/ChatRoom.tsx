'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Clock, User, Building, Search, MoreVertical } from 'lucide-react'
import { ChatRoom, formatTime, isToday, isYesterday } from '@/lib/chat'
import { getRoleColorClass } from '@/lib/auth'

interface ChatRoomListProps {
  rooms: ChatRoom[]
  currentRoomId?: string
  onRoomSelect: (room: ChatRoom) => void
  onSearch?: (query: string) => void
}

export default function ChatRoomList({ rooms, currentRoomId, onRoomSelect, onSearch }: ChatRoomListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | 'general' | 'gosiwon-business' | 'roomshare-business'>('all')

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.participants.some(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || room.gosiwonName?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = filterRole === 'all' || 
      room.participants.some(p => p.role === filterRole)
    
    return matchesSearch && matchesRole
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    }
  }

  const getTimeDisplay = (timestamp: string) => {
    if (isToday(timestamp)) {
      return formatTime(timestamp)
    } else if (isYesterday(timestamp)) {
      return '어제'
    } else {
      return formatTime(timestamp)
    }
  }

  const getParticipantName = (room: ChatRoom) => {
    // 현재 사용자가 아닌 다른 참가자 이름 반환
    return room.participants.find(p => p.id !== '1')?.name || '알 수 없음'
  }

  const getParticipantRole = (room: ChatRoom) => {
    const otherParticipant = room.participants.find(p => p.id !== '1')
    return otherParticipant?.role || 'user'
  }

  return (
    <div className="w-full max-w-sm bg-white border-r border-secondary-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-secondary-200">
        <h2 className="text-lg font-semibold text-accent-800 mb-4">채팅</h2>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400" />
          <input
            type="text"
            placeholder="채팅방 검색..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-secondary-100 rounded-lg p-1">
          {[
            { id: 'all', label: '전체', count: rooms.length },
            { id: 'general', label: '일반', count: rooms.filter(r => r.participants.some(p => p.role === 'general')).length },
            { id: 'gosiwon-business', label: '고시원', count: rooms.filter(r => r.participants.some(p => p.role === 'gosiwon-business')).length },
            { id: 'roomshare-business', label: '룸쉐어', count: rooms.filter(r => r.participants.some(p => p.role === 'roomshare-business')).length }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setFilterRole(filter.id as any)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                filterRole === filter.id
                  ? 'bg-white text-accent-800 shadow-sm'
                  : 'text-accent-600 hover:text-accent-800'
              }`}
            >
              {filter.label}
              <span className="ml-1 text-xs bg-secondary-200 px-1.5 py-0.5 rounded-full">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Room List */}
      <div className="flex-1 overflow-y-auto">
        {filteredRooms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <MessageCircle size={48} className="text-secondary-400 mb-4" />
            <h3 className="text-lg font-medium text-accent-800 mb-2">채팅방이 없습니다</h3>
            <p className="text-accent-600">새로운 대화를 시작해보세요!</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredRooms.map((room) => {
              const isActive = currentRoomId === room.id
              const participantName = getParticipantName(room)
              const participantRole = getParticipantRole(room)
              const lastMessage = room.lastMessage

              return (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => onRoomSelect(room)}
                    className={`w-full p-4 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-accent-50 border-accent-200 border'
                        : 'hover:bg-secondary-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Avatar */}
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRoleColorClass(participantRole)}`}>
                          {participantRole === 'gosiwon-business' || participantRole === 'roomshare-business' ? (
                            <Building size={20} className="text-accent-600" />
                          ) : (
                            <User size={20} className="text-accent-600" />
                          )}
                        </div>
                        {room.unreadCount > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {room.unreadCount > 99 ? '99+' : room.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-accent-800 truncate">
                            {participantName}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-accent-500">
                              {lastMessage ? getTimeDisplay(lastMessage.timestamp) : ''}
                            </span>
                            <button className="p-1 text-accent-400 hover:text-accent-600">
                              <MoreVertical size={14} />
                            </button>
                          </div>
                        </div>

                        {room.gosiwonName && (
                          <p className="text-xs text-accent-500 mb-1 truncate">
                            {room.gosiwonName}
                          </p>
                        )}

                        {lastMessage && (
                          <p className={`text-sm truncate ${
                            room.unreadCount > 0 
                              ? 'text-accent-800 font-medium' 
                              : 'text-accent-600'
                          }`}>
                            {lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
} 