import { type NextRequest, NextResponse } from "next/server"

// Mock user data
const mockUsers = [
  {
    id: 1,
    email: "admin@taskflow.com",
    password: "password123", // In real app, this would be hashed
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    email: "user@taskflow.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    role: "user",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body

    // Find user
    const user = mockUsers.find((u) => u.email === email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate mock JWT token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`

    // Return user data and token
    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
