import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import User from "../models/user.model.ts"
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
const {fullName, email, username, password} = req.body
console.log("email", email);
if(!fullName || !email || !username || !password){
    throw new ApiError(400, "All fields are required")
}
User.findOne({$or: [{email}, {username}]}).then((error) => {
    if(error){
        throw new ApiError(400, "User already exists")
    }
})
})


export {registerUser}