import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextResponse } from "next/server";

dotenv.config();

interface Payload {
  _id : string;
}


export const generateTokenAndSetCookies = (payload: Payload, res: NextResponse): void =>{

  if(!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined');

  const token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: '15d'});

  res.cookies.set("jwt", token, {maxAge:15*24*60*60*1000, httpOnly: true});

}