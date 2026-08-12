import dns from "dns";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Force Node.js to use Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("MONGO_URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is undefined. Check your .env file!");
    }

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB connected !! HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;