import { NextResponse, NextRequest } from "next/server";
import User from "@/models/User.model";
import { dbConnect } from "@/lib/dbConnect";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function DELETE() {
    try {
        await dbConnect();

        // Get JWT from cookies
        const token = (await cookies()).get("jwt")?.value;

        if (!token) {
            return NextResponse.json({ message: "No token provided" }, { status: 401 });
        }

        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
        const userId = decoded._id;

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Find and delete the user
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Clear the JWT cookie
        (await
            // Clear the JWT cookie
            cookies()).set("jwt", "", { expires: new Date(0) });

        return NextResponse.json({ success: true, message: "Account deleted successfully" }, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
