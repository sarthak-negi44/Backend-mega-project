import mongoose, {Schema, model, Document, models} from "mongoose";
import {Types} from "mongoose";
import  * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export interface IUser extends Document {

    username: string;
    email:string;
    fullName:string;
    avatar:string;
    converter:string;
    password: string;
    refreshToken:string;

    coverImage: string;
   watchHistory:Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
}

const UserSchema = new Schema<IUser>( 
    {
  username:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,

  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
   
  },
  fullName:{
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index:true
  },
  avatar:{
    type: String,            //Cloudinary
    required: true,
    unique: true,
    trim: true,

  },
  refreshToken:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password:{
    type: String || Number,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,

  },
  converter:{
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
   coverImage:{
    type: String,
    trim: true,
  },
  watchHistory:{
  type: Schema.Types.ObjectId,
  ref: "video",
  required:true,

  },
},
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
)
UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return ;
  this.password = await bcrypt.hash(this.password, 10)
  
})
    UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
    UserSchema.methods.generateAccessToken = function (): string {
      const payload = { _id: this._id, username: this.username, email: this.email } as Record<string, any>;
      const secret = process.env.ACCESS_TOKEN_SECRET as jwt.Secret;
      const options: jwt.SignOptions = { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN };
      return jwt.sign(payload, secret, options);
    };
    UserSchema.methods.generateRefreshToken = function (): string {
      const payload = { _id: this._id, username: this.username, email: this.email } as Record<string, any>;
      const secret = process.env.REFRESH_TOKEN_SECRET as jwt.Secret;
      const options: jwt.SignOptions = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN };
      return jwt.sign(payload, secret, options);
    };

const User = models.User || model<IUser>("User", UserSchema);
export default User;