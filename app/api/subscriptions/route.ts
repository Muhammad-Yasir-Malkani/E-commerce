import { type NextRequest, NextResponse } from "next/server"

// Mock subscription data
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  try {
    let subscriptions = mockSubscriptions

    if (userId) {
      subscriptions = subscriptions.filter((sub) => sub.userId === Number.parseInt(userId))
    }

    return NextResponse.json({
      subscriptions,
      total: subscriptions.length,
    })
  } catch (error) {
    console.error("Failed to fetch subscriptions:", error)
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, planName, paymentMethodId } = body

    // Mock subscription creation
    const newSubscription = {
      id: mockSubscriptions.length + 1,
      userId,
      planName,
      status: "active",
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      cancelAtPeriodEnd: false,
      amount: planName === "Professional" ? 19 : 49,
      currency: "USD",
      interval: "month",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockSubscriptions.push(newSubscription)

    return NextResponse.json(newSubscription, { status: 201 })
  } catch (error) {
    console.error("Failed to create subscription:", error)
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
  }
}
