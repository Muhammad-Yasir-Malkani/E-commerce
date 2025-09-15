import { NextResponse } from "next/server"

// Mock data - in real app, fetch from database
const mockStats = {
  totalRevenue: 45230.5,
  totalOrders: 1247,
  totalCustomers: 892,
  totalProducts: 156,
  revenueGrowth: 12.5,
  ordersGrowth: 8.3,
  customersGrowth: 15.2,
  productsGrowth: 5.7,
  recentOrders: [
    {
      id: 1,
      customer: "John Doe",
      email: "john@example.com",
      total: 299.99,
      status: "completed",
      date: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      customer: "Jane Smith",
      email: "jane@example.com",
      total: 149.5,
      status: "processing",
      date: "2024-01-15T09:15:00Z",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      email: "mike@example.com",
      total: 89.99,
      status: "shipped",
      date: "2024-01-14T16:45:00Z",
    },
    {
      id: 4,
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      total: 199.99,
      status: "completed",
      date: "2024-01-14T14:20:00Z",
    },
    {
      id: 5,
      customer: "Tom Brown",
      email: "tom@example.com",
      total: 349.99,
      status: "processing",
      date: "2024-01-14T11:30:00Z",
    },
  ],
  topProducts: [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      sales: 124,
      revenue: 37076,
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      sales: 89,
      revenue: 39961,
    },
    {
      id: 3,
      name: "Minimalist Laptop Stand",
      sales: 156,
      revenue: 13884,
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      sales: 203,
      revenue: 11977,
    },
  ],
  salesData: [
    { month: "Jan", revenue: 4200, orders: 120 },
    { month: "Feb", revenue: 3800, orders: 110 },
    { month: "Mar", revenue: 5200, orders: 145 },
    { month: "Apr", revenue: 4600, orders: 132 },
    { month: "May", revenue: 6100, orders: 168 },
    { month: "Jun", revenue: 5800, orders: 155 },
    { month: "Jul", revenue: 7200, orders: 189 },
    { month: "Aug", revenue: 6800, orders: 178 },
    { month: "Sep", revenue: 8100, orders: 210 },
    { month: "Oct", revenue: 7600, orders: 198 },
    { month: "Nov", revenue: 9200, orders: 245 },
    { month: "Dec", revenue: 8900, orders: 232 },
  ],
  categoryBreakdown: [
    { name: "Electronics", value: 45, sales: 567 },
    { name: "Accessories", value: 25, sales: 312 },
    { name: "Home & Garden", value: 20, sales: 248 },
    { name: "Fashion", value: 10, sales: 120 },
  ],
}

export async function GET() {
  return NextResponse.json(mockStats)
}
