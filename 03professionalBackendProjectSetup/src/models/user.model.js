import { Schema } from "mongoose";
import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema(
     {
     username:{
      type:String,
      required:true,
      unique:true,
      lowecase:true,
      trim:true,
      index:true, //It is optimizible typed by indexing mean searching
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
      type : mongoose.Schema.Types.ObjectId,//edited by me
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

//Here bcrypt the passwrod
//This is the pre Hooks that is used to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
     if(!this.isModified("password")) return next();
 this.password =await bcrypt.hash(this.password,10);
 next();
});
// userSchema.statics.hashPassword = async function (password) {
//      //This is the static method that is used to hash the password before saving it to the database
//      return await bcrypt.hash(password, 10);
// }





userSchema.methods.isPasswrodCorrect = async function(password){
     return await bcrypt.compare(password, this.password)
}
// userSchema.methods.isValidPassword = async function (password) {
//      console.log(this.password);
//      return await bcrypt.compare(password, this.password);
// }




userSchema.method.generateAccessToekn = function(){
     jwt.sign({
          _id:this._id,
          email:this.email,
          username:this.username,
          fullName:this.fullName,
     },
     process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
     }
)
}
userSchema.method.generateRefreshToken = function(){
     return jwt.sign({
          _id:this._id,
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
          expiresIn:process.env.REFRESH_TOKEN_EXPIRY
     }
)
}

export const User = mongoose.model("User",userSchema);