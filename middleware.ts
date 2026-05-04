import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;

  const isProtectedRoute =
    nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/rooms') ||
    nextUrl.pathname.startsWith('/meetings') ||
    nextUrl.pathname.startsWith('/profile') ||
    nextUrl.pathname.startsWith('/api/connection-details') ||
    nextUrl.pathname.startsWith('/api/record') ||
    nextUrl.pathname.startsWith('/api/rooms') ||
    nextUrl.pathname.startsWith('/api/meetings') ||
    nextUrl.pathname.startsWith('/api/profile') ||
    nextUrl.pathname.startsWith('/api/search');

  if (isProtectedRoute && !isLoggedIn) {
    const signInUrl = new URL('/signin', nextUrl.origin);
    // Preserve the full URL including query params so user lands
    // back on /rooms/abc123 after signing in
    signInUrl.searchParams.set(
      'callbackUrl',
      nextUrl.pathname + nextUrl.search
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};