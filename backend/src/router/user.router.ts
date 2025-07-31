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
                await pool.query('UPDATE staff set login_time=$1,isLogin=$2,updatedAt=$3 where id=$4', [now, true, now, user.rows[0].id]);
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

// rout.post("/add", asyncHandler(

//     async (req, res, next: NextFunction) => {
//         console.log("AJ");
//         const { name, email, type, contactNumber, address, website } = req.body;
//         try {
//             const client = await pool.query(
//                 `INSERT INTO client(name, type, email, contactNumber, address, website)
//    VALUES ($1, $2, $3, $4, $5, $6)
//    RETURNING *`,
//                 [name, type, email, contactNumber, address, website]
//             );
//             console.log(client.rows[0])

//             res.json(client.rows[0])
//         } catch (e) {
//             next(e);
//         }
//     }
// ));


export default rout;