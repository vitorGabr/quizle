import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const config = {
  matcher: ["/api/generate", "/api/revalidate"],
};

export default async function middleware(request: NextRequest) {
  const authorization = request.headers.get("Authorization");

  if (authorization !== process.env.AUTHORIZATION) {
    return Response.json(
      { success: false, message: "authentication failed" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}
