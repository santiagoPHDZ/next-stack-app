
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { AuthObject } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Redis
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from './lib/redis';

// Rate Limit
const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s")
})

// Clerk middleware
export default authMiddleware({
  publicRoutes: ['/', '/api/uploadthing'], // auth is called, but not restricted | on all other routs auth will be requiered
  // ignoredRoutes: ['/'], // ignored, wont call middleware
  afterAuth(auth, req, evt) {

    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // run if auth or in public route
    return middleware(req, auth)
  }
},
)

async function middleware(req: NextRequest, auth: AuthObject) {
  console.log("middleware", auth.userId)

  const pathname = req.nextUrl.pathname

  // API
  if (pathname.startsWith("/api")) {
    return apiMiddleware(req)
  }

  // If is in landing page
  if (auth.userId && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

// Match all routs to be protected by middleware
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}


// Rate limit api
async function apiMiddleware(req: NextRequest) {
  // Rate limit
  const ip = req.ip ?? "127.0.0.1";
  const { success, reset, remaining } = await rateLimit.limit(ip)

  console.log("API rate remaining: ", remaining)

  if (!success) {
    console.log("API rate limited")
    const now = Date.now()
    const retryAfter = Math.floor((reset - now) / 1000)
    return new NextResponse("Rate Limit", {
      status: 429,
      headers: {
        ["retry-after"]: `${retryAfter}`
      }
    })
  }
  return NextResponse.next()
}