-- This script creates the admin user for itzik@thebarlev.com
-- Note: Supabase Auth users must be created through the Auth API, not directly in SQL
-- This script only adds the system_admins entry AFTER you sign up through the app

-- First, let's check if there are any auth users
SELECT id, email FROM auth.users LIMIT 5;

-- If the user already exists in auth.users, run this to add them as system admin:
-- (Replace the UUID with the actual user ID from auth.users)
/*
INSERT INTO public.system_admins (auth_user_id, email, name, role)
SELECT id, email, 'Itzik Barlev', 'SYSTEM_ADMIN'
FROM auth.users 
WHERE email = 'itzik@thebarlev.com'
ON CONFLICT (email) DO NOTHING;
*/
