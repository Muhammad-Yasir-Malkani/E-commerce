import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, use actual database
const orders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customer: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 123-4567",
    },
    items: [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299,
        quantity: 1,
        image: "/premium-wireless-headphones.png",
      },
    ],
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
    },
    billingAddress: {
      firstName: "John",
      lastName: "Doe",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "US",
    },
    paymentMethod: "card",
    paymentStatus: "paid",
    subtotal: 299,
    shipping: 0,
    tax: 23.92,
    total: 322.92,
    status: "processing",
    trackingNumber: null,
    notes: "",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const order = orders.find((o) => o.id === id)

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  return NextResponse.json(order)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const orderIndex = orders.findIndex((o) => o.id === id)

    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(orders[orderIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const orderIndex = orders.findIndex((o) => o.id === id)

  if (orderIndex === -1) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  orders.splice(orderIndex, 1)

  return NextResponse.json({ message: "Order deleted successfully" })
}
