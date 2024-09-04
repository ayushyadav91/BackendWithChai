import mongoose from "mongoose"

//Schema kya hai schema ek method hai jo leta hai object

const userSchema = new mongoose.Schema({

     ussername : {
     type:String,
     required:true,
     unique:true,
     lowercase:true,
     },
     email:{
          type:String,
          required:true,
          unique:true,
          lowercase:true,
     },
     password:{
          type:String,
          required:true,
          min: [6, 'min 6 are reequired'],
          max:12,
     }


}, { timestamps: true })

export const User =  mongoose.model("User" , userSchema)