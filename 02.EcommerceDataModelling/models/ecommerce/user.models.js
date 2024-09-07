import mongooose from "mongoose"

const UserSchema = new monggose.Schema(
     {
          username:{
               type:String,
               require:true,
               unique:true,
               lowecase:true,

          },
          email:{
             type:String,
             require:true,
             unique:true,
             lowecase:true,
            
          },
          password:{
               type:String,
               require:true,
          }

     },
     {timestamps:true})

export const User = mongooose.model("User", useSchema);




// const mongooose = require("mongoose")


