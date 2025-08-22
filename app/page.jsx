"use client"

import Header from "@/components/header"
import PromptInput from "@/components/prompt-input"
import SalesFunBranding from "@/components/salesfun-branding"
import ShaderBackground from "@/components/shader-background"

export default function SalesFunApp() {
  return (
    <ShaderBackground>
      <Header />
      <PromptInput />
      <SalesFunBranding />
    </ShaderBackground>
  )
}
