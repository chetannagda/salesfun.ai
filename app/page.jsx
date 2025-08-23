"use client"

import { useState } from "react"
import Header from "@/components/header"
import PromptInput from "@/components/prompt-input"
import ShaderBackground from "@/components/shader-background"
import ChatSidebar, { ChatHistoryProvider } from "@/components/chat-sidebar"

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleLoginStateChange = (loginState) => {
    setIsLoggedIn(loginState)
  }

  return (
    <ChatHistoryProvider>
      <ShaderBackground>
        <ChatSidebar 
          isOpen={isSidebarOpen} 
          onClose={closeSidebar} 
          isLoggedIn={isLoggedIn}
          onLoginStateChange={handleLoginStateChange}
        />
        <Header 
          onToggleSidebar={toggleSidebar} 
          isLoggedIn={isLoggedIn}
          onLoginStateChange={handleLoginStateChange}
        />
        <PromptInput 
          isLoggedIn={isLoggedIn}
          onLoginStateChange={handleLoginStateChange}
        />
      </ShaderBackground>
    </ChatHistoryProvider>
  )
}
