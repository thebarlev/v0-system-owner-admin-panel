-- Enable Row Level Security

-- Companies: Only system admins can access
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System admins can view all companies" ON companies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM system_admins 
      WHERE system_admins.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "System admins can update companies" ON companies
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM system_admins 
      WHERE system_admins.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "System admins can insert companies" ON companies
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM system_admins 
      WHERE system_admins.auth_user_id = auth.uid()
    )
  );

-- Documents: Only system admins can access
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System admins can view all documents" ON documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM system_admins 
      WHERE system_admins.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "System admins can update documents" ON documents
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM system_admins 
      WHERE system_admins.auth_user_id = auth.uid()
    )
  );

-- System admins table: Only existing system admins can view
ALTER TABLE system_admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System admins can view system admins" ON system_admins
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM system_admins sa
      WHERE sa.auth_user_id = auth.uid()
    )
  );

-- Global settings: Only system admins can access
ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "System admins can view global settings" ON global_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM system_admins 
      WHERE system_admins.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "System admins can update global settings" ON global_settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM system_admins 
      WHERE system_admins.auth_user_id = auth.uid()
    )
  );
