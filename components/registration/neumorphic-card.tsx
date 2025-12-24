import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface NeumorphicCardProps {
  children: ReactNode
  className?: string
}

export function NeumorphicCard({ children, className }: NeumorphicCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-card p-8",
        "shadow-[8px_8px_24px_rgba(0,0,0,0.06),-8px_-8px_24px_rgba(255,255,255,0.8)]",
        "border border-border/50",
        className,
      )}
    >
      {children}
    </div>
  )
}
