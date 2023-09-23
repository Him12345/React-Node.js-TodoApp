//connnection

import mongoose from "mongoose";
import dotenv from  'dotenv'


dotenv.use
const dbconnection=()=>{mongoose.connect(process.env.MONGO_URI,{
    
dbName:"dbbackend"

}).then(()=>{console.log("database connected")}).catch((e)=>{console.log(e)});
}



export default dbconnection