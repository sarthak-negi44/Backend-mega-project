// USED TO FIND IS THERE USER OR NOT
import {asyncHandler} from "../utils/asyncHandler.js"

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request"
            })
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken._id).select("-password -refreshToken")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid access token"
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.error("Error while verifying JWT:", error)
        return res.status(401).json({
            success: false,
            message: "Invalid access token"
        })
    }
}) 