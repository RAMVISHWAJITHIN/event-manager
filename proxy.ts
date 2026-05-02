import { auth } from '@/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';


function isServerActionPost(request:NextRequest){
  if(request.method!=="POST") return false;
  const h=request.headers;
  return Boolean(h.get("Next-action") ?? h.get("next-action)"))
}



export async function proxy(request: NextRequest) {
  if(isServerActionPost(request)){
    return NextResponse.next();
  }
  return auth.middleware({
    loginUrl: "/auth/sign-in",
  })(request);
}


// 
export const config = {
  matcher: [
    // Protected routes requiring authentication
    '/account/:path*',
     "/dashboard/:path*",
     "/events/:path*" 
  ],
};