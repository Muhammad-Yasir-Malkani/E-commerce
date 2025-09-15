import { type NextRequest, NextResponse } from "next/server"

// Mock database - in real app, use actual database
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    description: "Experience premium audio quality with our flagship wireless headphones.",
    category: "Electronics",
    images: ["/premium-wireless-headphones.png"],
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    inStock: true,
    stockCount: 15,
    features: ["Active Noise Cancellation", "30-hour battery life", "Premium leather ear cups"],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Weight: "250g",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: 449,
    description: "Advanced smartwatch with health monitoring and premium design.",
    category: "Electronics",
    images: ["/premium-smart-watch.jpg"],
    rating: 4.9,
    reviews: 89,
    badge: "New",
    inStock: true,
    stockCount: 8,
    features: ["Health monitoring", "GPS tracking", "Water resistant"],
    specifications: {
      Display: "1.4 inch OLED",
      Battery: "7 days",
      "Water Rating": "50m",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const sortBy = searchParams.get("sortBy")

  let filteredProducts = [...products]

  // Filter by category
  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  // Filter by search term
  if (search) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()),
    )
  }

  // Sort products
  if (sortBy) {
    switch (sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }
  }

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newProduct = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      ...body,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    products.push(newProduct)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
