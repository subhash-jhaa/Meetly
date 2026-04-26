import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;

  const isProtectedRoute =
    nextUrl.pathname.startsWith('/dashboard') ||
    nextUrl.pathname.startsWith('/rooms') ||
    nextUrl.pathname.startsWith('/api/connection-details') ||
    nextUrl.pathname.startsWith('/api/record') ||
    nextUrl.pathname.startsWith('/api/rooms');
  
  if (isProtectedRoute && !isLoggedIn) {
    const signInUrl = new URL('/signin', nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};