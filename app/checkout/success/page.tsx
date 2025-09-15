import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <p className="text-lg">
              Order Number: <span className="font-semibold">#{orderNumber}</span>
            </p>
          </div>

          {/* Order Details */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">What happens next?</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Order Confirmation</h3>
                    <p className="text-sm text-muted-foreground">You'll receive an email confirmation shortly</p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Order Processing</h3>
                    <p className="text-sm text-muted-foreground">We'll prepare your items for shipment</p>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <Truck className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Fast Delivery</h3>
                    <p className="text-sm text-muted-foreground">Your order will be delivered in 3-5 business days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/orders">View Order Status</Link>
            </Button>
          </div>

          {/* Support */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Need help with your order?</p>
            <Button variant="link" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
