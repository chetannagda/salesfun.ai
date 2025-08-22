"use client"

import { useState } from "react"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleDocsClick = (e) => {
    e.preventDefault()
    window.location.href = "/docs"
  }

  const handlePricingClick = (e) => {
    e.preventDefault()
    window.location.href = "/pricing"
  }

  const handleLoginClick = (e) => {
    e.preventDefault()
    if (isLoggedIn) {
      setIsLoggedIn(false)
    } else {
      window.location.href = "/login"
    }
  }

  return (
    <header className="relative z-20 flex items-center justify-between p-6">
      <div className="flex items-center">
        <h1 className="text-white text-xl font-semibold">SalesFun.ai</h1>
      </div>

      <nav className="flex items-center space-x-2">
        <button
          onClick={handleDocsClick}
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          Docs
        </button>
        <button
          onClick={handlePricingClick}
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer"
        >
          Pricing
        </button>
      </nav>

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
            className="px-6 py-2 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 text-white font-normal text-xs transition-all duration-300 hover:bg-black/30 cursor-pointer h-8 flex items-center"
          >
            Login
          </button>
        )}
      </div>
    </header>
  )
}
