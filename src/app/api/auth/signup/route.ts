
// NextRequest, NextResponse are the same as req res in express
import { NextRequest, NextResponse } from "next/server"; 
// password hashing ke liye
import bcrypt from "bcryptjs";

import User from "@/models/User.model";
import { dbConnect } from "@/lib/dbConnect";

import { generateTokenAndSetCookies } from "@/lib/auth"; 
import { em } from "framer-motion/client";


//Sign in API

export async function POST(req: NextRequest) {

  try {
    await dbConnect();

    const { email, password, username, gender } = await req.json();

    if (!email ||  !username || !gender) return NextResponse.json({message: "Please provide all fields"}, {status: 400});
  
    if(password.length < 6 || !password ) return NextResponse.json({message: "Password must be at least 6 characters long"}, {status: 400});

    // check whether user exist or not
    const existingUser = await User.findOne({email});

    // if user already exist, then return error
    if (existingUser) return NextResponse.json({message: "User already exists"}, {status: 400});

    // hash the password
    const hashPass = await bcrypt.hash(password, 10);

    // create new user

    const image = gender === "male" ? "/male.png" : "/female.png";
    
    const newUser = await new User({ email, username, password: hashPass, gender, image})

    await newUser.save();
    
    console.log(email, password, username, gender, image);
    console.log("Saved User:", newUser);
    // generate token and set cookies

    const payload = {_id: newUser._id}

    const response = NextResponse.json({ success: true, message: "User registered", data: newUser });

    generateTokenAndSetCookies(payload, response);

    return response;

  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 500});
  }

}