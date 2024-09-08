import mongoose from 'mongoose';

// Define the schema for the followers
const followersSchema = new mongoose.Schema({
  followerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the User model
    required: true,
  },
  followeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencing the User model
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
}, { timestamps: true });

// Add an index to ensure a user can only follow another user once
followersSchema.index({ followerId: 1, followeeId: 1 }, { unique: true });

// Export the Followers model
export const Followers = mongoose.model('Followers', followersSchema);
