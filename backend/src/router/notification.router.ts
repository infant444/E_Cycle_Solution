import { Router, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import { pool } from "../config/postgersql.config";
import auth from "../middleware/auth.middleware";
const rout = Router();
rout.use(auth);
rout.get("/getAll", asyncHandler(
    async (req: any, res, next: NextFunction) => {
        const notification = await pool.query(`select * from notifications where receiver_id=$1 order by created_at DESC`, [req.user.id]);
        res.status(200).json(notification.rows);
    }
));

rout.get("/get/notRead", asyncHandler(
    async (req: any, res, next: NextFunction) => {
        try {
            const notification = await pool.query(`select count(*) as count from notifications where receiver_id=$1 and is_read=$2`, [req.user.id, false]);
            res.status(200).json({ count: notification.rows[0].count });
            return;
        } catch (err) {
            next(err)
        }
    }
));

rout.get("/make-read/:id", asyncHandler(
    async (req: any, res, next: NextFunction) => {
        const notification = await pool.query(`update notifications set is_read=$1 where id=$2 returning *`, [true, req.params.id]);
        res.status(200).json(notification.rows[0]);
    }))
export default rout;