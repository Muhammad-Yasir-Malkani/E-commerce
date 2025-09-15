import { createClient } from "@/lib/supabase/server"
import { createClient as createBrowserClient } from "@/lib/supabase/client"

export interface AdminUser {
  id: string
  email: string
  role: "super_admin" | "admin" | "manager" | "analyst"
  permissions: Record<string, boolean>
  first_name?: string
  last_name?: string
  avatar_url?: string
  is_active: boolean
  last_login?: string
}

export interface Customer {
  id: string
  auth_user_id?: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  avatar_url?: string
  is_active: boolean
  subscription_status: "free" | "basic" | "premium" | "enterprise"
}

// Server-side auth functions
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .eq("is_active", true)
    .single()

  return adminUser
}

export async function getCustomer(): Promise<Customer | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: customer } = await supabase
    .from("customers")
    .select("*")
    .eq("auth_user_id", user.id)
    .eq("is_active", true)
    .single()

  return customer
}

// Client-side auth functions
export async function signInAdmin(email: string, password: string) {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  // Verify user is admin
  if (data.user) {
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", data.user.id)
      .eq("is_active", true)
      .single()

    if (adminError || !adminUser) {
      await supabase.auth.signOut()
      throw new Error("Unauthorized: Admin access required")
    }

    // Update last login
    await supabase.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", data.user.id)
  }

  return data
}

export async function signInCustomer(email: string, password: string) {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
    },
  })

  return { data, error }
}

export async function signUpCustomer(
  email: string,
  password: string,
  userData?: {
    first_name?: string
    last_name?: string
    phone?: string
  },
) {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
      data: userData,
    },
  })

  return { data, error }
}

export async function signOut() {
  const supabase = createBrowserClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export function hasPermission(adminUser: AdminUser, permission: string): boolean {
  if (adminUser.role === "super_admin") return true
  return adminUser.permissions[permission] === true
}

export function canAccessRoute(adminUser: AdminUser, route: string): boolean {
  const routePermissions: Record<string, string[]> = {
    "/admin/users": ["manage_users"],
    "/admin/subscriptions": ["manage_subscriptions"],
    "/admin/payments": ["manage_payments"],
    "/admin/analytics": ["view_analytics"],
    "/admin/settings": ["manage_settings"],
  }

  const requiredPermissions = routePermissions[route] || []
  return requiredPermissions.every((permission) => hasPermission(adminUser, permission))
}
