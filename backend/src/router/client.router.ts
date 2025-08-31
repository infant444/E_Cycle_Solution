import { Router, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import { pool } from "../config/postgersql.config";
import { ClientModel } from "../model/client.model";
import auth from "../middleware/auth.middleware";
const rout = Router();
rout.use(auth);
rout.get("/getAll", asyncHandler(
    async(req:any,res,next:NextFunction)=>{
        const clients=await pool.query(`select * from client`,);
        res.status(200).json(clients.rows);
    }
))

rout.post("/addClient", asyncHandler(

    async (req, res, next: NextFunction) => {
        const { name, email, type, contact_number, address, website ,contact_person} = req.body;
        try {
            const client = await pool.query(
                `INSERT INTO client(name, type, email, contact_number, address, website,contact_person)
   VALUES ($1, $2, $3, $4, $5, $6,$7)
   RETURNING *`,
                [name, type, email, contact_number, address, website,contact_person]
            );

            res.json(client.rows[0])
        } catch (e) {
            next(e);
        }
    }
))

export default rout;
