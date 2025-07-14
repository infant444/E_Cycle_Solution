import { NextFunction, Router } from "express";
import asyncHandler from 'express-async-handler';
import { pool } from "../config/postgersql.config";
const rout=Router();


rout.post("/login",asyncHandler(
    async(req,res,next:NextFunction)=>{
       try{
 const {email,password}=req.body;
        const query = 'SELECT * FROM staff WHERE email = $1';
    const user = await pool.query(query, [email]);
        if(!user.rows[0]){
            next({
        status:400,
        message:"No user found!"
        });
        return;
    }
    if(user.rows[0].password==password){
const now=new Date().toISOString();
    await pool.query('UPDATE staff set login_time=$1,isLogin=$2,updatedAt=$3 where id=$4',[now,true,now,user.rows[0].id]);
    console.log(user.rows[0].password)
    res.json(user.rows[0]);
    return;
    }
      next({
        status:400,
        message:"Password wrong"
        });
    
       }catch(e){
        next(e);
       }
}
))
export default rout;