import { Router,NextFunction } from "express";
import asyncHandler from 'express-async-handler';

const rout=Router();


rout.get("/staff",asyncHandler(
    async(req,res,next:NextFunction)=>{
        
    }
))
export default rout;