"use client"

import { useState } from "react"
import { AdminHeader } from "./admin-header"
import { KpiCards } from "./kpi-cards"
import { CompaniesTable } from "./companies-table"
import { SettingsPanel } from "./settings-panel"
import type { Company, GlobalSetting, KpiData } from "@/lib/types/admin"

interface AdminDashboardProps {
  adminName: string
  kpiData: KpiData
  companies: Company[]
  settings: GlobalSetting[]
}

export function AdminDashboard({ adminName, kpiData, companies: initialCompanies, settings }: AdminDashboardProps) {
  const [companies, setCompanies] = useState(initialCompanies)
  const [showSettings, setShowSettings] = useState(false)

  const handleStatusChange = (companyId: string, newStatus: "active" | "suspended") => {
    setCompanies((prev) => prev.map((c) => (c.id === companyId ? { ...c, status: newStatus } : c)))
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader adminName={adminName} onSettingsClick={() => setShowSettings(true)} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">Monitor and manage all accounts in the system</p>
        </div>

        <KpiCards data={kpiData} />

        <div className="mt-8">
          <CompaniesTable companies={companies} onStatusChange={handleStatusChange} />
        </div>
      </main>

      <SettingsPanel open={showSettings} onOpenChange={setShowSettings} settings={settings} />
    </div>
  )
}
