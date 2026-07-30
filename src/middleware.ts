import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  console.log(`Middleware: ${pathname}`);
  
  // Skip middleware for static files and API auth routes
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/api/auth') || 
      pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // Protect admin routes (except login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('token')?.value;
    
    console.log(`Token found: ${!!token}`);
    
    if (!token) {
      console.log('No token, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      // Use the API route for token verification to avoid Edge Runtime issues
      const verifyResponse = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
        headers: {
          'Cookie': request.headers.get('cookie') || '',
        },
      });
      
      if (verifyResponse.ok) {
        const { user } = await verifyResponse.json();
        console.log('Token valid via API:', user);
        return NextResponse.next();
      } else {
        console.log('Token invalid via API');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (error) {
      console.log('Auth verification error:', error instanceof Error ? error.message : String(error));
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};