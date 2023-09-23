import express from "express";
import userRouter from './routes/user.js'
import taskRouter from './routes/Task.js'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middleware/error.js";
import cors from 'cors'


export const app=express();
dotenv.config({
    path:'./db/config.env'
});




app.use(express.json());
app.use(cookieParser());
app.cors(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","PUT","DELETE","POST"],
    credentials:true
}))



app.use("/users",userRouter);
app.use("/tasks",taskRouter)


//using error middleware
app.use(errorMiddleware);













