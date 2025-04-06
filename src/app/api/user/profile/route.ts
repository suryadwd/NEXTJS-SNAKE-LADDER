import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User.model";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.cookies.get("jwt")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized: No token found" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded || typeof decoded !== "object" || !("_id" in decoded)) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ user }, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
