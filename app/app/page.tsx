import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { OwnerDashboard } from "@/components/owner/owner-dashboard"

export default async function OwnerAppPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?error=unauthorized")
  }

  // Get company data for this business owner
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("*")
    .eq("auth_user_id", user.id)
    .single()

  if (companyError || !company) {
    redirect("/login?error=unauthorized")
  }

  // Get documents for this company
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("company_id", company.id)
    .order("created_at", { ascending: false })

  return <OwnerDashboard company={company} documents={documents || []} />
}
