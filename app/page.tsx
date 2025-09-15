import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Target, Users, BarChart3, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredTools = [
    {
      id: 1,
      name: "Pro Task Templates",
      price: 29,
      originalPrice: 49,
      image: "/task-templates.jpg",
      rating: 4.9,
      reviews: 324,
      badge: "Best Seller",
      description: "50+ professionally designed task templates",
    },
    {
      id: 2,
      name: "Productivity Planner",
      price: 19,
      image: "/productivity-planner.jpg",
      rating: 4.8,
      reviews: 189,
      badge: "New",
      description: "Digital planner for maximum productivity",
    },
    {
      id: 3,
      name: "Team Collaboration Kit",
      price: 89,
      image: "/collaboration-kit.jpg",
      rating: 4.7,
      reviews: 156,
      description: "Complete toolkit for team productivity",
    },
    {
      id: 4,
      name: "Focus Timer Pro",
      price: 15,
      image: "/focus-timer.jpg",
      rating: 4.6,
      reviews: 203,
      description: "Advanced Pomodoro timer with analytics",
    },
  ]

  const features = [
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: "Smart Task Management",
      description: "AI-powered task organization and prioritization",
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Team Collaboration",
      description: "Seamless collaboration tools for teams",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Productivity Analytics",
      description: "Track and improve your productivity metrics",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background to-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Productivity Platform</Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  Master Your Tasks, Boost Your Productivity
                </h1>
                <p className="text-xl text-muted-foreground text-pretty">
                  Complete task management platform with premium productivity tools, templates, and resources to help
                  you achieve more.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/dashboard">
                    Start Managing Tasks
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/store">Browse Tools</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/task-management-hero.jpg"
                alt="Task Management Dashboard"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Premium Productivity Tools</h2>
            <p className="text-xl text-muted-foreground">
              Handpicked tools and templates to supercharge your productivity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <Card key={tool.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    {tool.badge && (
                      <Badge className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground">
                        {tool.badge}
                      </Badge>
                    )}
                    <img
                      src={tool.image || `/placeholder.svg?height=200&width=300&query=${tool.name}`}
                      alt={tool.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg text-balance">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{tool.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({tool.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">${tool.price}</span>
                        {tool.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">${tool.originalPrice}</span>
                        )}
                      </div>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/store">View All Tools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Transform Your Productivity?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of professionals who have already boosted their productivity with TaskFlow Pro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/dashboard">
                  Get Started Free
                  <Zap className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
