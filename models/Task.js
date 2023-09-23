//schema

import mongoose from "mongoose";

const Schema=new mongoose.Schema({
        title:{
        type:String,
        requred:true
    },
    description:{
        type:String,
        required:true 
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    users:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})


const Task=mongoose.model("Task",Schema);





export default Task;

