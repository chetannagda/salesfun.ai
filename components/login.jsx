"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ShaderBackground from "@/components/shader-background"

export default function LoginPage() {
  // State management for different views
  const [currentView, setCurrentView] = useState("signin") // signin, signup, otp, success
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Sign in form state
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  // Sign up form state
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // OTP state
  const [otpCode, setOtpCode] = useState("")
  const [errors, setErrors] = useState({})

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Form validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateSignUpForm = () => {
    const newErrors = {}

    if (!signUpData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!signUpData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!signUpData.username.trim()) newErrors.username = "Username is required"
    if (!signUpData.email.trim()) newErrors.email = "Email is required"
    else if (!validateEmail(signUpData.email)) newErrors.email = "Invalid email format"
    if (!signUpData.password) newErrors.password = "Password is required"
    if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateSignInForm = () => {
    const newErrors = {}

    if (!signInData.email.trim()) newErrors.email = "Email is required"
    else if (!validateEmail(signInData.email)) newErrors.email = "Invalid email format"
    if (!signInData.password) newErrors.password = "Password is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle sign in
  const handleSignIn = async (e) => {
    e.preventDefault()
    if (!validateSignInForm()) return

    setIsLoading(true)
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log("[v0] Sign in attempted with:", signInData)
    // Here you would integrate with your authentication API
  }

  // Handle sign up
  const handleSignUp = async (e) => {
    e.preventDefault()
    if (!validateSignUpForm()) return

    setIsLoading(true)
    // Simulate sending OTP
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log("[v0] Sign up attempted with:", signUpData)
    console.log("[v0] OTP sent to:", signUpData.email)
    setCurrentView("otp")
  }

  // Handle OTP verification
  const handleOTPVerification = async (e) => {
    e.preventDefault()
    if (otpCode.length !== 6) {
      setErrors({ otp: "Please enter a 6-digit code" })
      return
    }

    setIsLoading(true)
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    // Simulate successful verification (in real app, verify with backend)
    if (otpCode === "123456") {
      console.log("[v0] Account created successfully")
      setCurrentView("success")
    } else {
      setErrors({ otp: "Invalid OTP code. Try 123456 for demo." })
    }
  }

  // Handle social login
  const handleSocialLogin = (provider) => {
    console.log("[v0] Social login with:", provider)
    // Here you would integrate with OAuth provider
  }

  // Reset form and go back to sign in
  const resetToSignIn = () => {
    setCurrentView("signin")
    setSignInData({ email: "", password: "" })
    setSignUpData({ firstName: "", lastName: "", username: "", email: "", password: "", confirmPassword: "" })
    setOtpCode("")
    setErrors({})
  }

  return (
    <ShaderBackground>
      {/* Holographic Brand Watermarks */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {/* Meta Logo Watermark */}
        <div className="absolute top-1/4 right-1/4 transform rotate-12">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="text-white/20">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
        
        {/* Google Ads Logo Watermark */}
        <div className="absolute bottom-1/4 left-1/4 transform -rotate-12">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-white/20">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
          </svg>
        </div>

        {/* Additional holographic elements */}
        <div className="absolute top-1/2 left-1/6 transform rotate-45 opacity-10">
          <div className="w-16 h-16 border border-white/20 rounded-lg animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>
        <div className="absolute bottom-1/3 right-1/6 transform -rotate-45 opacity-10">
          <div className="w-12 h-12 border border-white/20 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <Card className="max-w-md w-full mx-4 border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl shadow-purple-500/20 rounded-2xl overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-violet-500/30 p-[1px]">
          <div className="w-full h-full bg-transparent rounded-2xl"></div>
        </div>
        
        <div className="relative z-10">
          {/* Sign In View */}
          {currentView === "signin" && (
            <>
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-white/90 drop-shadow-md">
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-6 pb-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-sm font-medium text-white drop-shadow-md">
                      Email Address
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      className="border-white/40 bg-white/20 placeholder:text-white/70 text-white py-3 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:bg-white/25 transition-all duration-200 rounded-xl backdrop-blur-sm drop-shadow-lg"
                      required
                    />
                    {errors.email && <p className="text-red-400 text-sm drop-shadow-md">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-sm font-medium text-white drop-shadow-md">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        className="border-white/40 bg-white/20 placeholder:text-white/70 text-white py-3 pr-12 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:bg-white/25 transition-all duration-200 rounded-xl backdrop-blur-sm drop-shadow-lg"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-400 text-sm drop-shadow-md">{errors.password}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-bold py-4 transition-all duration-300 bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600 hover:from-purple-700 hover:via-blue-700 hover:to-violet-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-[1.02] rounded-xl border border-white/20"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/30"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white/10 px-4 text-white/80 backdrop-blur-sm rounded-full drop-shadow-md">Or continue with</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("Google")}
                    className="w-full border-white/40 bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm transition-all duration-300 rounded-xl py-3 hover:border-white/60 drop-shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </div>

                <div className="text-center space-y-3">
                  <a
                    href="#"
                    className="text-sm text-white/90 hover:text-white transition-colors block drop-shadow-md"
                  >
                    Forgot your password?
                  </a>
                  <button
                    onClick={() => setCurrentView("signup")}
                    className="text-sm text-white/90 hover:text-white transition-colors underline underline-offset-4 drop-shadow-md"
                  >
                    Create a New Account
                  </button>
                </div>
              </CardContent>
            </>
          )}

          {/* Sign Up View */}
          {currentView === "signup" && (
            <>
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">
                  Create Account
                </CardTitle>
                <CardDescription className="text-white/90 drop-shadow-md">
                  Join us today and get started
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-6 pb-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-white drop-shadow-md">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="First name"
                        value={signUpData.firstName}
                        onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                        className="border-white/40 bg-white/20 placeholder:text-white/70 text-white py-3 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:bg-white/25 transition-all duration-200 rounded-xl backdrop-blur-sm drop-shadow-lg"
                        required
                      />
                      {errors.firstName && <p className="text-red-400 text-xs drop-shadow-md">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-white drop-shadow-md">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Last name"
                        value={signUpData.lastName}
                        onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                        className="border-white/40 bg-white/20 placeholder:text-white/70 text-white py-3 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:bg-white/25 transition-all duration-200 rounded-xl backdrop-blur-sm drop-shadow-lg"
                        required
                      />
                      {errors.lastName && <p className="text-red-400 text-xs drop-shadow-md">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium text-white drop-shadow-md">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      value={signUpData.username}
                      onChange={(e) => setSignUpData({ ...signUpData, username: e.target.value })}
                      className="border-white/40 bg-white/20 placeholder:text-white/70 text-white py-3 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:bg-white/25 transition-all duration-200 rounded-xl backdrop-blur-sm drop-shadow-lg"
                      required
                    />
                    {errors.username && <p className="text-red-400 text-sm drop-shadow-md">{errors.username}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm font-medium text-white drop-shadow-md">
                      Email Address
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      className="border-white/40 bg-white/20 placeholder:text-white/70 text-white py-3 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:bg-white/25 transition-all duration-200 rounded-xl backdrop-blur-sm drop-shadow-lg"
                      required
                    />
                    {errors.email && <p className="text-red-400 text-sm drop-shadow-md">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm font-medium text-white drop-shadow-md">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className="border-white/40 bg-white/20 placeholder:text-white/70 text-white py-3 pr-12 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:bg-white/25 transition-all duration-200 rounded-xl backdrop-blur-sm drop-shadow-lg"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-400 text-sm drop-shadow-md">{errors.password}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-white drop-shadow-md">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                        className="border-white/40 bg-white/20 placeholder:text-white/70 text-white py-3 pr-12 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:bg-white/25 transition-all duration-200 rounded-xl backdrop-blur-sm drop-shadow-lg"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="text-red-400 text-sm drop-shadow-md">{errors.confirmPassword}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-bold py-4 transition-all duration-300 bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600 hover:from-purple-700 hover:via-blue-700 hover:to-violet-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-[1.02] rounded-xl border border-white/20"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/30"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white/10 px-4 text-white/80 backdrop-blur-sm rounded-full drop-shadow-md">Or continue with</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("Google")}
                    className="w-full border-white/40 bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm transition-all duration-300 rounded-xl py-3 hover:border-white/60 drop-shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setCurrentView("signin")}
                    className="text-sm text-white/90 hover:text-white transition-colors underline underline-offset-4 drop-shadow-md"
                  >
                    Already have an account? Sign In
                  </button>
                </div>
              </CardContent>
            </>
          )}

          {/* OTP Verification View */}
          {currentView === "otp" && (
            <>
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">
                  Verify Email
                </CardTitle>
                <CardDescription className="text-white/90 drop-shadow-md">
                  We sent a 6-digit code to {signUpData.email}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-6 pb-6">
                <form onSubmit={handleOTPVerification} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium text-white drop-shadow-md">
                      Verification Code
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="border-white/40 bg-white/20 placeholder:text-white/70 text-white py-3 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:bg-white/25 transition-all duration-200 text-center text-2xl tracking-widest rounded-xl backdrop-blur-sm drop-shadow-lg"
                      maxLength={6}
                      required
                    />
                    {errors.otp && <p className="text-red-400 text-sm drop-shadow-md">{errors.otp}</p>}
                    <p className="text-xs text-white/80 text-center drop-shadow-md">Demo: Use code "123456" to proceed</p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-bold py-4 transition-all duration-300 bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600 hover:from-purple-700 hover:via-blue-700 hover:to-violet-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-[1.02] rounded-xl border border-white/20"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Verifying...
                      </div>
                    ) : (
                      "Verify Code"
                    )}
                  </Button>
                </form>

                <div className="text-center space-y-3">
                  <button
                    onClick={() => console.log("[v0] Resending OTP...")}
                    className="text-sm text-white/90 hover:text-white transition-colors underline underline-offset-4 drop-shadow-md"
                  >
                    Didn't receive the code? Resend
                  </button>
                  <button
                    onClick={() => setCurrentView("signup")}
                    className="text-sm text-white/90 hover:text-white transition-colors underline underline-offset-4 block drop-shadow-md"
                  >
                    Back to Sign Up
                  </button>
                </div>
              </CardContent>
            </>
          )}

          {/* Success View */}
          {currentView === "success" && (
            <>
              <CardHeader className="text-center space-y-4 pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-green-400/20">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">
                  Welcome!
                </CardTitle>
                <CardDescription className="text-white/90 drop-shadow-md">
                  Your account has been created successfully
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-6 pb-6">
                <div className="text-center space-y-4">
                  <p className="text-white/90 drop-shadow-md">
                    Hello {signUpData.firstName}! Your account is ready to use.
                  </p>

                  <Button
                    onClick={resetToSignIn}
                    className="w-full font-bold py-4 transition-all duration-300 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transform hover:scale-[1.02] rounded-xl border border-white/20"
                  >
                    Continue to Sign In
                  </Button>
                </div>
              </CardContent>
            </>
          )}
        </div>
        </Card>
      </div>
    </ShaderBackground>
  )
}
