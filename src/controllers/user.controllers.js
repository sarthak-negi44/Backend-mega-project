import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import User from "../models/user.model.ts"
import {uploadCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
const generateAccessandRefreshTokens = async(userId)=>
    {
    try{
  const user = await User.findById(userId)
 const accessToken = await user.generateAccessToken()
   const refreshToken = await user.generateRefreshToken()
   user.refreshTTokens = refreshToken
   await user.save({ validateBeforeSave: false })
   return {accessToken, refreshToken}
    }
    catch (error){
        console.error("Error while generating access and refresh tokens:", error)
        throw new ApiError(400, "someting went wrong while generating access and refresh token")
   
    }
}
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
const loginUser = asyncHandler(async (req, res) => {
    // req body to  get data
   // username or email
   // find the user
   // password check
   // access and refresh token
   // send cookies 
    const {email, password, username}  = req.body
    if(!(email || username)){
        throw new ApiError(400, "Enter email or username")
    }
 const user  = await User.findOne({$or: [{email: email ?.toLowerCase()}, {username: username ?.toLowerCase()}]})
 if(!user){
    throw new ApiError(404, "User not found")
 }
 console.log(email, username, password);

 const isPasswordValid = await user.comparePassword(password)
 if(!isPasswordValid){
    throw new ApiError(404, "Password is not correct")

 }

 const {accessToken, refreshToken} = await generateAccessandRefreshTokens(user._id)

const loggedInUser = await User.findById(user._id).select("-password -refreshTokens")
if(!loggedInUser){
    throw new ApiError(500, "User login failed")
}
const options = {
    httpOnly: true,
    secure: true
}
return res.status(200)
.cookie("refreshToken", refreshToken, options)
.cookie("accessToken", accessToken, options)
.json(new ApiResponse(200,
    {user: loggedInUser, accessToken, refreshToken}, "User logged in successfully"))
    
})
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $set: { refreshTokens: undefined } }, { new: true })
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, null, "User logged out successfully"))
})
export {registerUser, loginUser, logoutUser}