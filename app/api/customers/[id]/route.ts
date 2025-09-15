import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, use actual database
const customers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-06-15",
    gender: "male",
    status: "active",
    addresses: [
      {
        id: 1,
        type: "shipping",
        firstName: "John",
        lastName: "Doe",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "US",
        isDefault: true,
      },
    ],
    orders: [
      {
        id: 1,
        orderNumber: "ORD-2024-001",
        total: 322.92,
        status: "processing",
        date: "2024-01-15T10:30:00Z",
      },
    ],
    totalSpent: 322.92,
    totalOrders: 1,
    averageOrderValue: 322.92,
    lastOrderDate: "2024-01-15T10:30:00Z",
    createdAt: "2023-12-01T08:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    notes: "",
    tags: ["vip", "newsletter"],
  },
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const customer = customers.find((c) => c.id === id)

  if (!customer) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 })
  }

  return NextResponse.json(customer)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const customerIndex = customers.findIndex((c) => c.id === id)

    if (customerIndex === -1) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    customers[customerIndex] = {
      ...customers[customerIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(customers[customerIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const customerIndex = customers.findIndex((c) => c.id === id)

  if (customerIndex === -1) {
    return NextResponse.json({ error: "Customer not found" }, { status: 404 })
  }

  customers.splice(customerIndex, 1)

  return NextResponse.json({ message: "Customer deleted successfully" })
}
