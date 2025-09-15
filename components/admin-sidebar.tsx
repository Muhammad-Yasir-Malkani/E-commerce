"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, Store, Tag, Truck } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    title: "Shipping",
    href: "/admin/shipping",
    icon: Truck,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:bg-muted/20">
      <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link href="/admin" className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Admin Panel</span>
          </Link>
        </div>
        <div className="mt-8 flex-grow flex flex-col">
          <ScrollArea className="flex-1 px-3">
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn("w-full justify-start", isActive && "bg-secondary")}
                    asChild
                  >
                    <Link href={item.href}>
                      <Icon className="mr-3 h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                )
              })}
            </nav>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
