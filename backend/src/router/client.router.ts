import { Router, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import { pool } from "../config/postgersql.config";
import { ClientModel } from "../model/client.model";
const rout = Router();

rout.get("/getAll", asyncHandler(
    async(req,res,next:NextFunction)=>{
        const clients=await pool.query(`select * from client`,);
        // const clientInfo:ClientModel[]=[]
        // for (let i=0;i<clients.rows.length;i++){
        //     const clientX=clients.rows[i];
        //     const dataModel:ClientModel={
        //         id: clientX.id,
        //         name: clientX.name,
        //         email: clientX.email,
        //         type: clientX.type,
        //         contactNumber: clientX.contactNumber,
        //         contactPerson: clientX.contactPerson||'',
        //         address: clientX.address||'',
        //         website: clientX.website||'',
        //         noProject: clientX.noProject||'',
        //         totalCollection: clientX.totalCollection||0,
        //         value: clientX.value||0,
        //         isCurrentProject: false,
        //         currentProject: clientX.currentProject||'',
        //         lastCollectionDate: clientX.lastCollectionDate||'',
        //         specialInstruction: clientX.specialInstruction||''
        //     }
        //     clientInfo.push(dataModel);
        // }
        // res.status(200).send(clientInfo);
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
