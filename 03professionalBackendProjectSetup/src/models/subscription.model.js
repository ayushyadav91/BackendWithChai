import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber:{
        type:mongoose.Schema.Types.ObjectId,//One who is subscribing
        ref:"User",
        required:true
    },
    channel:{
        type:mongoose.Schema.Types.ObjectId,//One who is being subscribed
        ref:"User",
        required:true
    }
},{timestamps:true});


const Subscription = mongoose.model("Subscription",subscriptionSchema);
module.exports = Subscription; 