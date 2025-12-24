"use client"

import type React from "react"

import { useState } from "react"
import { useRegistration } from "./registration-context"
import { NeumorphicCard } from "./neumorphic-card"
import { NeumorphicInput } from "./neumorphic-input"
import { NeumorphicButton } from "./neumorphic-button"
import { Eye, EyeOff } from "lucide-react"

export function StepPersonalDetails() {
  const { data, updateData, nextStep, error, setError } = useRegistration()
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!data.firstName.trim()) newErrors.firstName = "שדה חובה"
    if (!data.lastName.trim()) newErrors.lastName = "שדה חובה"
    if (!data.email.trim()) {
      newErrors.email = "שדה חובה"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "כתובת אימייל לא תקינה"
    }
    if (!data.phone.trim()) {
      newErrors.phone = "שדה חובה"
    } else if (!/^0[0-9]{8,9}$/.test(data.phone.replace(/[-\s]/g, ""))) {
      newErrors.phone = "מספר טלפון לא תקין"
    }
    if (!data.password) {
      newErrors.password = "שדה חובה"
    } else if (data.password.length < 8) {
      newErrors.password = "סיסמה חייבת להכיל לפחות 8 תווים"
    }

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
        <h2 className="text-xl font-semibold text-foreground">פרטים אישיים</h2>
        <p className="mt-1 text-sm text-muted-foreground">נתחיל עם הפרטים שלך</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <NeumorphicInput
            id="firstName"
            label="שם פרטי"
            placeholder="ישראל"
            value={data.firstName}
            onChange={(e) => updateData({ firstName: e.target.value })}
            error={errors.firstName}
          />
          <NeumorphicInput
            id="lastName"
            label="שם משפחה"
            placeholder="ישראלי"
            value={data.lastName}
            onChange={(e) => updateData({ lastName: e.target.value })}
            error={errors.lastName}
          />
        </div>

        <NeumorphicInput
          id="email"
          type="email"
          label="אימייל"
          placeholder="israel@example.com"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
          error={errors.email}
          dir="ltr"
          className="text-left"
        />

        <NeumorphicInput
          id="phone"
          type="tel"
          label="טלפון נייד"
          placeholder="050-1234567"
          value={data.phone}
          onChange={(e) => updateData({ phone: e.target.value })}
          error={errors.phone}
          dir="ltr"
          className="text-left"
        />

        <div className="relative">
          <NeumorphicInput
            id="password"
            type={showPassword ? "text" : "password"}
            label="סיסמה"
            placeholder="לפחות 8 תווים"
            value={data.password}
            onChange={(e) => updateData({ password: e.target.value })}
            error={errors.password}
            dir="ltr"
            className="text-left pl-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {error && <p className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">{error}</p>}

        <NeumorphicButton type="submit" className="mt-2">
          המשך
        </NeumorphicButton>
      </form>
    </NeumorphicCard>
  )
}
