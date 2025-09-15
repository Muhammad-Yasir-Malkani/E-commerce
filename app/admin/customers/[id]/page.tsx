"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, DollarSign, ShoppingBag, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Customer {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  status: string
  addresses: Array<{
    id: number
    type: string
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    isDefault: boolean
  }>
  orders: Array<{
    id: number
    orderNumber: string
    total: number
    status: string
    date: string
  }>
  totalSpent: number
  totalOrders: number
  averageOrderValue: number
  lastOrderDate: string | null
  createdAt: string
  updatedAt: string
  notes: string
  tags: string[]
}

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCustomer()
  }, [params.id])

  const fetchCustomer = async () => {
    try {
      const response = await fetch(`/api/customers/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setCustomer(data)
      } else {
        router.push("/admin/customers")
      }
    } catch (error) {
      console.error("Failed to fetch customer:", error)
      router.push("/admin/customers")
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "blocked":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading customer details...</div>
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Customer not found.</div>
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
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/customers">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {customer.firstName} {customer.lastName}
              </h1>
              <p className="text-muted-foreground">Customer since {formatDate(customer.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className={getStatusColor(customer.status)}>
              {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
            </Badge>
            <Button asChild>
              <Link href={`/admin/customers/${customer.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Customer
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Date of Birth</p>
                      <p className="text-sm text-muted-foreground">{formatDate(customer.dateOfBirth)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {customer.gender === "male" ? "M" : customer.gender === "female" ? "F" : "O"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">Gender</p>
                      <p className="text-sm text-muted-foreground capitalize">{customer.gender}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Addresses */}
            <Card>
              <CardHeader>
                <CardTitle>Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                {customer.addresses.length > 0 ? (
                  <div className="space-y-4">
                    {customer.addresses.map((address) => (
                      <div key={address.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium capitalize">{address.type} Address</span>
                          </div>
                          {address.isDefault && <Badge variant="secondary">Default</Badge>}
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>
                            {address.firstName} {address.lastName}
                          </p>
                          <p>{address.address}</p>
                          <p>
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p>{address.country}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No addresses on file.</p>
                )}
              </CardContent>
            </Card>

            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {customer.orders.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customer.orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="font-medium text-primary hover:underline"
                            >
                              {order.orderNumber}
                            </Link>
                          </TableCell>
                          <TableCell>{formatDateTime(order.date)}</TableCell>
                          <TableCell>{formatCurrency(order.total)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-muted-foreground">No orders yet.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Spent</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(customer.totalSpent)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Orders</span>
                  </div>
                  <span className="font-semibold">{customer.totalOrders}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Avg Order Value</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(customer.averageOrderValue)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Order</span>
                  <span className="font-semibold">{formatDate(customer.lastOrderDate)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                {customer.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {customer.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No tags assigned.</p>
                )}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                {customer.notes ? (
                  <p className="text-sm">{customer.notes}</p>
                ) : (
                  <p className="text-muted-foreground">No notes available.</p>
                )}
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Customer ID</span>
                  <span className="font-medium">#{customer.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created</span>
                  <span className="font-medium">{formatDate(customer.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated</span>
                  <span className="font-medium">{formatDate(customer.updatedAt)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
