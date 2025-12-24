"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  FileText,
  DollarSign,
  Calendar,
  Hash,
  Flag,
  Loader2,
  Shield,
} from "lucide-react"
import type { Company, Document } from "@/lib/types/admin"

interface CompanyDetailsProps {
  company: Company
  documents: Document[]
  totalRevenue: number
  adminName: string
}

const businessTypeLabels: Record<string, string> = {
  osek_patur: "Osek Patur",
  osek_murshe: "Osek Murshe",
  ltd: "Ltd",
  other: "Other",
}

const documentTypeLabels: Record<string, string> = {
  tax_invoice: "Tax Invoice",
  invoice_receipt: "Invoice + Receipt",
  receipt: "Receipt",
  quote: "Quote",
  delivery_note: "Delivery Note",
  credit_invoice: "Credit Invoice",
}

export function CompanyDetails({
  company: initialCompany,
  documents: initialDocuments,
  totalRevenue,
  adminName,
}: CompanyDetailsProps) {
  const router = useRouter()
  const [company, setCompany] = useState(initialCompany)
  const [documents, setDocuments] = useState(initialDocuments)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [updatingGoalId, setUpdatingGoalId] = useState<string | null>(null)

  const handleStatusToggle = async (checked: boolean) => {
    const newStatus = checked ? "active" : "suspended"
    setIsUpdatingStatus(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("companies").update({ status: newStatus }).eq("id", company.id)

      if (error) throw error

      setCompany((prev) => ({ ...prev, status: newStatus }))
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  const handleGoalToggle = async (documentId: string, checked: boolean) => {
    setUpdatingGoalId(documentId)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("documents").update({ is_goal_marked: checked }).eq("id", documentId)

      if (error) throw error

      setDocuments((prev) => prev.map((d) => (d.id === documentId ? { ...d, is_goal_marked: checked } : d)))
    } catch (error) {
      console.error("Failed to update goal flag:", error)
    } finally {
      setUpdatingGoalId(null)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency: "ILS",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/admin")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">System Admin</span>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">{adminName}</span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Company Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{company.company_name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {businessTypeLabels[company.business_type || "other"]} {company.tax_id && `• Tax ID: ${company.tax_id}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={company.status === "active"}
                  onCheckedChange={handleStatusToggle}
                  disabled={isUpdatingStatus}
                />
                <span className="text-sm font-medium">{company.status === "active" ? "Active" : "Suspended"}</span>
                {isUpdatingStatus && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
              <Badge
                className={
                  company.status === "active"
                    ? "bg-chart-2/10 text-chart-2 hover:bg-chart-2/20"
                    : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                }
              >
                {company.status === "active" ? "Active" : "Suspended"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Contact</p>
                  <p className="font-medium">{company.contact_full_name}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                  <Mail className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="truncate font-medium">{company.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                  <Phone className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{company.mobile_phone || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/10">
                  <DollarSign className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Revenue</p>
                  <p className="font-semibold">{formatCurrency(totalRevenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Documents</CardTitle>
                <CardDescription>
                  {documents.length} document{documents.length !== 1 ? "s" : ""} total
                </CardDescription>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4" />
                        Number
                      </div>
                    </TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-6">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4" />
                        Goal
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <FileText className="h-8 w-8" />
                          <p>No documents found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="pl-6 font-medium">{doc.document_number}</TableCell>
                        <TableCell>{documentTypeLabels[doc.document_type]}</TableCell>
                        <TableCell className="text-muted-foreground">{formatDate(doc.issue_date)}</TableCell>
                        <TableCell className="text-right font-medium">{formatCurrency(doc.amount)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              doc.status === "open"
                                ? "border-chart-4/50 bg-chart-4/10 text-chart-4"
                                : doc.status === "closed"
                                  ? "border-chart-2/50 bg-chart-2/10 text-chart-2"
                                  : "border-muted-foreground/50 bg-muted text-muted-foreground"
                            }
                          >
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="pr-6">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={doc.is_goal_marked}
                              onCheckedChange={(checked) => handleGoalToggle(doc.id, checked as boolean)}
                              disabled={updatingGoalId === doc.id}
                            />
                            {updatingGoalId === doc.id && <Loader2 className="h-3 w-3 animate-spin" />}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
