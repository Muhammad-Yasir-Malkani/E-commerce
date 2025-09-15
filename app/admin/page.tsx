import { redirect } from "next/navigation"
import { getAdminUser } from "@/lib/auth"
import { AdminDashboardClient } from "@/components/admin-dashboard-client"

export default async function AdminDashboard() {
  const adminUser = await getAdminUser()

  if (!adminUser) {
    redirect("/auth/admin-login")
  }

  return <AdminDashboardClient adminUser={adminUser} />
}
