
// NextRequest, NextResponse are the same as req res in express
import { NextRequest, NextResponse } from "next/server"; 
// password hashing ke liye
import bcrypt from "bcryptjs";

import User from "@/models/User.model";
import { dbConnect } from "@/lib/dbConnect";

import { generateTokenAndSetCookies } from "@/lib/auth"; 



// Login api


export async function POST(req: NextRequest) {

  try {
    
    await dbConnect();

    const { email, password } = await req.json();

    if (!email || !password) return NextResponse.json({message: "Please provide email and password"}, {status: 400});

    // check whether user exist or not

    const user = await User.findOne({email});

    // if user not exist, then return error
    if (!user) return NextResponse.json({message: "User not found"}, {status: 404});

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    // if password not match, then return error
    if (!isMatch) return NextResponse.json({message: "Invalid credentials"}, {status: 401});

    const payload = {_id: user._id}

    const response = NextResponse.json({ success: true, message: "User logged in", data: user });
    generateTokenAndSetCookies(payload, response);

    return response;

  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }

}