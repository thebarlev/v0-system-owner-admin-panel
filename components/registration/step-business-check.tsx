"use client"

import { useState } from "react"
import { useRegistration } from "./registration-context"
import { NeumorphicCard } from "./neumorphic-card"
import { NeumorphicInput } from "./neumorphic-input"
import { NeumorphicButton } from "./neumorphic-button"
import { motion } from "framer-motion"
import { Search, CheckCircle2, Building2 } from "lucide-react"

export function StepBusinessCheck() {
  const { data, updateData, nextStep, prevStep, isLoading, setIsLoading } = useRegistration()
  const [isChecking, setIsChecking] = useState(false)
  const [checkComplete, setCheckComplete] = useState(false)
  const [error, setError] = useState("")

  const handleCheck = async () => {
    if (!data.businessNumber.trim()) {
      setError("נא להזין מספר עוסק/ח.פ.")
      return
    }

    setError("")
    setIsChecking(true)

    // Simulate API call to check business
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock: prefill business data if number looks valid
    const isValid = /^[0-9]{9}$/.test(data.businessNumber.replace(/[-\s]/g, ""))

    if (isValid) {
      updateData({
        isBusinessFound: true,
        businessName: "חברת הדגמה בע״מ",
        businessType: "ltd",
      })
    } else {
      updateData({
        isBusinessFound: false,
        businessName: "",
        businessType: "",
      })
    }

    setIsChecking(false)
    setCheckComplete(true)
  }

  const handleContinue = () => {
    nextStep()
  }

  const handleSkip = () => {
    updateData({ isBusinessFound: false })
    nextStep()
  }

  return (
    <NeumorphicCard>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">בדיקת עסק</h2>
        <p className="mt-1 text-sm text-muted-foreground">נאתר את פרטי העסק שלך אוטומטית</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex gap-3">
          <NeumorphicInput
            id="businessNumber"
            label="מספר עוסק / ח.פ."
            placeholder="123456789"
            value={data.businessNumber}
            onChange={(e) => {
              updateData({ businessNumber: e.target.value })
              setCheckComplete(false)
            }}
            error={error}
            dir="ltr"
            className="flex-1 text-left"
          />
        </div>

        {!checkComplete && (
          <NeumorphicButton type="button" onClick={handleCheck} isLoading={isChecking} variant="secondary">
            <span className="flex items-center justify-center gap-2">
              <Search className="h-4 w-4" />
              <span>חפש עסק</span>
            </span>
          </NeumorphicButton>
        )}

        {/* Loading State */}
        {isChecking && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 py-8"
          >
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-muted" />
              <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
            <p className="text-sm text-muted-foreground">מחפש פרטי עסק...</p>
          </motion.div>
        )}

        {/* Found State */}
        {checkComplete && data.isBusinessFound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl bg-primary/5 border border-primary/20 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">נמצא עסק!</h3>
                <p className="mt-1 text-sm text-muted-foreground">{data.businessName}</p>
                <p className="text-xs text-muted-foreground mt-1">מספר: {data.businessNumber}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Not Found State */}
        {checkComplete && !data.isBusinessFound && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl bg-muted/50 border border-border p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <Building2 className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">לא נמצא עסק</h3>
                <p className="mt-1 text-sm text-muted-foreground">נזין את הפרטים ידנית בשלב הבא</p>
              </div>
            </div>
          </motion.div>
        )}

        {checkComplete && (
          <div className="flex gap-3 mt-2">
            <NeumorphicButton type="button" variant="secondary" onClick={prevStep}>
              חזור
            </NeumorphicButton>
            <NeumorphicButton type="button" onClick={handleContinue}>
              המשך
            </NeumorphicButton>
          </div>
        )}

        {!checkComplete && !isChecking && (
          <button
            type="button"
            onClick={handleSkip}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            דלג, אזין ידנית
          </button>
        )}
      </div>
    </NeumorphicCard>
  )
}
