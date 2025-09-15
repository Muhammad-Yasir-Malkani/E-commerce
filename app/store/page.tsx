"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Filter, ShoppingCart, Download, Zap, Target, BookOpen, Calendar } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  type: "template" | "tool" | "course" | "subscription"
  badge?: string
  features: string[]
}

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const products: Product[] = [
    {
      id: "1",
      name: "Pro Task Templates Bundle",
      description: "50+ professionally designed task templates for various industries and use cases",
      price: 29,
      originalPrice: 49,
      image: "/task-templates-bundle.jpg",
      rating: 4.9,
      reviews: 324,
      category: "Templates",
      type: "template",
      badge: "Best Seller",
      features: ["50+ Templates", "Multiple Formats", "Lifetime Updates", "Commercial License"],
    },
    {
      id: "2",
      name: "Productivity Planner Pro",
      description: "Digital planner with goal tracking, habit formation, and productivity analytics",
      price: 19,
      image: "/productivity-planner.jpg",
      rating: 4.8,
      reviews: 189,
      category: "Planning",
      type: "tool",
      badge: "New",
      features: ["Goal Tracking", "Habit Builder", "Analytics", "Mobile App"],
    },
    {
      id: "3",
      name: "Team Collaboration Masterclass",
      description: "Complete course on building high-performing remote teams",
      price: 89,
      image: "/team-collaboration-course.jpg",
      rating: 4.7,
      reviews: 156,
      category: "Education",
      type: "course",
      features: ["8 Hours Content", "Worksheets", "Certificate", "Lifetime Access"],
    },
    {
      id: "4",
      name: "Focus Timer Pro",
      description: "Advanced Pomodoro timer with analytics, team sync, and productivity insights",
      price: 15,
      image: "/focus-timer-pro.jpg",
      rating: 4.6,
      reviews: 203,
      category: "Tools",
      type: "tool",
      features: ["Advanced Timer", "Team Sync", "Analytics", "Integrations"],
    },
    {
      id: "5",
      name: "TaskFlow Pro Subscription",
      description: "Premium subscription with unlimited templates, advanced features, and priority support",
      price: 9.99,
      image: "/taskflow-subscription.jpg",
      rating: 4.9,
      reviews: 567,
      category: "Subscription",
      type: "subscription",
      badge: "Popular",
      features: ["Unlimited Templates", "Advanced Analytics", "Priority Support", "Team Features"],
    },
    {
      id: "6",
      name: "Project Management Templates",
      description: "Complete set of project management templates for agile and waterfall methodologies",
      price: 39,
      image: "/project-templates.jpg",
      rating: 4.8,
      reviews: 234,
      category: "Templates",
      type: "template",
      features: ["Agile Templates", "Waterfall Templates", "Gantt Charts", "Risk Management"],
    },
  ]

  const categories = ["all", "Templates", "Tools", "Planning", "Education", "Subscription"]
  const types = ["all", "template", "tool", "course", "subscription"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesType = selectedType === "all" || product.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id.localeCompare(a.id)
      default:
        return b.reviews - a.reviews // popular
    }
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "template":
        return <Download className="h-4 w-4" />
      case "tool":
        return <Zap className="h-4 w-4" />
      case "course":
        return <BookOpen className="h-4 w-4" />
      case "subscription":
        return <Calendar className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "template":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "tool":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "course":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "subscription":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Productivity Store</h1>
          <p className="text-xl text-muted-foreground">
            Premium tools, templates, and resources to boost your productivity
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground">
                      {product.badge}
                    </Badge>
                  )}
                  <Badge className={`absolute top-3 right-3 z-10 ${getTypeColor(product.type)}`}>
                    <div className="flex items-center gap-1">
                      {getTypeIcon(product.type)}
                      {product.type}
                    </div>
                  </Badge>
                  <img
                    src={product.image || `/placeholder.svg?height=200&width=300&query=${product.name}`}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-balance">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">
                        ${product.price}
                        {product.type === "subscription" && "/mo"}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Categories */}
        <section className="py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Templates", icon: <Download className="h-8 w-8" />, count: "50+" },
              { name: "Tools", icon: <Zap className="h-8 w-8" />, count: "25+" },
              { name: "Courses", icon: <BookOpen className="h-8 w-8" />, count: "15+" },
              { name: "Subscriptions", icon: <Calendar className="h-8 w-8" />, count: "5+" },
            ].map((category) => (
              <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} products</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
