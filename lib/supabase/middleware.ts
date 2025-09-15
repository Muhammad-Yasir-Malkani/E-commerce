import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Check if user is admin for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = "/auth/admin-login"
      return NextResponse.redirect(url)
    }

    // Check if user is admin
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .eq("is_active", true)
      .single()

    if (!adminUser) {
      const url = request.nextUrl.clone()
      url.pathname = "/auth/unauthorized"
      return NextResponse.redirect(url)
    }
  }

  // Redirect unauthenticated users from protected routes
  if (!user && (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/profile"))) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
