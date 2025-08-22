"use client"

import { useState } from "react"
import Header from "@/components/header"
import PromptInput from "@/components/prompt-input"
import SalesFunBranding from "@/components/salesfun-branding"
import ShaderBackground from "@/components/shader-background"
import ChatSidebar, { ChatHistoryProvider } from "@/components/chat-sidebar"

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <ChatHistoryProvider>
      <ShaderBackground>
        <ChatSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <Header onToggleSidebar={toggleSidebar} />
        <PromptInput />
        <SalesFunBranding />
      </ShaderBackground>
    </ChatHistoryProvider>
  )
}
