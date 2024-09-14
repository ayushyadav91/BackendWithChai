import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: './env' });

connectDB() /*we right db asynconous method so async return  promise
mean async jub bhi complete hota hai to ek promise return karta hai kaffi code bases me dekhne ko milega*/
.then(()=>{
     app.on("error",(error)=>{
          console.log("error:",error);
          throw error
     })
     app.listen(process.env.PORT || 8000,()=>{
  console.log(`Server is running at port : Server is running at port ${process.env.PORT}`);
 })
}).catch((error)=>{
     console.log("Mongo db connection failed !!!", error)
})




// import express from "express"
// const app = express();

// ;(async ()=>{

// })