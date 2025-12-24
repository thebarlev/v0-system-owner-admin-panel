"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Building2,
  FileText,
  LogOut,
  Receipt,
  FileCheck,
  Quote,
  Truck,
  CreditCard,
  Mail,
  Phone,
  Hash,
} from "lucide-react"
import { NeumorphicCard } from "@/components/registration/neumorphic-card"
import { cn } from "@/lib/utils"
import type { Company, Document } from "@/lib/types/admin"

interface OwnerDashboardProps {
  company: Company
  documents: Document[]
}

const documentTypeIcons: Record<string, React.ReactNode> = {
  tax_invoice: <FileText className="h-4 w-4" />,
  invoice_receipt: <Receipt className="h-4 w-4" />,
  receipt: <FileCheck className="h-4 w-4" />,
  quote: <Quote className="h-4 w-4" />,
  delivery_note: <Truck className="h-4 w-4" />,
  credit_invoice: <CreditCard className="h-4 w-4" />,
}

const documentTypeLabels: Record<string, string> = {
  tax_invoice: "חשבונית מס",
  invoice_receipt: "חשבונית מס קבלה",
  receipt: "קבלה",
  quote: "הצעת מחיר",
  delivery_note: "תעודת משלוח",
  credit_invoice: "חשבונית זיכוי",
}

const businessTypeLabels: Record<string, string> = {
  osek_patur: "עוסק פטור",
  osek_murshe: "עוסק מורשה",
  ltd: "חברה בע״מ",
  partnership: "שותפות",
  other: "אחר",
}

export function OwnerDashboard({ company, documents }: OwnerDashboardProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
  }

  const totalAmount = documents.reduce((sum, doc) => sum + Number(doc.amount || 0), 0)
  const openDocuments = documents.filter((d) => d.status === "open").length
  const closedDocuments = documents.filter((d) => d.status === "closed").length

  const formatDate = (date: string | null) => {
    if (!date) return "לא זמין"
    return new Date(date).toLocaleDateString("he-IL", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-foreground">{company.company_name}</h1>
              <p className="text-xs text-muted-foreground">לוח הבקרה</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground",
              "hover:bg-muted/50 hover:text-foreground transition-colors",
              "disabled:opacity-50",
            )}
          >
            <LogOut className="h-4 w-4" />
            <span>{isLoggingOut ? "מתנתק..." : "התנתק"}</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6">
          {/* Welcome Section */}
          <div>
            <h2 className="text-xl font-semibold text-foreground">שלום, {company.contact_first_name || "משתמש"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">ברוך הבא ללוח הבקרה שלך</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NeumorphicCard className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">סה״כ מסמכים</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{documents.length}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">פתוחים</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{openDocuments}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-1/10">
                  <FileText className="h-5 w-5 text-chart-1" />
                </div>
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">סגורים</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{closedDocuments}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-2/10">
                  <FileCheck className="h-5 w-5 text-chart-2" />
                </div>
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">סה״כ סכום</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{formatCurrency(totalAmount)}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-chart-3/10">
                  <CreditCard className="h-5 w-5 text-chart-3" />
                </div>
              </div>
            </NeumorphicCard>
          </div>

          {/* Company Info */}
          <NeumorphicCard>
            <div className="mb-4">
              <h3 className="text-base font-semibold text-foreground">פרטי העסק</h3>
              <p className="text-sm text-muted-foreground">המידע העסקי שלך</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">סוג עסק</p>
                  <p className="text-sm font-medium text-foreground">
                    {company.business_type
                      ? businessTypeLabels[company.business_type] || company.business_type
                      : "לא צוין"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">מספר עוסק/ח.פ.</p>
                  <p className="text-sm font-medium text-foreground" dir="ltr">
                    {company.tax_id || "לא צוין"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">אימייל</p>
                  <p className="text-sm font-medium text-foreground" dir="ltr">
                    {company.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/50">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">טלפון</p>
                  <p className="text-sm font-medium text-foreground" dir="ltr">
                    {company.mobile_phone || "לא צוין"}
                  </p>
                </div>
              </div>
            </div>
          </NeumorphicCard>

          {/* Documents Table */}
          <NeumorphicCard className="overflow-hidden p-0">
            <div className="p-6 pb-4">
              <h3 className="text-base font-semibold text-foreground">מסמכים</h3>
              <p className="text-sm text-muted-foreground">חשבוניות, קבלות ומסמכים נוספים</p>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="pr-6 text-right">מסמך</TableHead>
                    <TableHead className="text-right">סוג</TableHead>
                    <TableHead className="text-right">תאריך</TableHead>
                    <TableHead className="text-right">סכום</TableHead>
                    <TableHead className="pl-6 text-right">סטטוס</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <FileText className="h-8 w-8" />
                          <p>אין מסמכים עדיין</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    documents.map((doc) => (
                      <TableRow key={doc.id} className="border-border/50">
                        <TableCell className="pr-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50">
                              {documentTypeIcons[doc.document_type] || <FileText className="h-4 w-4" />}
                            </div>
                            <span className="font-medium text-foreground" dir="ltr">
                              {doc.document_number}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {documentTypeLabels[doc.document_type] || doc.document_type}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{formatDate(doc.issue_date)}</TableCell>
                        <TableCell className="font-medium text-foreground">
                          {formatCurrency(Number(doc.amount))}
                        </TableCell>
                        <TableCell className="pl-6">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "font-normal",
                              doc.status === "open"
                                ? "bg-chart-1/10 text-chart-1 hover:bg-chart-1/20"
                                : doc.status === "closed"
                                  ? "bg-chart-2/10 text-chart-2 hover:bg-chart-2/20"
                                  : "bg-muted text-muted-foreground",
                            )}
                          >
                            {doc.status === "open" ? "פתוח" : doc.status === "closed" ? "סגור" : doc.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </NeumorphicCard>
        </div>
      </main>
    </div>
  )
}
