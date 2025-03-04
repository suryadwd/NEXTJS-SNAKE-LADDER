
// NextRequest, NextResponse are the same as req res in express
import { NextRequest, NextResponse } from "next/server"; 


// Logout api

export async function GET(req: NextRequest) {

  try {
    const response = NextResponse.json({ success: true, message: "User logged out" });
    response.cookies.set("jwt", "", {maxAge: 0});
    return response;
  } catch (error:any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }

}