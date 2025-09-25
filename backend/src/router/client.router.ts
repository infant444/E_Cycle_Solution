import { Router, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import { pool } from "../config/postgersql.config";
import { ClientModel } from "../model/client.model";
import auth from "../middleware/auth.middleware";
const rout = Router();
rout.use(auth);
rout.get("/getAll", asyncHandler(
    async (req: any, res, next: NextFunction) => {
        const clients = await pool.query(`select * from client`,);
        res.status(200).json(clients.rows);
    }
))

rout.post("/addClient", asyncHandler(

    async (req, res, next: NextFunction) => {
        const { name, email, type, contact_number, address, website, contact_person,special_instruction } = req.body;
        try {
            const client = await pool.query(
                `INSERT INTO client(name, type, email, contact_number, address, website,contact_person,special_instruction)
   VALUES ($1, $2, $3, $4, $5, $6,$7,$8)
   RETURNING *`,
                [name, type, email, contact_number, address, website, contact_person,special_instruction]
            );

            res.json(client.rows[0])
        } catch (e) {
            next(e);
        }
    }
));

rout.get("/get/:clientId", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const client = await pool.query("select * from client where id=$1", [req.params.clientId]);
            res.json(client.rows[0]);
        } catch (e) {
            next(e);
        }
    }
))

rout.put("/update/:clientId", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { name, email, type, contact_number, address, website, contact_person,special_instruction } = req.body;
            const client = await pool.query(
                `UPDATE client 
   SET name = $1,
       type = $2,
       email = $3,
       contact_number = $4,
       address = $5,
       website = $6,
       contact_person = $7,
       special_instruction=$8
   WHERE id = $9
   RETURNING *`,
                [name, type, email, contact_number, address, website, contact_person, special_instruction, req.params.clientId]
            );

            res.json(client.rows[0]);

        } catch (e) {
            next(e);
        }
    }
))

rout.delete("/delete/:id",asyncHandler(
    async(req,res,next:NextFunction)=>{
        try{
            const result=await pool.query("delete from client where id=$1 RETURNING *",[req.params.id,]);
            res.json(result);
        }catch(err){
            next(err);
        }
    }
))

export default rout;
