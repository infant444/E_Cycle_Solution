import { NextFunction, Router } from "express";
import asyncHandler from 'express-async-handler';
import { pool } from "../config/postgersql.config";
import { User } from "../model/user.model";
import { generateUserToken } from "../middleware/jwt.middleware";
const rout = Router();


rout.post("/login", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const query = 'SELECT * FROM staff WHERE email = $1';
            const user = await pool.query(query, [email]);
            if (!user.rows[0]) {
                next({
                    status: 400,
                    message: "No user found!"
                });
                return;
            }
            if (user.rows[0].password == password) {
                const now = new Date().toISOString();
                await pool.query('UPDATE staff set login_time=$1,is_login=$2,updatedAt=$3 where id=$4', [now, true, now, user.rows[0].id]);
                 res.send(generateUserToken(user.rows[0]))
                return;
            }
            next({
                status: 400,
                message: "Password wrong"
            });

        } catch (e) {
            next(e);
        }
    }
));

rout.get("/getAll",asyncHandler(
    async(req,res,next:NextFunction)=>{
        try{
            const staff=await pool.query("select * from staff");
            res.send(staff.rows);
        }catch(err){
            next(err);
        }
    }
))

rout.post("/get-data/project-member", asyncHandler(
    async (req, res,next:NextFunction) => {
        try{
  const { ids } = req.body;
  const placeholders = ids.map((_: any, i:any) => `$${i + 1}`).join(',');
  const query = `SELECT * FROM staff WHERE id IN (${placeholders})`;
  const result = await pool.query(query, ids);
  res.json(result.rows);
        }catch(e){
            next(e)
        }
}));

rout.get("/getById/:id",asyncHandler(
    async(req,res,next:NextFunction)=>{
        const result=await pool.query("SELECT * FROM staff WHERE id=$1",[req.params.id,]);
        res.json(result.rows[0])
    }
))

export default rout;