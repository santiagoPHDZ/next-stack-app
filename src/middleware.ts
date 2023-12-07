
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { AuthObject } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

import { Ratelimit } from "@upstash/ratelimit"
import { redis } from './lib/redis';

// Rate Limit
const rateLimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s")
})

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

  // Rate limit
  const ip = req.ip ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } = await rateLimit.limit(ip)

  console.log("remaining: ", remaining)
  
  if (!success) {
    console.log("Rate limited")
    const now = Date.now()
    const retryAfter = Math.floor((reset - now) / 1000)
    return new NextResponse("Rate Limit", {
      status: 429,
      headers: {
        ["retry-after"]: `${retryAfter}`
      }
    })
  }

  const pathname = req.nextUrl.pathname

  if (auth.userId && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
