import mongoose, {Schema, model, Document} from "mongoose";
import {Types} from "mongoose";
import  jwt from "jsonwebtoken";
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
    trim: true,

  },
  refreshToken:{
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password:{
    type: String,
    required: true,
  },
  converter:{
    type: String,
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


  },
},
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
)
UserSchema.pre<IUser>("save", async function () {
    if (!this.isModified("password")) {
        return ;
    }
    this.password = await bcrypt.hash(this.password, 10);
    
});
    UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
    UserSchema.methods.generateAccessToken = function (): string {
      return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
     
    };
    UserSchema.methods.generateRefreshToken = function (): string {
      return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });
    };
 
const User = mongoose.models.User || model<IUser>("User", UserSchema);
export default User;