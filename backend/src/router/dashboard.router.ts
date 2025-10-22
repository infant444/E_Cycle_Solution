import { NextFunction, Router } from "express";
import asyncHandler from "express-async-handler";
import { pool } from "../config/postgersql.config";
import auth from "../middleware/auth.middleware";
const rout = Router();

rout.get("/get/states", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const dateX = new Date().toISOString().split('T')[0];

            const userCount = await pool.query(`select count(*) as uc from staff where lock=false`, []);
            const todayWork = await pool.query(`select sum(total_hours) as tw from timesheet where date=$1`, [dateX]);
            const inventoryItem = await pool.query(`SELECT SUM(quantity) AS ii FROM products WHERE stock_in_date >= (CURRENT_DATE - INTERVAL '1 month');`);
            const inventoryValue = await pool.query(`SELECT SUM(total_value) AS iv FROM products WHERE stock_in_date >= (CURRENT_DATE - INTERVAL '1 month');`);
            const totalClient = await pool.query(`select count(*) as tc from client where is_current_project=true`, []);
            const processedProject = await pool.query(`select count(*) as pp from project where status=$1`, ['processed'])
            const dashboardData = {
                totalUsers: userCount.rows[0].uc || 0,
                todayWorkHours: todayWork.rows[0].tw || 0,
                inventoryItemsLastMonth: inventoryItem.rows[0].ii || 0,
                inventoryValueLastMonth: inventoryValue.rows[0].iv || 0,
                totalClients: totalClient.rows[0].tc || 0,
                processedProjects: processedProject.rows[0].pp || 0
            };
            res.send(dashboardData)
        } catch (err) {
            next(err);
        }
    }
));
rout.get("/get/task-status", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const result = await pool.query(`select status,count(*) as count from task group by status`, []);
            res.json(result.rows);
        } catch (err) {
            next(err)
        }
    }
));
rout.get("/get/client-group", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const result = await pool.query(`select type,count(*) as count from client group by type`, []);
            res.json(result.rows);
        } catch (err) {
            next(err);
        }
    }
));
rout.get("/get/inventory", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const result = await pool.query(`select status,count(*) as count from inventory group by status`, []);
            res.json(result.rows);
        } catch (err) {
            next(err);
        }
    }
));
rout.get("/get/recent-inventory",asyncHandler(
    async(req,res,next:NextFunction)=>{
        try{
        const result = await pool.query(`SELECT * FROM products WHERE updated_at IS NOT NULL ORDER BY updated_at DESC LIMIT 5`,[]);
         res.json(result.rows);
        } catch (err) {
            next(err);
        }
    }
));
rout.get("/get/recent-client",asyncHandler(
    async(req,res,next:NextFunction)=>{
        try{
        const result = await pool.query(`SELECT * FROM client WHERE updated_at IS NOT NULL ORDER BY updated_at DESC LIMIT 5`,[]);
         res.json(result.rows);
        } catch (err) {
            next(err);
        }
    }
));
rout.get("/get/recent-pending-timeSheet",asyncHandler(
    async(req,res,next:NextFunction)=>{
        try{
        const result = await pool.query(`SELECT * FROM timesheet WHERE updated_at IS NOT NULL AND status='pending' ORDER BY updated_at DESC LIMIT 5`,[]);
         res.json(result.rows);
        } catch (err) {
            next(err);
        }
    }
));
export default rout;