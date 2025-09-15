"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
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
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Target, Download } from "lucide-react"

interface AnalyticsData {
  overview: {
    totalRevenue: number
    revenueGrowth: number
    totalOrders: number
    ordersGrowth: number
    totalCustomers: number
    customersGrowth: number
    conversionRate: number
    conversionGrowth: number
  }
  revenueData: Array<{
    month: string
    revenue: number
    orders: number
    customers: number
  }>
  productPerformance: Array<{
    name: string
    sales: number
    revenue: number
    growth: number
  }>
  customerSegments: Array<{
    segment: string
    count: number
    revenue: number
    percentage: number
  }>
  trafficSources: Array<{
    source: string
    visitors: number
    conversions: number
    revenue: number
  }>
  salesFunnel: Array<{
    stage: string
    count: number
    percentage: number
  }>
}

const COLORS = ["#164e63", "#84cc16", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    try {
      // Mock analytics data
      const mockData: AnalyticsData = {
        overview: {
          totalRevenue: 125430,
          revenueGrowth: 12.5,
          totalOrders: 1247,
          ordersGrowth: 8.3,
          totalCustomers: 892,
          customersGrowth: 15.2,
          conversionRate: 3.4,
          conversionGrowth: -2.1,
        },
        revenueData: [
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
        ],
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
      setData(mockData)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
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

  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading analytics...</div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Failed to load analytics data.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
            <p className="text-muted-foreground">Track your business performance and insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(data.overview.totalRevenue)}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {data.overview.revenueGrowth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={data.overview.revenueGrowth > 0 ? "text-green-500" : "text-red-500"}>
                      {formatPercentage(data.overview.revenueGrowth)}
                    </span>
                    <span className="ml-1">from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.totalOrders.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {data.overview.ordersGrowth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={data.overview.ordersGrowth > 0 ? "text-green-500" : "text-red-500"}>
                      {formatPercentage(data.overview.ordersGrowth)}
                    </span>
                    <span className="ml-1">from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.totalCustomers.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {data.overview.customersGrowth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={data.overview.customersGrowth > 0 ? "text-green-500" : "text-red-500"}>
                      {formatPercentage(data.overview.customersGrowth)}
                    </span>
                    <span className="ml-1">from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.conversionRate}%</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {data.overview.conversionGrowth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={data.overview.conversionGrowth > 0 ? "text-green-500" : "text-red-500"}>
                      {formatPercentage(data.overview.conversionGrowth)}
                    </span>
                    <span className="ml-1">from last period</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Revenue"]} />
                    <Area type="monotone" dataKey="revenue" stroke="#164e63" fill="#164e63" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sales Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.salesFunnel.map((stage, index) => (
                    <div key={stage.stage} className="flex items-center space-x-4">
                      <div className="w-24 text-sm font-medium">{stage.stage}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">{stage.count.toLocaleString()}</span>
                          <span className="text-sm font-medium">{stage.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${stage.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            {/* Product Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.productPerformance.map((product, index) => (
                    <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center font-semibold">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(product.revenue)}</p>
                        <div className="flex items-center">
                          {product.growth > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                          )}
                          <span className={`text-sm ${product.growth > 0 ? "text-green-500" : "text-red-500"}`}>
                            {formatPercentage(product.growth)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Sales */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#84cc16" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            {/* Customer Segments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={data.customerSegments}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="percentage"
                      >
                        {data.customerSegments.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data.revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="customers" stroke="#164e63" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Customer Segment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Segment Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.customerSegments.map((segment, index) => (
                    <div key={segment.segment} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className="h-4 w-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div>
                          <p className="font-medium">{segment.segment}</p>
                          <p className="text-sm text-muted-foreground">{segment.count} customers</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(segment.revenue)}</p>
                        <p className="text-sm text-muted-foreground">{segment.percentage}% of total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketing" className="space-y-6">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.trafficSources.map((source, index) => (
                    <div key={source.source} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{source.source}</p>
                        <p className="text-sm text-muted-foreground">{source.visitors.toLocaleString()} visitors</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(source.revenue)}</p>
                        <p className="text-sm text-muted-foreground">
                          {source.conversions} conversions ({((source.conversions / source.visitors) * 100).toFixed(1)}
                          %)
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Marketing ROI */}
            <Card>
              <CardHeader>
                <CardTitle>Marketing Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.trafficSources}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Revenue"]} />
                    <Bar dataKey="revenue" fill="#84cc16" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
