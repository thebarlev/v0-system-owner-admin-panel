-- Seed sample companies for testing (run after creating a system admin)
-- Note: You'll need to add a system admin first via the auth system

-- Sample companies (these will only be accessible once you have a system admin user)
INSERT INTO companies (company_name, business_type, tax_id, contact_first_name, contact_full_name, email, mobile_phone, status, created_at, last_login_at) VALUES
  ('Tech Solutions Ltd', 'ltd', '515123456', 'David', 'David Cohen', 'david@techsolutions.co.il', '052-1234567', 'active', NOW() - INTERVAL '6 months', NOW() - INTERVAL '1 day'),
  ('Cafe Bistro', 'osek_murshe', '025678901', 'Sarah', 'Sarah Levy', 'sarah@cafebistro.co.il', '053-2345678', 'active', NOW() - INTERVAL '3 months', NOW() - INTERVAL '3 days'),
  ('Design Studio', 'osek_patur', '312345678', 'Michael', 'Michael Ben-David', 'michael@designstudio.co.il', '054-3456789', 'suspended', NOW() - INTERVAL '8 months', NOW() - INTERVAL '2 weeks'),
  ('Import Export Co', 'ltd', '514567890', 'Rachel', 'Rachel Mizrachi', 'rachel@importexport.co.il', '055-4567890', 'active', NOW() - INTERVAL '1 year', NOW() - INTERVAL '5 hours'),
  ('Consulting Group', 'osek_murshe', '026789012', 'Yosef', 'Yosef Azulay', 'yosef@consultinggroup.co.il', '056-5678901', 'active', NOW() - INTERVAL '2 months', NOW() - INTERVAL '12 hours');

-- Sample documents for the companies
INSERT INTO documents (company_id, document_number, document_type, issue_date, amount, status, is_goal_marked)
SELECT 
  c.id,
  'INV-' || LPAD((ROW_NUMBER() OVER())::TEXT, 5, '0'),
  (ARRAY['tax_invoice', 'invoice_receipt', 'receipt', 'quote'])[1 + (RANDOM() * 3)::INT],
  CURRENT_DATE - (RANDOM() * 180)::INT,
  (RANDOM() * 10000 + 500)::DECIMAL(12,2),
  (ARRAY['open', 'closed', 'canceled'])[1 + (RANDOM() * 2)::INT],
  RANDOM() > 0.7
FROM companies c
CROSS JOIN generate_series(1, 5);
