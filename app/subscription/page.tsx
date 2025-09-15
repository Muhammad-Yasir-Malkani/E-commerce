"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Calendar, Crown, AlertCircle, CheckCircle, Settings, Download, RefreshCw } from "lucide-react"
import Link from "next/link"

interface Subscription {
  id: number
  planName: string
  status: string
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
  amount: number
  currency: string
  interval: string
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      // Mock user ID - in real app, get from auth context
      const response = await fetch("/api/subscriptions?userId=1")
      const data = await response.json()
      if (data.subscriptions.length > 0) {
        setSubscription(data.subscriptions[0])
      }
    } catch (error) {
      console.error("Failed to fetch subscription:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!subscription) return

    if (!confirm("Are you sure you want to cancel your subscription?")) return

    try {
      const response = await fetch(`/api/subscriptions/${subscription.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchSubscription()
      }
    } catch (error) {
      console.error("Failed to cancel subscription:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "past_due":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <RefreshCw className="h-4 w-4" />
    }
  }

  const getDaysUntilRenewal = () => {
    if (!subscription) return 0
    const endDate = new Date(subscription.currentPeriodEnd)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getRenewalProgress = () => {
    if (!subscription) return 0
    const startDate = new Date(subscription.currentPeriodStart)
    const endDate = new Date(subscription.currentPeriodEnd)
    const today = new Date()

    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    const daysPassed = (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)

    return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading subscription...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-muted-foreground">Manage your TaskFlow Pro subscription and billing</p>
        </div>

        {subscription ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Plan */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Crown className="h-6 w-6 text-primary" />
                      <CardTitle>Current Plan</CardTitle>
                    </div>
                    <Badge className={getStatusColor(subscription.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(subscription.status)}
                        <span>{subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold">{subscription.planName}</h3>
                    <p className="text-muted-foreground">
                      ${subscription.amount}/{subscription.interval}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Billing Period</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Days until renewal</span>
                        <span className="text-sm text-muted-foreground">{getDaysUntilRenewal()} days</span>
                      </div>
                      <Progress value={getRenewalProgress()} className="h-2" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" asChild>
                      <Link href="/pricing">
                        <Settings className="mr-2 h-4 w-4" />
                        Change Plan
                      </Link>
                    </Button>
                    {subscription.status === "active" && !subscription.cancelAtPeriodEnd && (
                      <Button
                        variant="outline"
                        onClick={handleCancelSubscription}
                        className="text-destructive hover:text-destructive bg-transparent"
                      >
                        Cancel Subscription
                      </Button>
                    )}
                    {subscription.cancelAtPeriodEnd && <Button variant="outline">Reactivate Subscription</Button>}
                  </div>

                  {subscription.cancelAtPeriodEnd && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Subscription Cancelled</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            Your subscription will end on {formatDate(subscription.currentPeriodEnd)}. You'll retain
                            access until then.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Usage Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Usage This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Tasks Created</span>
                      <span className="text-sm text-muted-foreground">247 / Unlimited</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Team Members</span>
                      <span className="text-sm text-muted-foreground">3 / 5</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Storage Used</span>
                      <span className="text-sm text-muted-foreground">45MB / 100MB</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Billing & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Billing</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Next Payment</span>
                      <span className="text-sm font-medium">${subscription.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Payment Date</span>
                      <span className="text-sm text-muted-foreground">{formatDate(subscription.currentPeriodEnd)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Payment Method</span>
                      <span className="text-sm text-muted-foreground">•••• 4242</span>
                    </div>
                  </div>

                  <Separator />

                  <Button variant="outline" className="w-full bg-transparent">
                    <Settings className="mr-2 h-4 w-4" />
                    Update Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Billing History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <div className="text-sm font-medium">Jan 2024</div>
                      <div className="text-xs text-muted-foreground">Professional Plan</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">$19.00</div>
                      <Badge variant="secondary" className="text-xs">
                        Paid
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <div>
                      <div className="text-sm font-medium">Dec 2023</div>
                      <div className="text-xs text-muted-foreground">Professional Plan</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">$19.00</div>
                      <Badge variant="secondary" className="text-xs">
                        Paid
                      </Badge>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Download Invoices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Crown className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Active Subscription</h3>
              <p className="text-muted-foreground mb-6">
                You're currently on the free plan. Upgrade to unlock premium features.
              </p>
              <Button asChild>
                <Link href="/pricing">View Plans</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
