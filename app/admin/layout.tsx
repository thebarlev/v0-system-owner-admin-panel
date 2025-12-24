import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "System Admin Panel",
  description: "System Owner Administration Panel",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
