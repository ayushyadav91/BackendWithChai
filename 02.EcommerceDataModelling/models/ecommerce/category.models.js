import mongooose from "mongoose"

const categorySchema =  new mongooose.Schema({
    name:{
type:String,
require:true,
    },



},{timestamps:true})

export const Category = mongooose.model("Category",categorySchema);