import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    if (err && err instanceof Error) console.error(`Error: ${err.message}`);
    else console.error("Error connecting with MongoDB");

    process.exit(1);
  }
}
