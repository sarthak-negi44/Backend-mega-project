import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"
dotenv.config({
  path: "./env"
})


connectDB()
.then(() => {
    app.listen(PORT, ()=>{
        console.log(`server is running on port ${PORT}`);
    });
    app.on('error', (error) => {
        console.log("error in server", error);
    });
    
})
.catch((error) =>{
    console.log("error to find page", error);
})
































// import mongoose, { connect } from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";

// const app = express();

//  (async () => {
    
//    try {
//      await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//      app.on("error", (error) => {
//        console.error("Error connecting to MongoDB:", error);
//        throw error;
     
//      })
//      app.listen(process.env.PORT, () => {
//        console.log(`Server is running on port ${process.env.PORT}`);
//      });
//     }

//      catch (error) {
//      console.error("Error connecting to MongoDB:", error)
//      throw error
//      }
//    })
//    ()