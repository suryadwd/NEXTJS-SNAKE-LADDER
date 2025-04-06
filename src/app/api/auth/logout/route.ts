
// NextRequest, NextResponse are the same as req res in express
import { NextResponse } from "next/server"; 


// Logout api

export async function GET() {

  try {
    const response = NextResponse.json({ success: true, message: "User logged out" });
    response.cookies.set("jwt", "", {maxAge: 0});
    return response;
  } catch (error:unknown) {
    return NextResponse.json({message: error}, {status: 500});
  }

}