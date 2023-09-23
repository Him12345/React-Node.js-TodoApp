
import Errorhandler from "../middleware/error.js";
import Task from "../models/Task.js"

export const newTask=async(req,res,next)=>{

    const {title,description}=req.body;
    
   const createdTask= await Task.create({title,description,users:req.user});


   res.status(201).json({success:true,message:"Task added successfully"});

}



export const getMyTask=async(req,res,next)=>{

  

    try {

        const userid=req.user._id;

        const tasks=await Task.find({users:userid});
    
    
        res.status(200).json({success:true,tasks});


        
    } catch (error) {
        console.log(error);
    }



}


export const updateTask=async(req,res,next)=>{

  

    try {

        const task=await Task.findById(req.params.id);

        if(!task){
            return next(new Errorhandler("Invalid id",404));
            
         }

        task.isCompleted=!task.isCompleted;

        await task.save();

    
    
        res.status(200).json({
            
            success:true,
            message:"Task Updated!"
        });


        
    } catch (error) {
        console.log(error);
    }



}

export const deleteTask=async(req,res,next)=>{

  

    try {

        const task=await Task.findById(req.params.id);
        if(!task){
           return next(new Errorhandler("Task not found",404));

        }

        await task.deleteOne();


     
    
        res.status(200).json({
            
            
            success:true,
            message:"Task Deleted!"
          
         });


        
    } catch (error) {
        console.log(error);
    }



}