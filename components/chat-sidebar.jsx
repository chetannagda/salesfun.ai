"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ChatSidebar({ isOpen, onClose, isLoggedIn = false, onLoginStateChange = null }) {
  const [chatHistory, setChatHistory] = useState([])
  const isMobile = useIsMobile()
  const router = useRouter()

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("salesfun-chat-history")
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("salesfun-chat-history", JSON.stringify(chatHistory))
  }, [chatHistory])

  // Add a new chat to history
  const addChatToHistory = (prompt) => {
    const newChat = {
      id: Date.now(),
      title: prompt.length > 50 ? prompt.substring(0, 50) + "..." : prompt,
      timestamp: new Date().toISOString(),
      preview: prompt
    }
    setChatHistory(prev => [newChat, ...prev])
  }

  // Delete a chat from history
  const deleteChatFromHistory = (id) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== id))
  }

  // Clear all chat history
  const clearAllHistory = () => {
    setChatHistory([])
    localStorage.removeItem("salesfun-chat-history")
  }

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 168) { // 7 days
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  const handleLoginClick = () => {
    router.push("/login")
    if (isMobile) onClose()
  }

  const handleLogout = () => {
    if (onLoginStateChange) {
      onLoginStateChange(false)
    }
    console.log("User logged out")
    if (isMobile) onClose()
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-black/20 backdrop-blur-xl border-r border-white/10 z-50 transition-transform duration-300 ease-in-out
        ${isMobile ? 'w-80' : 'w-72'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-white font-medium">Chat History</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-4 space-y-3">
            <button
              onClick={() => {
                // This would typically start a new chat
                console.log("Starting new chat...")
                if (isMobile) onClose()
              }}
              className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Chat
            </button>

            {/* Mobile Login/Logout Button */}
            {isMobile && (
              isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </button>
              )
            )}
          </div>

          {/* Chat History List */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            {chatHistory.length === 0 ? (
              <div className="text-white/50 text-sm text-center py-8">
                No chat history yet
              </div>
            ) : (
              <div className="space-y-2">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="group relative p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => {
                      // This would typically load the chat
                      console.log("Loading chat:", chat.id)
                      if (isMobile) onClose()
                    }}
                  >
                    <div className="text-white text-sm font-medium mb-1 line-clamp-2">
                      {chat.title}
                    </div>
                    <div className="text-white/50 text-xs">
                      {formatTimestamp(chat.timestamp)}
                    </div>
                    
                    {/* Delete button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteChatFromHistory(chat.id)
                      }}
                      className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all"
                    >
                      <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {chatHistory.length > 0 && (
            <div className="p-4 border-t border-white/10">
              <button
                onClick={clearAllHistory}
                className="w-full px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
              >
                Clear All History
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}


import { createContext, useContext } from "react"

const ChatHistoryContext = createContext()

export function ChatHistoryProvider({ children }) {
  const [chatHistory, setChatHistory] = useState([])

  useEffect(() => {
    const savedHistory = localStorage.getItem("salesfun-chat-history")
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("salesfun-chat-history", JSON.stringify(chatHistory))
  }, [chatHistory])

  const addChatToHistory = (prompt) => {
    const newChat = {
      id: Date.now(),
      title: prompt.length > 50 ? prompt.substring(0, 50) + "..." : prompt,
      timestamp: new Date().toISOString(),
      preview: prompt
    }
    setChatHistory(prev => [newChat, ...prev])
  }

  const deleteChatFromHistory = (id) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== id))
  }

  const clearAllHistory = () => {
    setChatHistory([])
    localStorage.removeItem("salesfun-chat-history")
  }

  return (
    <ChatHistoryContext.Provider value={{ chatHistory, addChatToHistory, deleteChatFromHistory, clearAllHistory }}>
      {children}
    </ChatHistoryContext.Provider>
  )
}

export function useChatHistory() {
  const context = useContext(ChatHistoryContext)
  if (!context) {
    throw new Error("useChatHistory must be used within a ChatHistoryProvider")
  }
  return context
}
