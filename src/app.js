import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    //not necessary to define origin but used in production
    credentials:true
}))

//to convert frontend data to js objects since it sends json objects and limiting the size of json
app.use(express.json({limit:"16kb"}))
//url ka apna bhi encoder hota h to uski bhi express ko bolna padega ki smjho usko
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))
//public assets folder to store some files
app.use(cookieParser())

//routes

import userRouter from './routes/user.routes.js'
//routes declaration
app.use("/api/v1/users",userRouter)
//http://loaclhost:8000/api/v1/users/register








export {app}