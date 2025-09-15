import { type NextRequest, NextResponse } from "next/server"

// Mock subscription data (same as in route.ts)
const mockSubscriptions = [
  {
    id: 1,
    userId: 1,
    planName: "Professional",
    status: "active",
    currentPeriodStart: "2024-01-01T00:00:00Z",
    currentPeriodEnd: "2024-02-01T00:00:00Z",
    cancelAtPeriodEnd: false,
    amount: 19,
    currency: "USD",
    interval: "month",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const subscription = mockSubscriptions.find((sub) => sub.id === id)

    if (!subscription) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    return NextResponse.json(subscription)
  } catch (error) {
    console.error("Failed to fetch subscription:", error)
    return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const subscriptionIndex = mockSubscriptions.findIndex((sub) => sub.id === id)

    if (subscriptionIndex === -1) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    // Update subscription
    mockSubscriptions[subscriptionIndex] = {
      ...mockSubscriptions[subscriptionIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(mockSubscriptions[subscriptionIndex])
  } catch (error) {
    console.error("Failed to update subscription:", error)
    return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const subscriptionIndex = mockSubscriptions.findIndex((sub) => sub.id === id)

    if (subscriptionIndex === -1) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 })
    }

    // Mark as cancelled instead of deleting
    mockSubscriptions[subscriptionIndex] = {
      ...mockSubscriptions[subscriptionIndex],
      status: "cancelled",
      cancelAtPeriodEnd: true,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(mockSubscriptions[subscriptionIndex])
  } catch (error) {
    console.error("Failed to cancel subscription:", error)
    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 })
  }
}
