import { Router, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import { pool } from "../config/postgersql.config";
const rout = Router();

rout.get("/getAll", asyncHandler(
    async(req,res,next:NextFunction)=>{
        const clients=await pool.query(`select * from client`,);
        res.json(clients.rows);
    }
))
rout.post("/addClient", asyncHandler(

    async (req, res, next: NextFunction) => {
        console.log("AJ");
        const { name, email, type, contactNumber, address, website ,contactPerson} = req.body;
        try {
            const client = await pool.query(
                `INSERT INTO client(name, type, email, contactNumber, address, website,contactPerson)
   VALUES ($1, $2, $3, $4, $5, $6,$7)
   RETURNING *`,
                [name, type, email, contactNumber, address, website,contactPerson]
            );
            // console.log(client.rows[0])

            res.json(client.rows[0])
        } catch (e) {
            next(e);
        }
    }
))

export default rout;
