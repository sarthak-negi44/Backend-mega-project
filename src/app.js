import express from 'express';

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

const PORT = process.env.PORT || 5000;

//routes
import userRoutes from "../routes/user.routes.js";
app.use("/api/v1/users", userRoutes);           //HTTP//LOCLAHOST:5000/api/v1/users/register


export {app};