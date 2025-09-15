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
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customer: {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "(555) 987-6543",
    },
    items: [
      {
        id: 2,
        name: "Smart Watch Pro",
        price: 449,
        quantity: 1,
        image: "/premium-smart-watch.jpg",
      },
      {
        id: 3,
        name: "Wireless Charging Pad",
        price: 59,
        quantity: 2,
        image: "/wireless-charging-pad.png",
      },
    ],
    shippingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "US",
    },
    billingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "US",
    },
    paymentMethod: "card",
    paymentStatus: "paid",
    subtotal: 567,
    shipping: 0,
    tax: 45.36,
    total: 612.36,
    status: "shipped",
    trackingNumber: "1Z999AA1234567890",
    notes: "Customer requested expedited shipping",
    createdAt: "2024-01-14T16:45:00Z",
    updatedAt: "2024-01-15T09:20:00Z",
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customer: {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "(555) 456-7890",
    },
    items: [
      {
        id: 4,
        name: "Minimalist Laptop Stand",
        price: 89,
        quantity: 1,
        image: "/minimalist-laptop-stand.jpg",
      },
    ],
    shippingAddress: {
      firstName: "Mike",
      lastName: "Johnson",
      address: "789 Pine Street",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "US",
    },
    billingAddress: {
      firstName: "Mike",
      lastName: "Johnson",
      address: "789 Pine Street",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "US",
    },
    paymentMethod: "card",
    paymentStatus: "paid",
    subtotal: 89,
    shipping: 9.99,
    tax: 7.92,
    total: 106.91,
    status: "completed",
    trackingNumber: "1Z999AA9876543210",
    notes: "",
    createdAt: "2024-01-13T14:20:00Z",
    updatedAt: "2024-01-16T11:30:00Z",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const search = searchParams.get("search")
  const sortBy = searchParams.get("sortBy") || "newest"

  let filteredOrders = [...orders]

  // Filter by status
  if (status && status !== "all") {
    filteredOrders = filteredOrders.filter((order) => order.status === status)
  }

  // Filter by search term (order number, customer name, email)
  if (search) {
    const searchLower = search.toLowerCase()
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.email.toLowerCase().includes(searchLower),
    )
  }

  // Sort orders
  switch (sortBy) {
    case "newest":
      filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case "oldest":
      filteredOrders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      break
    case "total-high":
      filteredOrders.sort((a, b) => b.total - a.total)
      break
    case "total-low":
      filteredOrders.sort((a, b) => a.total - b.total)
      break
  }

  return NextResponse.json({
    orders: filteredOrders,
    total: filteredOrders.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newOrder = {
      id: Math.max(...orders.map((o) => o.id)) + 1,
      orderNumber: `ORD-2024-${String(Math.max(...orders.map((o) => o.id)) + 1).padStart(3, "0")}`,
      ...body,
      paymentStatus: "paid",
      status: "pending",
      trackingNumber: null,
      notes: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orders.push(newOrder)

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
