import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../db/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";


//methods
const generateAccessAndRefreshToken = async(userId)=>{
  try{
    const user = await User.findById(userId)

    const accessToken = user.generateAccessToken()
  
    const refreshToken = user.generateRefreshToken()
  
    user.refreshToken = refreshToken
  
    await user.save({validateBeforeSave:false})


    //generate access token and refresh token
    // const accessToken = await User.findById(userId).select("-password -refreshToken").generateAccessToekn()
    // const refreshToken = await User.findById(userId).select("-password -refreshToken").generateRefreshToken()
  
    return {accessToken,refreshToken}

  }catch(error){
    console.log(error)
    throw new ApiError(500, "Something went wrong while generating access token")
  }
};

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

     const createUser =  await User.findByIdAndUpdate(user._id).select("-password -refreshToken");

       if(!createUser){
           throw new ApiError( 500, "Somthing went wrong while creating user")
       }

       return res.status(201).json(
          new ApiResponse(201,createUser,"User created successfully")
       )

     
});
const loginUser = asyncHandler(async (req,res)=>{
  // data req.body
  //username || email and password
  //valdagtion information
  //check user find one 
  //if user not found throw error
  //check password
  //if password not match throw error
  //create refresh token
  //return response
  //-- send cookies
  
  
  const {email, username,password} = req.body;
  if (!(email || username)){
       throw new ApiError(400, "Please fill all the fields")
  }
  
  const user = await User.findOne({
    $or:[{username},{email}]
  })
  if(!user){
      throw new ApiError(404, "User not found")
  }
  
  
  const isPasswordValid = await user.isPasswrodCorrect(password)
  if(!isPasswordValid){
      throw new ApiError(401, "Invalid password")
  }
  
  const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
  
  console.log(accessToken)
  console.log(refreshToken)
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
  // when have options to send the cookies with security
  const options = {
      httpOnly:true,
      secure:true,
      // sameSite:"strict",
      // maxAge:process.env.ACCESS_TOKEN_EXPIRY*1000
  }
  
  // res.cookie("refreshToken", refreshToken, {
  //     httpOnly:true,
  //     secure:true,
  //     sameSite:"strict",
  //     maxAge:process.env.REFRESH_TOKEN_EXPIRY*1000
  // })
  // res.cookie("accessToken", accessToken, {
  //     httpOnly:true,
  //     secure:true,
  //     sameSite:"strict",
  //     maxAge:process.env.ACCESS_TOKEN_EXPIRY*1000
  // })
  // return res.status(200).json(
  //     new ApiResponse(200,null,"Login Successful")
  // )
  return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options)
  .json(
      new ApiResponse(200,
        {user:loggedInUser,accessToken,refreshToken},
        "Login Successful")
  )
  
  });
  
  const logoutUser = asyncHandler(async (req,res)=>{
        User.findByIdAndDelete(req.user._id,
          {
                   $set:{
              refreshToken:undefined,
                      },
                    },
                    {
                    new:true
                  
                  }
        
        )
  
        const options = {
            httpOnly:true,
            secure:true,
        }
      return res.status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(
          new ApiResponse(200,
            {message:"Logout Successful"},
            "Logout Successful")
      )
        
  });

  const refreshAccessToken = asyncHandler(async (req,res)=>{
    const inComingreRefreshToken = req.cookies.accessToken || req.body.refreshToken
    if(!inComingreRefreshToken){
        throw new ApiError(401, "unauthorized request")
    }
    try{
        const decodedToken = jwt.verify(inComingreRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(401, "Invalid Access token")
        }
        const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)
        return res.status(200).cookie("accessToken", accessToken, {
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:process.env.ACCESS_TOKEN_EXPIRY*1000
        }).json(
            new ApiResponse(200,
                {accessToken,refreshToken},
                "Refresh Successful")
        )
    }catch(error){
        throw new ApiError(500, error?.message ||"Something went wrong while refreshing access token")
    }
  });
  
  export {registerUser,loginUser, logoutUser, refreshAccessToken}

