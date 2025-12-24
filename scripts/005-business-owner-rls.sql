-- RLS Policies for Business Owners (Company Users)
-- This is SEPARATE from system_admins policies

-- Enable RLS on companies table (if not already enabled)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Policy: Business owners can view their own company
CREATE POLICY "Business owners can view own company" ON companies
  FOR SELECT
  USING (auth.uid() = auth_user_id);

-- Policy: Business owners can update their own company
CREATE POLICY "Business owners can update own company" ON companies
  FOR UPDATE
  USING (auth.uid() = auth_user_id);

-- Enable RLS on documents table (if not already enabled)
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policy: Business owners can view their own documents
CREATE POLICY "Business owners can view own documents" ON documents
  FOR SELECT
  USING (
    company_id IN (
      SELECT id FROM companies WHERE auth_user_id = auth.uid()
    )
  );

-- Policy: Business owners can insert their own documents
CREATE POLICY "Business owners can insert own documents" ON documents
  FOR INSERT
  WITH CHECK (
    company_id IN (
      SELECT id FROM companies WHERE auth_user_id = auth.uid()
    )
  );

-- Policy: Business owners can update their own documents
CREATE POLICY "Business owners can update own documents" ON documents
  FOR UPDATE
  USING (
    company_id IN (
      SELECT id FROM companies WHERE auth_user_id = auth.uid()
    )
  );
