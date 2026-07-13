import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
 
const  connectDB = async ()=>{
    try{
  const connectionInstence = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
  console.log(`\n mongodb connection !! HOST ${connectionInstence.connection.host}`)

    }
    catch (error){
     console.log("error in loadig page, error");
     process.exit(1);
    }

}
export default connectDB;

