"use client"

import { useState, useRef, useEffect } from "react"
import { useChatHistory } from "@/components/chat-sidebar"
import Login from "@/components/login"

export default function PromptInput({ isLoggedIn = false, onLoginStateChange = null }) {
  const [prompt, setPrompt] = useState("")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)
  const { addChatToHistory } = useChatHistory()

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px"
    }
  }, [prompt])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim()) {
      // Check if user is logged in
      if (!isLoggedIn) {
        setShowLoginPrompt(true)
        return
      }

      console.log("[SalesFun.ai] Prompt submitted:", prompt)
      
      // Add to chat history
      addChatToHistory(prompt.trim())
      
      // Clear the input
      setPrompt("")
      
      // Here you would typically send the prompt to your AI API
      // For now, we'll just log it and add it to history
    }
  }

  const handleLoginSuccess = (userData) => {
    if (onLoginStateChange) {
      onLoginStateChange(true)
    }
    setShowLoginModal(false)
    setShowLoginPrompt(false)
    console.log("User logged in:", userData)
    
    // If there was a prompt waiting, submit it now
    if (prompt.trim()) {
      handleSubmit({ preventDefault: () => {} })
    }
  }

  const handleLoginPromptAction = (action) => {
    if (action === 'login') {
      setShowLoginModal(true)
    }
    setShowLoginPrompt(false)
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log("[v0] File uploaded:", file.name, file.type)
      // Handle file upload here
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center md:items-center md:justify-center items-end justify-center z-20">
        <div className="w-full max-w-3xl px-6 pb-6 md:pb-0">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 px-4 py-3 shadow-2xl">
              <button
                type="button"
                onClick={handleFileUpload}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-transparent hover:bg-white/10 flex items-center justify-center transition-all duration-200 mr-3"
              >
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
              />

              <textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Salesfun.ai anything"
                className="flex-1 bg-transparent text-white placeholder-white/50 text-base focus:outline-none px-2 py-2 resize-none min-h-[40px] max-h-[200px] overflow-y-auto"
                rows={1}
              />

              <button
                type="submit"
                disabled={!prompt.trim()}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 flex items-center justify-center transition-all duration-200 ml-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Login Prompt Notification */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Login Required</h3>
              <p className="text-white/70 text-sm mb-6">
                Please log in to start chatting with SalesFun.ai and access all features.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleLoginPromptAction('login')}
                  className="flex-1 py-2 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-all duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="flex-1 py-2 bg-black/20 backdrop-blur-xl border border-white/10 text-white font-medium rounded-xl hover:bg-black/30 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <Login 
              isModal={true} 
              onClose={() => setShowLoginModal(false)}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      )}
    </>
  )
}
