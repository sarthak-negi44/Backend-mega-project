import {Schema, Types, model, models, Document} from "mongoose";
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
  
},
{
    timestamps: true
}
)
let video = models.video || model<Ivideo>("video", videoSchema);
export default video ;