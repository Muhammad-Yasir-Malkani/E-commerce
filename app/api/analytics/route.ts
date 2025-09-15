import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const dateRange = searchParams.get("dateRange") || "30d"
  const metric = searchParams.get("metric")

  try {
    // Mock analytics data based on date range
    const mockData = {
      overview: {
        totalRevenue: dateRange === "7d" ? 28750 : dateRange === "30d" ? 125430 : 450280,
        revenueGrowth: dateRange === "7d" ? 8.2 : dateRange === "30d" ? 12.5 : 18.7,
        totalOrders: dateRange === "7d" ? 287 : dateRange === "30d" ? 1247 : 4502,
        ordersGrowth: dateRange === "7d" ? 5.1 : dateRange === "30d" ? 8.3 : 15.2,
        totalCustomers: dateRange === "7d" ? 198 : dateRange === "30d" ? 892 : 3245,
        customersGrowth: dateRange === "7d" ? 12.8 : dateRange === "30d" ? 15.2 : 22.1,
        conversionRate: dateRange === "7d" ? 3.8 : dateRange === "30d" ? 3.4 : 3.1,
        conversionGrowth: dateRange === "7d" ? 1.2 : dateRange === "30d" ? -2.1 : -5.3,
      },
      revenueData: generateRevenueData(dateRange),
      productPerformance: [
        { name: "Pro Task Templates", sales: 324, revenue: 9396, growth: 15.2 },
        { name: "Productivity Planner", sales: 189, revenue: 3591, growth: 8.7 },
        { name: "Team Collaboration Kit", sales: 156, revenue: 13884, growth: 22.1 },
        { name: "Focus Timer Pro", sales: 203, revenue: 3045, growth: -5.3 },
        { name: "Project Management Suite", sales: 98, revenue: 4802, growth: 31.4 },
      ],
      customerSegments: [
        { segment: "New Customers", count: 245, revenue: 18375, percentage: 27.5 },
        { segment: "Returning Customers", count: 387, revenue: 46440, percentage: 43.4 },
        { segment: "VIP Customers", count: 89, revenue: 35600, percentage: 10.0 },
        { segment: "Enterprise", count: 171, revenue: 25015, percentage: 19.1 },
      ],
      trafficSources: [
        { source: "Organic Search", visitors: 12450, conversions: 423, revenue: 31725 },
        { source: "Direct", visitors: 8920, conversions: 312, revenue: 23400 },
        { source: "Social Media", visitors: 6780, conversions: 189, revenue: 14175 },
        { source: "Email Marketing", visitors: 4560, conversions: 234, revenue: 17550 },
        { source: "Paid Ads", visitors: 3240, conversions: 89, revenue: 6675 },
      ],
      salesFunnel: [
        { stage: "Visitors", count: 36950, percentage: 100 },
        { stage: "Product Views", count: 14780, percentage: 40 },
        { stage: "Add to Cart", count: 5912, percentage: 16 },
        { stage: "Checkout", count: 1847, percentage: 5 },
        { stage: "Purchase", count: 1247, percentage: 3.4 },
      ],
    }

    // If specific metric requested, return only that
    if (metric && metric in mockData) {
      return NextResponse.json({ [metric]: mockData[metric as keyof typeof mockData] })
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Failed to fetch analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

function generateRevenueData(dateRange: string) {
  if (dateRange === "7d") {
    return [
      { month: "Mon", revenue: 3200, orders: 32, customers: 24 },
      { month: "Tue", revenue: 3800, orders: 38, customers: 29 },
      { month: "Wed", revenue: 4200, orders: 42, customers: 32 },
      { month: "Thu", revenue: 3900, orders: 39, customers: 30 },
      { month: "Fri", revenue: 4500, orders: 45, customers: 34 },
      { month: "Sat", revenue: 4800, orders: 48, customers: 37 },
      { month: "Sun", revenue: 4350, orders: 43, customers: 33 },
    ]
  }

  if (dateRange === "90d") {
    return [
      { month: "Jul", revenue: 14500, orders: 145, customers: 112 },
      { month: "Aug", revenue: 15200, orders: 152, customers: 118 },
      { month: "Sep", revenue: 16800, orders: 168, customers: 129 },
      { month: "Oct", revenue: 17500, orders: 175, customers: 135 },
      { month: "Nov", revenue: 18200, orders: 182, customers: 141 },
      { month: "Dec", revenue: 19500, orders: 195, customers: 151 },
    ]
  }

  // Default 30d
  return [
    { month: "Jan", revenue: 8500, orders: 85, customers: 65 },
    { month: "Feb", revenue: 9200, orders: 92, customers: 71 },
    { month: "Mar", revenue: 10800, orders: 108, customers: 83 },
    { month: "Apr", revenue: 11500, orders: 115, customers: 89 },
    { month: "May", revenue: 12200, orders: 122, customers: 94 },
    { month: "Jun", revenue: 13800, orders: 138, customers: 106 },
    { month: "Jul", revenue: 14500, orders: 145, customers: 112 },
    { month: "Aug", revenue: 15200, orders: 152, customers: 118 },
    { month: "Sep", revenue: 16800, orders: 168, customers: 129 },
    { month: "Oct", revenue: 17500, orders: 175, customers: 135 },
    { month: "Nov", revenue: 18200, orders: 182, customers: 141 },
    { month: "Dec", revenue: 19500, orders: 195, customers: 151 },
  ]
}
