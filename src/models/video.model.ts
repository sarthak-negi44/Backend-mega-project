import mongoose,{Schema, Types, model, Document} from "mongoose";
import mongooseAutoPopulate from "mongoose-aggregate-paginate-v2";
export interface Ivideo extends Document{
     videoFile : String;
     thumbNail : String;
     owner: Types.ObjectId;
     title : String;
     description : String;
     duration :number;
     views : number;
     isPublished: boolean;
     createAt: Date;
     updatedAt : Date;
}
 const videoSchema = new Schema<Ivideo>(
    {
  videoFile:{
    type: String,
    required: true,

  },
  thumbNail:{
    type: String,
    required: true,
    
  },
  title:{
    type: String,
    required: true,
    
  },
  description:{
    type: String,
    required: true,
    
  },
  duration:{
    type: Number,
    required: true,
    
  },
  views:{
    type: Number,
    default: 0,
    
  },
  isPublished:{
    type: Boolean,
    default: true,
    
  },
  owner:{
    type: Schema.Types.ObjectId,
    required: true,
    
  }
},
{
    timestamps: true
}
)
videoSchema.plugin(mongooseAutoPopulate);
let video = mongoose.models.video || model<Ivideo>("video", videoSchema);
export default video ;