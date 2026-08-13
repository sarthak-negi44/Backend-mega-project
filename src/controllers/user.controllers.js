import asyncHandler from "../utils/asyncHandler.js"
const registerUser = asyncHandler(async (req, res) =>{
    // get user data form frontend
    // validation - not empty, email format, password length
    // check if user already exists in db: with email and username
    // check for images and avatar
    // upload images to cloudinary
    // creqte user object - create entry in db
    // remove password and refreshTokens from user object before sending response
    // check for the user creation
    // return response to frontend with user object and success message
res.status(200).json({
    message: "ok"
})
})

export {registerUser}