import { app } from "./app.js";
import dbconnection from './db/dbconnection.js'




dbconnection();



app.listen(process.env.PORT,()=>{
    console.log(`Server is working on port:${process.env.PORT}`);

})