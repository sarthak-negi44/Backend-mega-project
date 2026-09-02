// USED TO FIND IS THERE USER OR NOT
import asyncHandler from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import User from "../models/user.model.ts"
export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
           throw new ApiError(401, "Access token is missing")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken.id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }
        req.user = user
        next()
    } catch (error) {
        console.error("Error while verifying JWT:", error)
        throw new ApiError(401, "Invalid access token")
    }
}) 