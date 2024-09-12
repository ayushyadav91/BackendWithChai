import mongoose, {schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema (
     {
     videoFile:{
      type:Sting ,//cloudinary url
      required:true,
     },
     thumbnail:{
      type:String,//cloudinary url
      required:true,
     },
     owner:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User"
     },
     title:{
     type:String,
     required:true,
     },
     description:{
     type:String,
     required:true,
     },
     duration:{
     type:Number,
     required:true,
     },
     views:{
     type:Number,
     default:0,
     },
     isPublished:{
     type:Boolean,
     default:true
},
     }
,{timestamps:true});

/* moggose ka aggration pippeline yahi mongoose ko baht powerfull and  batnata hai ya kaffi 
bad me introduce hua tha to is plugin ke sath use karte hai
means ye dekho kon kon se plugins hote hai unka kya use hota hai kaise use karte hai

*/

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video",videoSchema);
