import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../db/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

//steps -> input data -> validate data -> hash password -> save data to db -> return response
const registerUser = asyncHandler(async (req,res)=>{ 
      //get user details form frontend 
      //validation - not empty
      //check if user already exists : username, email
      // check for imgages, check for avatar
      //upload them to cloudinary avatr  && coudinary pe success full avatar upload hua ya nh
      //create user object - create entry in db
      //remove passwrod and refresh toekn filed for response
      // check for user ceration
      // return response

      const {fullName,email,username,password,} = req.body;
       
     //  if(!fullName || !email || !username || !password){
     //      return res.status(400).json({message:"Please fill all the fields"})
     //   }
        
     if([
          fullName, email, username, password
     ].some(item=>item.trim()=="")){
         throw new ApiError( 400, "Please fill all the fields")
     }

     const existedUser = await User.findOne({
          $or:[{username},{email}]
    })
    
    if(existedUser){
        throw new ApiError( 409, "User already exists")
    }

    //isko console.log kurke dehiye kaise kya aata hai 
   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;


   if(!avatarLocalPath ){
       throw new ApiError( 400, "Please upload avatar Avatar file is required")
     }

   const avatar =   await uploadOnCloudinary(avatarLocalPath)
   const coverImage =   await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar ){
     throw new ApiError( 400, "Avatar file is required")
    }
     
    const user = await User.create({ fullName, avatar:avatar.url,
      coverImage:coverImage?.url || "", email, username:username.toLowerCase(), password})

     const createUser =   User.findByIdAndUpdate(user._id).select("-password -refreshToken");

       if(!createUser){
           throw new ApiError( 500, "Somthing went wrong while creating user")
       }

       return res.status(201).json(
          new ApiResponse(201,createUser,"User created successfully")
       )

     
});

export {registerUser}