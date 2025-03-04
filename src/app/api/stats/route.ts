import { NextResponse } from "next/server";
import User from "@/models/User.model";
import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    const count = await User.countDocuments(); // Get total users
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user count:", error);
    return NextResponse.json({ error: "Failed to fetch user count" }, { status: 500 });
  }
}
