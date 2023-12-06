
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { AuthObject } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/'], // auth is called, but not restricted | on all other routs auth will be requiered
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

  if (auth.userId && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}