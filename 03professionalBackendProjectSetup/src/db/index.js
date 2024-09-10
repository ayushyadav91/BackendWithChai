import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


// Corrected environment variable name
// const URI = process.env.MONGODB_URI;

// const connectDB = async () => {
//   try {
//     await mongoose.connect(URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error', error);
//     process.exit(1);
//   }
// };

 const connectDB = async () => {
  try {
   const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`MongoDB connected successfully ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error', error);
    process.exit(1);
  }
}; 

export default connectDB;
