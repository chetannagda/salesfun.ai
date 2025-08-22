"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Header({ onToggleSidebar }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const isMobile = useIsMobile()

  const handleDocsClick = (e) => {
    e.preventDefault()
    router.push("/docs")
  }

  const handlePricingClick = (e) => {
    e.preventDefault()
    router.push("/pricing")
  }

  const handleLoginClick = () => {
    router.push("/login")
  }

  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      <div className="flex items-center gap-4">
        {/* Hamburger menu button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <h1 className="text-white text-xl font-semibold">SalesFun.ai</h1>
      </div>


      <div className="flex items-center">
        {isLoggedIn ? (
          <button
            onClick={handleLoginClick}
            className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-black/30 transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleLoginClick}
            className="px-8 py-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white font-normal text-sm transition-all duration-300 hover:bg-black/30 cursor-pointer h-12 flex items-center"
          >
            Login
          </button>
        )}
      </div>
    </header>
  )
}
