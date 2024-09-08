import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
  },
  passwordHash: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String, // Assuming it's a URL to the picture
    required: true,
  },
  bio: {
    type: String,
    required: true,
    minlength: [10, "Bio must be at least 10 characters long"],
    maxlength: [100, "Bio cannot exceed 100 characters"],
  },
}, { timestamps: true });

export const User =  mongoose.model('User',userSchema);
