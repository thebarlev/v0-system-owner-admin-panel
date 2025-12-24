export interface Company {
  id: string
  company_name: string
  business_type: "osek_patur" | "osek_murshe" | "ltd" | "other" | null
  tax_id: string | null
  contact_first_name: string
  contact_full_name: string
  email: string
  mobile_phone: string | null
  status: "active" | "suspended" | "closed"
  created_at: string
  last_login_at: string | null
  auth_user_id: string | null
  documents: { count: number }[]
}

export interface Document {
  id: string
  company_id: string
  document_number: string
  document_type: "tax_invoice" | "invoice_receipt" | "receipt" | "quote" | "delivery_note" | "credit_invoice"
  issue_date: string
  amount: number
  status: "open" | "closed" | "canceled"
  is_goal_marked: boolean
  created_at: string
}

export interface GlobalSetting {
  id: string
  setting_key: string
  setting_value: string
  updated_at: string
  updated_by: string | null
}

export interface KpiData {
  totalUsers: number
  newUsersThisMonth: number
  newUsersLastMonth: number
  activeUsers: number
}
