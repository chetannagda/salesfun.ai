"use client"

import { useState, useRef, useEffect } from "react"
import { useChatHistory } from "@/components/chat-sidebar"

export default function PromptInput() {
  const [prompt, setPrompt] = useState("")
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
      console.log("[SalesFun.ai] Prompt submitted:", prompt)
      
      // Add to chat history
      addChatToHistory(prompt.trim())
      
      // Clear the input
      setPrompt("")
      
      // Here you would typically send the prompt to your AI API
      // For now, we'll just log it and add it to history
    }
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
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <div className="w-full max-w-3xl px-6">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-start bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 px-4 py-3 shadow-2xl">
            <button
              type="button"
              onClick={handleFileUpload}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-transparent hover:bg-white/10 flex items-center justify-center transition-all duration-200 mr-3 mt-1"
            >
              <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="flex-1 bg-transparent text-white placeholder-white/50 text-base focus:outline-none px-2 py-2 resize-none min-h-[24px] max-h-[200px] overflow-y-hidden"
              rows={1}
            />

            <button
              type="submit"
              disabled={!prompt.trim()}
              className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black hover:bg-white/90 disabled:bg-white/20 disabled:text-white/40 flex items-center justify-center transition-all duration-200 mt-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
