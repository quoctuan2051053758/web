import express from "express";
import bodyParser from "body-parser";
import initWebRouter from './route/web';
import viewEngine from "./configs/viewEngine";
import connectDB from "./configs/connectDB";
// import mongoose from 'mongo'
import cors from "cors"
require('dotenv').config();

let app=express();
// app.use(cors({ credentials: true, origin: true }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

viewEngine(app);

initWebRouter(app);

connectDB()

let port=process.env.PORT||6969;

app.listen(port,()=>{
    console.log("backendaskndaksl"+ port);
})
