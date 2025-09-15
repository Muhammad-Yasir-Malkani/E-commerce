import { type NextRequest, NextResponse } from "next/server"

// Mock user storage (in real app, this would be a database)
const mockUsers = [
  {
    id: 1,
    email: "admin@taskflow.com",
    password: "password123",
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
    const { firstName, lastName, email, password } = body

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      email,
      password, // In real app, this would be hashed
      firstName,
      lastName,
      role: "user",
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)

    // Generate mock JWT token
    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`

    // Return user data and token
    return NextResponse.json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
