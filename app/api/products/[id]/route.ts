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
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const product = products.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    products[productIndex] = {
      ...products[productIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(products[productIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const productIndex = products.findIndex((p) => p.id === id)

  if (productIndex === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  products.splice(productIndex, 1)

  return NextResponse.json({ message: "Product deleted successfully" })
}
