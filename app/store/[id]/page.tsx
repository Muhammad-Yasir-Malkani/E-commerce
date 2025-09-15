"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Download, Heart, Share2, CheckCircle2, Users, Target } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Mock product data - in real app, fetch based on params.id
  const product = {
    id: params.id,
    name: "Pro Task Templates Bundle",
    description:
      "50+ professionally designed task templates for various industries and use cases. Boost your productivity with ready-to-use templates that save you hours of work.",
    price: 29,
    originalPrice: 49,
    images: [
      "/task-templates-bundle.jpg",
      "/template-preview-1.jpg",
      "/template-preview-2.jpg",
      "/template-preview-3.jpg",
    ],
    rating: 4.9,
    reviews: 324,
    category: "Templates",
    type: "template",
    badge: "Best Seller",
    features: [
      "50+ Professional Templates",
      "Multiple File Formats (PDF, Word, Excel)",
      "Lifetime Updates",
      "Commercial License Included",
      "24/7 Support",
      "Mobile-Friendly Designs",
    ],
    whatYouGet: [
      "Project Planning Templates",
      "Task Management Sheets",
      "Goal Setting Frameworks",
      "Team Collaboration Tools",
      "Progress Tracking Charts",
      "Meeting Templates",
    ],
    specifications: {
      "File Formats": "PDF, DOCX, XLSX, PPTX",
      Compatibility: "All major platforms",
      License: "Commercial use allowed",
      Updates: "Lifetime free updates",
      Support: "Email & chat support",
    },
  }

  const relatedProducts = [
    {
      id: "2",
      name: "Productivity Planner Pro",
      price: 19,
      image: "/productivity-planner.jpg",
      rating: 4.8,
    },
    {
      id: "3",
      name: "Focus Timer Pro",
      price: 15,
      image: "/focus-timer-pro.jpg",
      rating: 4.6,
    },
    {
      id: "4",
      name: "Team Collaboration Kit",
      price: 89,
      image: "/collaboration-kit.jpg",
      rating: 4.7,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={product.images[selectedImage] || `/placeholder.svg?height=400&width=600&query=${product.name}`}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{product.badge}</Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || `/placeholder.svg?height=100&width=100&query=template-${index}`}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  <Download className="h-3 w-3 mr-1" />
                  {product.type}
                </Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>

              <h1 className="text-3xl font-bold">{product.name}</h1>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              <p className="text-muted-foreground text-lg">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-green-100 text-green-800">Save ${product.originalPrice - product.price}</Badge>
                )}
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                <div className="text-center">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-1" />
                  <p className="text-sm font-medium">Instant Download</p>
                </div>
                <div className="text-center">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm font-medium">Commercial License</p>
                </div>
                <div className="text-center">
                  <Target className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-sm font-medium">Lifetime Updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="includes">What's Included</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="includes" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">What You'll Get</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.whatYouGet.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Download className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "Sarah Johnson",
                      rating: 5,
                      date: "2 weeks ago",
                      comment:
                        "Excellent templates! Saved me hours of work. The quality is outstanding and they're very easy to customize.",
                    },
                    {
                      name: "Mike Chen",
                      rating: 5,
                      date: "1 month ago",
                      comment:
                        "Perfect for my consulting business. The variety of templates covers all my needs. Highly recommended!",
                    },
                    {
                      name: "Emily Davis",
                      rating: 4,
                      date: "2 months ago",
                      comment:
                        "Great value for money. The templates are professional and well-designed. Would love to see more industry-specific options.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b border-border pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{review.name}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={relatedProduct.image || `/placeholder.svg?height=200&width=300&query=${relatedProduct.name}`}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{relatedProduct.rating}</span>
                      </div>
                      <span className="font-bold">${relatedProduct.price}</span>
                    </div>
                    <Button size="sm" className="w-full">
                      View Product
                    </Button>
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
