import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) throw new Error("Mongo URI is missing");

// multiple connection to the same db is not allowed not happen in mern

let cached = (global as any).mongoose ||= { conn: null, promise: null };

export const dbConnect = async () => {
  try {

    if (cached.conn) return cached.conn;

    if(!cached.promise){
      cached.promise = mongoose.connect(MONGO_URI);
  }
    cached.conn = await cached.promise;
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    console.log("MongoDB connection failed");
  }
};