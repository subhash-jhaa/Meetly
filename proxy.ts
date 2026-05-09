import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export const proxy = auth((req) => {
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
    // ← KEY FIX: pass pathname only, NOT full URL with protocol
    // Full URLs get blocked by NextAuth v5 security checks
    signInUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};