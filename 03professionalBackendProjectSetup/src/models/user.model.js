import { Schema } from "mongoose";
import mongoose, {Schema} from "mongoose";


const userSchema = new Schema(
     {
     username:{
      type:String,
      required:true,
      unique:true,
      lowecase:true,
      trim:true,
      index:true, //It is optimizible typed by indexing
     },
     email:{
     type:String,
     required:true,
     unique:true,
     lowecase:true,
     trim:true,

     },
     fullName:{
     type:String,
     required:true,
     trim:true,
     index:true,
     },
     avatar:{
      type:String,// cloudinary url
      required:true,
     },
     coverImage:{
      type:String,
     },
     watchHistory:[{
      type : Schema.Types.ObjectId,
      ref:"Video"
     }
     ],
     password:{
     type:String,
     required:[true,'Password is requied']
     },
     refreshToken:{
     type:String,

     }

},
{timestamps:true});

export const User = mongoose.model("User",userSchema);