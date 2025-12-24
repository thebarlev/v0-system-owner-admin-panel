"use client"

interface Step {
  id: number
  label: string
}

interface StepProgressProps {
  steps: Step[]
  currentStep: number
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 right-0 bg-primary transition-all duration-500 ease-out rounded-full"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>
      {/* Step Label */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          שלב {currentStep} מתוך {steps.length}
        </span>
        <span className="text-xs font-medium text-foreground">{steps.find((s) => s.id === currentStep)?.label}</span>
      </div>
    </div>
  )
}
