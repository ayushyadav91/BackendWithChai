import mongoose from "mongoose"
import { subTodo } from "./sub_todo.models";

const todoSchema = new mongoose.TodoSchema({
content:{
type:String,
requied :true,
},
complete:{
     type:Boolean,
     default:false,
},
createdBy:{
     type:mongoose.Schema.Type.ObjectId,
     ref:"User",
},

//This is Array of subTodos thats very importent filed to create any web app
subTodo :[
    {
     type:mongoose.Schema.Type.ObjectId,
     ref:"subTodo",

    } 
]
},{timestamps:true});

export const Todo = mongoose.model("Todo",todoSchema)

