

// import { NextRequest, NextResponse } from "next/server";
// import jwt, { JwtPayload } from "jsonwebtoken";

// interface DecodedToken extends JwtPayload {
//     userId: string;
// }

// export async function middleware(req: NextRequest) {
//     const authHeader = req.headers.get("Authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return NextResponse.json(
//             { message: "Unauthorized: Token missing" },
//             { status: 401 }
//         );
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

//         if (!decoded.userId) {
//             return NextResponse.json(
//                 { message: "Unauthorized: Invalid token" },
//                 { status: 401 }
//             );
//         }

//         (req as any).user = decoded; // Temporarily add `user` to `req`

//         return NextResponse.next();
//     } catch (error) {
//         return NextResponse.json(
//             { message: "Unauthorized: Invalid token" },
//             { status: 401 }
//         );
//     }
// }


//check kr ke dekh warna upadr wala sahi he h


import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    _id: string;
}

export async function middleware(req: NextRequest) {
    // Get JWT from cookies
    const token = req.cookies.get("jwt")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized: Token missing" }, { status: 401 });
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

        if (!decoded._id) {
            return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
        }

        // ✅ Attach userId to the request headers (to be accessed in API routes)
        req.headers.set("userId", decoded._id);

        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
    }
}
