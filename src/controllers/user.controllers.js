import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import User from "../models/user.model.ts"
import {uploadCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
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
// console.log("email:", email);
if(!fullName || !email || !username || !password){
    throw new ApiError(400, "All fields are required")
}
const existingUser = await User.findOne({$or: [{email: email.toLowerCase()}]})
if(existingUser){
    throw new ApiError(409, "User detail already exists")
}
let avatarLocalPath = req.files.avatar[0]?.path
let converImage;
if(req.files.coverImage && req.files.coverImage.length > 0){
    converImage = req.files.coverImage[0]?.path
}
if(!avatarLocalPath)
{
    throw new ApiError(400, "Avatar is required")
}
const avatar = await uploadCloudinary(avatarLocalPath)
const coverImage = await uploadCloudinary(converImage)
if(!avatar ){
        throw new ApiError(400, "Avatar upload failed")
    }
   const user = await User.create({
    fullName,
    email: email.toLowerCase(),
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || null
   })
   const createdUser = await User.findById(user._id).select("-password -refreshTokens")  // THIS WILL NOT NOT SAVE PASSWORD AND REFRESHTOKENS IN THE RESPONSE
    if(!createdUser) {
        throw new ApiError(500, "User creation failed")
    }
    return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"))
}
)

export {registerUser}