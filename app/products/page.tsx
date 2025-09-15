import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Filter, Grid, List } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299,
      originalPrice: 399,
      image: "/premium-wireless-headphones.png",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
      category: "Electronics",
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 449,
      image: "/premium-smart-watch.jpg",
      rating: 4.9,
      reviews: 89,
      badge: "New",
      category: "Electronics",
    },
    {
      id: 3,
      name: "Minimalist Laptop Stand",
      price: 89,
      image: "/minimalist-laptop-stand.jpg",
      rating: 4.7,
      reviews: 156,
      category: "Accessories",
    },
    {
      id: 4,
      name: "Wireless Charging Pad",
      price: 59,
      image: "/wireless-charging-pad.png",
      rating: 4.6,
      reviews: 203,
      category: "Electronics",
    },
    {
      id: 5,
      name: "Premium Coffee Maker",
      price: 199,
      image: "/premium-coffee-maker.png",
      rating: 4.5,
      reviews: 78,
      category: "Home & Garden",
    },
    {
      id: 6,
      name: "Designer Backpack",
      price: 129,
      image: "/designer-backpack.png",
      rating: 4.7,
      reviews: 92,
      category: "Fashion",
    },
  ]

  const categories = ["Electronics", "Accessories", "Home & Garden", "Fashion"]
  const priceRanges = [
    { label: "Under $50", value: "0-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100 - $200", value: "100-200" },
    { label: "$200 - $500", value: "200-500" },
    { label: "Over $500", value: "500+" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">All Products</h1>
            <p className="text-xl text-muted-foreground">Discover our complete collection of premium products</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input placeholder="Search products..." />
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="font-medium">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} />
                    <label htmlFor={category} className="text-sm cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="font-medium">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.value} className="flex items-center space-x-2">
                    <Checkbox id={range.value} />
                    <label htmlFor={range.value} className="text-sm cursor-pointer">
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-3">
              <h3 className="font-medium">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                      <div className="flex">
                        {Array.from({ length: rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-1">& up</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full">Apply Filters</Button>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Showing {products.length} products</p>
              <div className="flex items-center space-x-4">
                <Select defaultValue="featured">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <Link href={`/products/${product.id}`}>
                      <div className="relative overflow-hidden rounded-t-lg">
                        {product.badge && (
                          <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground">
                            {product.badge}
                          </Badge>
                        )}
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
                          <h3 className="font-semibold text-lg text-balance">{product.name}</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium ml-1">{product.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="p-4 pt-0">
                      <Button className="w-full">Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
