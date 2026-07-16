import express from 'express';
import connectDB from './config/db.js';
import cors from "cors";
import cookies from "cookies-parser";

app.use(cors({
    arigin: process.env.CORS_ORIGIN,
    Credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
const app = express();
const PORT = process.env.PORT || 5000;




export default app;