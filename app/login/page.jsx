"use client"

import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { email, password })
    // Redirect back to home after login
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-semibold text-white mb-6 text-center">Login to SalesFun.ai</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all duration-200"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all duration-200"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => (window.location.href = "/")}
              className="text-white/60 hover:text-white text-sm transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
