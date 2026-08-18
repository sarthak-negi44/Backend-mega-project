import asyncHandler from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import User from "../models/user.model.ts"
import {uploadCloudingary} from "../utils/cloudinary.js"
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
console.log("email", email);
if(!fullName || !email || !username || !password){
    throw new ApiError(400, "All fields are required")
}
const existingUser = await User.findOne({$or: [{email}, {username}]})
if(!existingUser){
    throw new ApiError(400, "User detail already exists")
}
const avatarLocalPath = req.files.avatar[0]?.path
const converImage = req.files.coverImage[0]?.path
if(!avatarLocalPath)
{
    throw new ApiError(400, "Avatar is required")
}
const avatar = await uploadCloudingary(avatarLocalPath)
const coverImage = await uploadCloudingary(converImage)
if(!avatar ){
        throw new ApiError(400, "Avatar upload failed")
    }
    user.create({fullName, email, username, password, avatar, coverImage}).then((user) => {   // create user in db
        res.status(201).json({
            message: "User created successfully",
            user: {
                fullName: user.fullName,
                email: user.email,
                username: user.username.toLowerCase(),     // THERE CAN BE AN ERROR  FOR USER AVATAR AND COVERIMAGE THE CODE USED TO UPLAOD THE IMAGE 
                avatar: user.avatar.url,
                coverImage: user.coverImage?.url  || null,
            }
            
        });
    })
    const createdUser = await User.findById(user._id).select("-password -refreshTokens")  // THIS WILL NOT NOT SAVE PASSWORD AND REFRESHTOKENS IN THE RESPONSE
    if(!createdUser) {
        throw new ApiError(500, "User creation failed")
    }
    return res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"))
}
)

export {registerUser}