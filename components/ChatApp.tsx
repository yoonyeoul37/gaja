'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ChatRoomList from './ChatRoomList'
import ChatWindow from './ChatWindow'
import { ChatRoom, ChatMessage, mockChatRooms, mockMessages } from '@/lib/chat'

export default function ChatApp() {
  const [rooms, setRooms] = useState<ChatRoom[]>(mockChatRooms)
  const [currentRoom, setCurrentRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (currentRoom) {
      loadMessages(currentRoom.id)
    }
  }, [currentRoom])

  const loadMessages = async (roomId: string) => {
    setIsLoading(true)
    
    // 모의 로딩 시간
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const roomMessages = mockMessages[roomId] || []
    setMessages(roomMessages)
    setIsLoading(false)
  }

  const handleRoomSelect = (room: ChatRoom) => {
    setCurrentRoom(room)
    
    // 읽지 않은 메시지 읽음 처리
    if (room.unreadCount > 0) {
      setRooms(prev => prev.map(r => 
        r.id === room.id 
          ? { ...r, unreadCount: 0 }
          : r
      ))
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!currentRoom) return

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: '1', // 현재 사용자 ID
      senderName: '김철수',
      senderRole: 'user',
      content,
      type: 'text',
      timestamp: new Date().toISOString(),
      isRead: false
    }

    // 메시지 추가
    setMessages(prev => [...prev, newMessage])

    // 채팅방의 마지막 메시지 업데이트
    setRooms(prev => prev.map(room => 
      room.id === currentRoom.id 
        ? { 
            ...room, 
            lastMessage: newMessage,
            updatedAt: new Date().toISOString()
          }
        : room
    ))

    // 모의 응답 메시지 (3초 후)
    setTimeout(() => {
      const responseMessage: ChatMessage = {
        id: `msg_${Date.now()}_response`,
        senderId: currentRoom.participants.find(p => p.id !== '1')?.id || '2',
        senderName: currentRoom.participants.find(p => p.id !== '1')?.name || '상대방',
        senderRole: currentRoom.participants.find(p => p.id !== '1')?.role || 'business',
        content: getRandomResponse(),
        type: 'text',
        timestamp: new Date().toISOString(),
        isRead: true
      }

      setMessages(prev => [...prev, responseMessage])
      
      // 채팅방의 마지막 메시지 업데이트
      setRooms(prev => prev.map(room => 
        room.id === currentRoom.id 
          ? { 
              ...room, 
              lastMessage: responseMessage,
              updatedAt: new Date().toISOString()
            }
          : room
      ))
    }, 3000)
  }

  const getRandomResponse = () => {
    const responses = [
      '네, 알겠습니다.',
      '확인했습니다.',
      '좋은 하루 되세요!',
      '문의사항이 있으시면 언제든 연락주세요.',
      '감사합니다.',
      '네, 도움이 필요하시면 말씀해주세요.',
      '입주 준비 잘 되고 있습니다.',
      '방 상태 확인해드리겠습니다.'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSearch = (query: string) => {
    // 검색 기능 (필터링은 ChatRoomList에서 처리)
    console.log('Search query:', query)
  }

  return (
    <div className="h-screen bg-secondary-50">
      <div className="h-full flex">
        {/* Chat Room List */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm"
        >
          <ChatRoomList
            rooms={rooms}
            currentRoomId={currentRoom?.id}
            onRoomSelect={handleRoomSelect}
            onSearch={handleSearch}
          />
        </motion.div>

        {/* Chat Window */}
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex-1"
        >
          <ChatWindow
            room={currentRoom}
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </motion.div>
      </div>
    </div>
  )
} 