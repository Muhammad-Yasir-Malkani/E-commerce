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
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "(555) 987-6543",
    dateOfBirth: "1990-03-22",
    gender: "female",
    status: "active",
    addresses: [
      {
        id: 2,
        type: "shipping",
        firstName: "Jane",
        lastName: "Smith",
        address: "456 Oak Avenue",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "US",
        isDefault: true,
      },
    ],
    orders: [
      {
        id: 2,
        orderNumber: "ORD-2024-002",
        total: 612.36,
        status: "shipped",
        date: "2024-01-14T16:45:00Z",
      },
    ],
    totalSpent: 612.36,
    totalOrders: 1,
    averageOrderValue: 612.36,
    lastOrderDate: "2024-01-14T16:45:00Z",
    createdAt: "2023-11-15T14:30:00Z",
    updatedAt: "2024-01-15T09:20:00Z",
    notes: "Prefers expedited shipping",
    tags: ["newsletter", "repeat-customer"],
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike@example.com",
    phone: "(555) 456-7890",
    dateOfBirth: "1988-11-08",
    gender: "male",
    status: "active",
    addresses: [
      {
        id: 3,
        type: "shipping",
        firstName: "Mike",
        lastName: "Johnson",
        address: "789 Pine Street",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "US",
        isDefault: true,
      },
    ],
    orders: [
      {
        id: 3,
        orderNumber: "ORD-2024-003",
        total: 106.91,
        status: "completed",
        date: "2024-01-13T14:20:00Z",
      },
    ],
    totalSpent: 106.91,
    totalOrders: 1,
    averageOrderValue: 106.91,
    lastOrderDate: "2024-01-13T14:20:00Z",
    createdAt: "2024-01-10T10:15:00Z",
    updatedAt: "2024-01-16T11:30:00Z",
    notes: "",
    tags: ["new-customer"],
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const status = searchParams.get("status")
  const sortBy = searchParams.get("sortBy") || "newest"

  let filteredCustomers = [...customers]

  // Filter by search term (name, email)
  if (search) {
    const searchLower = search.toLowerCase()
    filteredCustomers = filteredCustomers.filter(
      (customer) =>
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower),
    )
  }

  // Filter by status
  if (status && status !== "all") {
    filteredCustomers = filteredCustomers.filter((customer) => customer.status === status)
  }

  // Sort customers
  switch (sortBy) {
    case "newest":
      filteredCustomers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case "oldest":
      filteredCustomers.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      break
    case "spent-high":
      filteredCustomers.sort((a, b) => b.totalSpent - a.totalSpent)
      break
    case "spent-low":
      filteredCustomers.sort((a, b) => a.totalSpent - b.totalSpent)
      break
    case "orders-high":
      filteredCustomers.sort((a, b) => b.totalOrders - a.totalOrders)
      break
    case "name":
      filteredCustomers.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`))
      break
  }

  return NextResponse.json({
    customers: filteredCustomers,
    total: filteredCustomers.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newCustomer = {
      id: Math.max(...customers.map((c) => c.id)) + 1,
      ...body,
      totalSpent: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      lastOrderDate: null,
      orders: [],
      addresses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    customers.push(newCustomer)

    return NextResponse.json(newCustomer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
  }
}
