import mongoose from "mongoose"

const subTodoSchema = new mongoose.Schema({
content:{
     type:String,
     require:true,
},
complete :{
 type:Boolean,
 default:false,
},

//here we are take reference of User that created Todo
createdBy:{
     type:mongoose.Schema.Type.ObjectId,
     ref:"User",
}

},{timestamps:true});

export const subTodo = mongoose.model("subTodo", subTodoSchema)