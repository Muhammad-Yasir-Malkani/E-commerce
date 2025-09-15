"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Eye,
  ArrowUpRight,
  CreditCard,
  UserCheck,
} from "lucide-react"
import Link from "next/link"
import type { AdminUser } from "@/lib/auth"

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  totalSubscriptions: number
  totalPayments: number
  revenueGrowth: number
  ordersGrowth: number
  customersGrowth: number
  subscriptionsGrowth: number
  recentOrders: Array<{
    id: string
    customer: string
    email: string
    total: number
    status: string
    date: string
  }>
  recentSubscriptions: Array<{
    id: string
    customer: string
    plan: string
    status: string
    amount: number
    date: string
  }>
  topProducts: Array<{
    id: string
    name: string
    sales: number
    revenue: number
  }>
  salesData: Array<{
    month: string
    revenue: number
    orders: number
    subscriptions: number
  }>
  subscriptionBreakdown: Array<{
    name: string
    value: number
    count: number
  }>
}

const COLORS = ["#164e63", "#84cc16", "#f59e0b", "#ef4444"]

interface AdminDashboardClientProps {
  adminUser: AdminUser
}

export function AdminDashboardClient({ adminUser }: AdminDashboardClientProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "active":
        return "bg-green-100 text-green-800"
      case "processing":
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading dashboard...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-8">
        <div className="text-center">Failed to load dashboard data.</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {adminUser.first_name || "Admin"}! Here's what's happening with your platform.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.revenueGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={stats.revenueGrowth > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(stats.revenueGrowth)}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.ordersGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={stats.ordersGrowth > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(stats.ordersGrowth)}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.customersGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={stats.customersGrowth > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(stats.customersGrowth)}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubscriptions.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.subscriptionsGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={stats.subscriptionsGrowth > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(stats.subscriptionsGrowth)}%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPayments.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-muted-foreground">This month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="text-muted-foreground">In catalog</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Subscriptions Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stats.salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "revenue" ? formatCurrency(Number(value)) : value,
                    name === "revenue" ? "Revenue" : "Subscriptions",
                  ]}
                />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#164e63" fill="#164e63" fillOpacity={0.1} />
                <Area
                  type="monotone"
                  dataKey="subscriptions"
                  stackId="2"
                  stroke="#84cc16"
                  fill="#84cc16"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subscription Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.subscriptionBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.subscriptionBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">#{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(order.total)}</p>
                    <Badge className={getStatusColor(order.status)} variant="secondary">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Subscriptions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Subscriptions</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/subscriptions">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentSubscriptions.slice(0, 5).map((subscription) => (
                <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{subscription.customer}</p>
                    <p className="text-sm text-muted-foreground">{subscription.plan}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(subscription.amount)}</p>
                    <Badge className={getStatusColor(subscription.status)} variant="secondary">
                      {subscription.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button asChild className="h-auto p-6 flex-col space-y-2">
            <Link href="/admin/subscriptions/new">
              <UserCheck className="h-6 w-6" />
              <span>Create Subscription</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto p-6 flex-col space-y-2 bg-transparent">
            <Link href="/admin/customers">
              <Users className="h-6 w-6" />
              <span>Manage Customers</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto p-6 flex-col space-y-2 bg-transparent">
            <Link href="/admin/payments">
              <CreditCard className="h-6 w-6" />
              <span>View Payments</span>
            </Link>
          </Button>
          <Button variant="outline" asChild className="h-auto p-6 flex-col space-y-2 bg-transparent">
            <Link href="/admin/analytics">
              <Eye className="h-6 w-6" />
              <span>View Analytics</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
