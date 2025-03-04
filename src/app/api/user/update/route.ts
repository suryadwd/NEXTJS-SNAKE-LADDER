// import { NextResponse, NextRequest } from "next/server";
// import bcrypt from "bcryptjs";
// import User from "@/models/User.model";
// import { dbConnect } from "@/lib/dbConnect";

// export async function  PUT(req: NextRequest) {

//     try {
      
//       await dbConnect();

//       //exttract user id from middleware
//       const userId = req.headers.get("user");

//       if(!userId) return NextResponse.json({message: "Unauthorized"},{status: 401});
      
//       //get data to update the data from requset body
//       const {username, email, password, gender} = await req.json();

//       //get the user by id from the database
//       const user = await User.findById(userId);

//       if(!user) return NextResponse.json({message: "User not found"},{status: 404});

//       //update the user data

//       if(username) user.username = username;
//       if(email) user.email = email;
//       if(gender) user.gender = gender;
      

//       if(password) {
//         const hashPass = await bcrypt.hash(password, 10);
//         user.password = hashPass;
//       }

//       //save the updated user data
//       await user.save();

//       return NextResponse.json({success: true, message: "User updated", data: user},{status: 200});


//     } catch (error:any) {
//       return NextResponse.json({message: error.message},{status: 500});
//     }

// }

import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User.model";
import { dbConnect } from "@/lib/dbConnect";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function PUT(req: NextRequest) {
    try {
        await dbConnect();
       
        const token = cookies().get("jwt")?.value; // Get JWT from cookies

        if (!token) return NextResponse.json({ message: "no token in the update route" }, { status: 401 });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
        const userId = decoded._id;

        console.log(userId)

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Get user data from request body
        const { username, email, password, gender } = await req.json();

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Update user data
        if (username) user.username = username;
        if (email) user.email = email;
        if (gender) user.gender = gender;

        if (password) {
            const hashPass = await bcrypt.hash(password, 10);
            user.password = hashPass;
        }

        // Save updated user
        await user.save();

        return NextResponse.json(
            { success: true, message: "User updated", data: user },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
