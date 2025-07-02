'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MessageCircle, User, Building, Clock, MoreVertical } from 'lucide-react'
import { ChatRoom } from '@/lib/chat'

interface ChatRoomListProps {
  rooms: ChatRoom[]
  currentRoomId?: string
  onRoomSelect: (room: ChatRoom) => void
  onSearch: (query: string) => void
}

export default function ChatRoomList({ 
  rooms, 
  currentRoomId, 
  onRoomSelect, 
  onSearch 
}: ChatRoomListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return `${Math.floor((now.getTime() - date.getTime()) / (1000 * 60))}분 전`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}시간 전`
    } else {
      return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
    }
  }

  const getParticipantIcon = (role: string) => {
    switch (role) {
      case 'business':
        return <Building size={16} />
      case 'user':
        return <User size={16} />
      default:
        return <User size={16} />
    }
  }

  return (
    <div className="h-full bg-white border-r border-secondary-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-secondary-200">
        <h2 className="text-lg font-semibold text-accent-800 mb-3">채팅</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400" size={18} />
          <input
            type="text"
            placeholder="채팅방 또는 사용자 검색"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              onSearch(e.target.value)
            }}
            className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Room List */}
      <div className="flex-1 overflow-y-auto">
        {filteredRooms.length === 0 ? (
          <div className="p-8 text-center text-accent-500">
            <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p>채팅방이 없습니다</p>
          </div>
        ) : (
          <div className="divide-y divide-secondary-100">
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onRoomSelect(room)}
                className={`p-4 cursor-pointer transition-colors duration-200 hover:bg-secondary-50 ${
                  currentRoomId === room.id ? 'bg-primary-50 border-r-2 border-primary-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      {getParticipantIcon(room.participants[0]?.role || 'user')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-accent-800 truncate">
                        {room.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {room.unreadCount > 0 && (
                          <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                            {room.unreadCount}
                          </span>
                        )}
                        <span className="text-xs text-accent-500">
                          {formatTime(room.updatedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs text-accent-600">
                        {room.participants.map(p => p.name).join(', ')}
                      </span>
                      <span className="text-xs text-accent-400">•</span>
                      <span className="text-xs text-accent-400">
                        {room.participants.length}명
                      </span>
                    </div>

                    {room.lastMessage && (
                      <p className="text-sm text-accent-600 truncate">
                        {room.lastMessage.content}
                      </p>
                    )}
                  </div>

                  {/* More Options */}
                  <div className="flex-shrink-0">
                    <button className="p-1 hover:bg-secondary-200 rounded transition-colors duration-200">
                      <MoreVertical size={16} className="text-accent-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-secondary-200">
        <div className="text-center">
          <p className="text-xs text-accent-500">
            총 {rooms.length}개의 채팅방
          </p>
        </div>
      </div>
    </div>
  )
} 