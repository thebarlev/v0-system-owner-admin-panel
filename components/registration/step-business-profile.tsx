"use client"

import type React from "react"

import { useState } from "react"
import { useRegistration } from "./registration-context"
import { NeumorphicCard } from "./neumorphic-card"
import { NeumorphicInput } from "./neumorphic-input"
import { NeumorphicSelect } from "./neumorphic-select"
import { NeumorphicButton } from "./neumorphic-button"

const BUSINESS_TYPES = [
  { value: "osek_patur", label: "עוסק פטור" },
  { value: "osek_murshe", label: "עוסק מורשה" },
  { value: "ltd", label: "חברה בע״מ" },
  { value: "partnership", label: "שותפות" },
]

const INDUSTRIES = [
  { value: "retail", label: "קמעונאות" },
  { value: "services", label: "שירותים" },
  { value: "tech", label: "הייטק" },
  { value: "construction", label: "בנייה" },
  { value: "food", label: "מזון ומסעדנות" },
  { value: "health", label: "בריאות" },
  { value: "education", label: "חינוך" },
  { value: "other", label: "אחר" },
]

export function StepBusinessProfile() {
  const { data, updateData, nextStep, prevStep } = useRegistration()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!data.businessName.trim()) newErrors.businessName = "שדה חובה"
    if (!data.businessType) newErrors.businessType = "שדה חובה"
    if (!data.industry) newErrors.industry = "שדה חובה"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      nextStep()
    }
  }

  return (
    <NeumorphicCard>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground">פרופיל עסקי</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {data.isBusinessFound ? "בדוק ועדכן את הפרטים" : "ספר לנו על העסק שלך"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <NeumorphicInput
          id="businessName"
          label="שם העסק"
          placeholder="שם העסק המלא"
          value={data.businessName}
          onChange={(e) => updateData({ businessName: e.target.value })}
          error={errors.businessName}
        />

        <NeumorphicSelect
          label="סוג העסק"
          placeholder="בחר סוג עסק"
          value={data.businessType}
          onValueChange={(value) => updateData({ businessType: value as typeof data.businessType })}
          options={BUSINESS_TYPES}
          error={errors.businessType}
        />

        <NeumorphicSelect
          label="תחום פעילות"
          placeholder="בחר תחום"
          value={data.industry}
          onValueChange={(value) => updateData({ industry: value })}
          options={INDUSTRIES}
          error={errors.industry}
        />

        <div className="flex gap-3 mt-2">
          <NeumorphicButton type="button" variant="secondary" onClick={prevStep}>
            חזור
          </NeumorphicButton>
          <NeumorphicButton type="submit">המשך</NeumorphicButton>
        </div>
      </form>
    </NeumorphicCard>
  )
}
