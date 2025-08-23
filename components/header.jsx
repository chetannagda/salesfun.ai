"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Header({ onToggleSidebar, isLoggedIn = false, onLoginStateChange = null }) {
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

  const handleLogout = () => {
    // Clear login state
    if (onLoginStateChange) {
      onLoginStateChange(false)
    }
    console.log("User logged out")
    // TODO: Clear authentication tokens when backend is integrated
  }

  return (
    <header className="relative z-30 flex items-center justify-between p-6">
      <div className="flex items-center gap-4">
        {/* Hamburger menu button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <h1 className="text-white text-xl font-semibold">SalesFun.ai</h1>
      </div>


      <div className="flex items-center relative z-30">
        {isLoggedIn ? (
          <div className="relative group">
            <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-black/30 transition-all duration-200 cursor-pointer relative z-40">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>
            
            {/* User Menu Dropdown */}
            <div className="absolute right-0 top-12 w-48 bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-white hover:bg-white/10 rounded-lg transition-all duration-200 flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          !isMobile && (
            <button
              onClick={handleLoginClick}
              className="relative z-40 px-8 py-3 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white font-normal text-sm transition-all duration-300 hover:bg-black/30 cursor-pointer h-12 flex items-center pointer-events-auto select-text"
              style={{ pointerEvents: 'auto' }}
            >
              <span className="select-text pointer-events-auto">Login</span>
            </button>
          )
        )}
      </div>
    </header>
  )
}
