'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Image, File, Smile, MoreVertical, Phone, Video, Info } from 'lucide-react'
import { ChatRoom, ChatMessage, formatTime, formatDate, isToday, isYesterday } from '@/lib/chat'

interface ChatWindowProps {
  room: ChatRoom | null
  messages: ChatMessage[]
  onSendMessage: (content: string) => void
  onTyping?: (isTyping: boolean) => void
  isLoading?: boolean
}

export default function ChatWindow({ room, messages, onSendMessage, onTyping, isLoading }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentUserId = '1' // 모의 현재 사용자 ID

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && room) {
      onSendMessage(newMessage.trim())
      setNewMessage('')
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value)
    if (onTyping) {
      const isCurrentlyTyping = e.target.value.length > 0
      if (isCurrentlyTyping !== isTyping) {
        setIsTyping(isCurrentlyTyping)
        onTyping(isCurrentlyTyping)
      }
    }
  }

  const getParticipantName = () => {
    if (!room) return ''
    return room.participants.find(p => p.id !== currentUserId)?.name || '알 수 없음'
  }

  const getParticipantRole = () => {
    if (!room) return 'user'
    const otherParticipant = room.participants.find(p => p.id !== currentUserId)
    return otherParticipant?.role || 'user'
  }

  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { date: string; messages: ChatMessage[] }[] = []
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString()
      const existingGroup = groups.find(g => g.date === date)
      
      if (existingGroup) {
        existingGroup.messages.push(message)
      } else {
        groups.push({ date, messages: [message] })
      }
    })
    
    return groups
  }

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString)
    if (isToday(dateString)) {
      return '오늘'
    } else if (isYesterday(dateString)) {
      return '어제'
    } else {
      return formatDate(dateString)
    }
  }

  if (!room) {
    return (
      <div className="flex-1 flex items-center justify-center bg-secondary-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send size={24} className="text-secondary-400" />
          </div>
          <h3 className="text-lg font-medium text-accent-800 mb-2">채팅방을 선택하세요</h3>
          <p className="text-accent-600">대화를 시작하려면 채팅방을 선택해주세요</p>
        </div>
      </div>
    )
  }

  const messageGroups = groupMessagesByDate(messages)

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-200">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            getParticipantRole() === 'business' 
              ? 'bg-accent-100' 
              : 'bg-secondary-100'
          }`}>
            {getParticipantRole() === 'business' ? (
              <span className="text-accent-600 font-medium text-sm">사</span>
            ) : (
              <span className="text-accent-600 font-medium text-sm">사</span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-accent-800">{getParticipantName()}</h3>
            {room.gosiwonName && (
              <p className="text-sm text-accent-500">{room.gosiwonName}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-accent-400 hover:text-accent-600 transition-colors duration-200">
            <Phone size={20} />
          </button>
          <button className="p-2 text-accent-400 hover:text-accent-600 transition-colors duration-200">
            <Video size={20} />
          </button>
          <button className="p-2 text-accent-400 hover:text-accent-600 transition-colors duration-200">
            <Info size={20} />
          </button>
          <button className="p-2 text-accent-400 hover:text-accent-600 transition-colors duration-200">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-500"></div>
          </div>
        ) : (
          <AnimatePresence>
            {messageGroups.map((group, groupIndex) => (
              <div key={group.date}>
                {/* Date Separator */}
                <div className="flex items-center justify-center my-4">
                  <div className="bg-secondary-100 px-3 py-1 rounded-full">
                    <span className="text-xs text-accent-600 font-medium">
                      {getDateLabel(group.date)}
                    </span>
                  </div>
                </div>

                {/* Messages */}
                {group.messages.map((message, messageIndex) => {
                  const isOwnMessage = message.senderId === currentUserId
                  const showAvatar = messageIndex === 0 || 
                    group.messages[messageIndex - 1]?.senderId !== message.senderId

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        {/* Avatar */}
                        {!isOwnMessage && showAvatar && (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.senderRole === 'business' 
                              ? 'bg-accent-100' 
                              : 'bg-secondary-100'
                          }`}>
                            <span className="text-accent-600 font-medium text-xs">
                              {message.senderName.charAt(0)}
                            </span>
                          </div>
                        )}
                        {!isOwnMessage && !showAvatar && (
                          <div className="w-8 flex-shrink-0"></div>
                        )}

                        {/* Message Bubble */}
                        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                          {!isOwnMessage && showAvatar && (
                            <span className="text-xs text-accent-500 mb-1 ml-1">
                              {message.senderName}
                            </span>
                          )}
                          
                          <div className={`px-4 py-2 rounded-2xl max-w-full ${
                            isOwnMessage
                              ? 'bg-accent-500 text-white'
                              : 'bg-secondary-100 text-accent-800'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap break-words">
                              {message.content}
                            </p>
                          </div>
                          
                          <span className={`text-xs text-accent-500 mt-1 ${
                            isOwnMessage ? 'text-right' : 'text-left'
                          }`}>
                            {formatTime(message.timestamp)}
                            {isOwnMessage && (
                              <span className="ml-2">
                                {message.isRead ? '✓✓' : '✓'}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-secondary-200">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요..."
              className="w-full px-4 py-3 pr-12 border border-secondary-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
              rows={1}
            />
            <div className="absolute right-3 bottom-3 flex items-center space-x-2">
              <button className="p-1 text-accent-400 hover:text-accent-600 transition-colors duration-200">
                <Smile size={20} />
              </button>
              <button className="p-1 text-accent-400 hover:text-accent-600 transition-colors duration-200">
                <Paperclip size={20} />
              </button>
            </div>
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-3 bg-accent-500 text-white rounded-full hover:bg-accent-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
} 