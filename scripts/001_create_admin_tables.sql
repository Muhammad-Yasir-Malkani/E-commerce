-- Create admin users table with roles and permissions
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'manager', 'analyst')),
  permissions JSONB DEFAULT '{}',
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create customers table for user management
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'basic', 'premium', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'yearly')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'pending')),
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method TEXT,
  transaction_id TEXT UNIQUE,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users (only admins can access)
CREATE POLICY "Admin users can view all admin users" ON admin_users FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() AND au.is_active = true
  )
);

CREATE POLICY "Admin users can update their own profile" ON admin_users FOR UPDATE USING (
  auth.uid() = id
);

-- RLS Policies for customers (admins can view all, customers can view their own)
CREATE POLICY "Admins can view all customers" ON customers FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() AND au.is_active = true
  )
);

CREATE POLICY "Customers can view their own data" ON customers FOR SELECT USING (
  auth.uid() = auth_user_id
);

CREATE POLICY "Admins can manage customers" ON customers FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() AND au.is_active = true
  )
);

-- RLS Policies for subscriptions
CREATE POLICY "Admins can view all subscriptions" ON subscriptions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() AND au.is_active = true
  )
);

CREATE POLICY "Customers can view their own subscriptions" ON subscriptions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM customers c 
    WHERE c.id = customer_id AND c.auth_user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage subscriptions" ON subscriptions FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() AND au.is_active = true
  )
);

-- RLS Policies for payments
CREATE POLICY "Admins can view all payments" ON payments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() AND au.is_active = true
  )
);

CREATE POLICY "Customers can view their own payments" ON payments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM customers c 
    WHERE c.id = customer_id AND c.auth_user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage payments" ON payments FOR ALL USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() AND au.is_active = true
  )
);

-- RLS Policies for analytics_events
CREATE POLICY "Admins can view all analytics" ON analytics_events FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() AND au.is_active = true
  )
);

CREATE POLICY "System can insert analytics events" ON analytics_events FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_customers_auth_user_id ON customers(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer_id ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer_id ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_customer_id ON analytics_events(customer_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
