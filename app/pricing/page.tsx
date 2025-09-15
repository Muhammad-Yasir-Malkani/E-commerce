"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Zap, Crown, Rocket } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals getting started with task management",
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: <Zap className="h-6 w-6" />,
      features: [
        "Up to 10 tasks per month",
        "Basic task organization",
        "Mobile app access",
        "Email support",
        "1 project workspace",
      ],
      limitations: ["Limited integrations", "Basic reporting"],
      popular: false,
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
    },
    {
      name: "Professional",
      description: "Ideal for professionals and small teams",
      monthlyPrice: 19,
      yearlyPrice: 190,
      icon: <Crown className="h-6 w-6" />,
      features: [
        "Unlimited tasks",
        "Advanced task organization",
        "Team collaboration (up to 5 members)",
        "Priority support",
        "5 project workspaces",
        "Advanced reporting",
        "Calendar integration",
        "File attachments (100MB)",
      ],
      popular: true,
      buttonText: "Start Professional",
      buttonVariant: "default" as const,
    },
    {
      name: "Enterprise",
      description: "For large teams and organizations",
      monthlyPrice: 49,
      yearlyPrice: 490,
      icon: <Rocket className="h-6 w-6" />,
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "Unlimited project workspaces",
        "Advanced analytics & insights",
        "Custom integrations",
        "SSO authentication",
        "Dedicated account manager",
        "File attachments (1GB)",
        "API access",
        "Custom branding",
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
    },
  ]

  const getPrice = (plan: (typeof plans)[0]) => {
    if (plan.monthlyPrice === 0) return "Free"
    const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
    const period = isYearly ? "year" : "month"
    return `$${price}/${period}`
  }

  const getSavings = (plan: (typeof plans)[0]) => {
    if (plan.monthlyPrice === 0) return null
    const monthlyCost = plan.monthlyPrice * 12
    const savings = monthlyCost - plan.yearlyPrice
    const percentage = Math.round((savings / monthlyCost) * 100)
    return percentage
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Pricing Plans</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance">Choose Your Perfect Plan</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Start free and scale as you grow. All plans include our core task management features.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <span className={`text-sm ${!isYearly ? "font-semibold" : "text-muted-foreground"}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-primary" />
            <span className={`text-sm ${isYearly ? "font-semibold" : "text-muted-foreground"}`}>Yearly</span>
            <Badge variant="secondary" className="ml-2">
              Save up to 20%
            </Badge>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={plan.name} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {plan.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>

                  <div className="mt-6">
                    <div className="text-4xl font-bold">{getPrice(plan)}</div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <div className="text-sm text-muted-foreground mt-1">Save {getSavings(plan)}% annually</div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Button className="w-full" variant={plan.buttonVariant} size="lg" asChild>
                    <Link href={plan.name === "Enterprise" ? "/contact" : "/auth/signup"}>{plan.buttonText}</Link>
                  </Button>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about our pricing and plans.</p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I change my plan anytime?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll
                    prorate any billing differences.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise
                    customers can also pay by invoice.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                  <p className="text-muted-foreground">
                    Our Starter plan is completely free forever. For paid plans, we offer a 14-day free trial with full
                    access to all features.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What happens if I cancel?</h3>
                  <p className="text-muted-foreground">
                    You can cancel anytime. Your account will remain active until the end of your billing period, and
                    you'll retain access to your data for 30 days after cancellation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
