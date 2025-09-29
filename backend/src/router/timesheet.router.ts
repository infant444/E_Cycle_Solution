import { NextFunction, Router } from "express";
import asyncHandler from "express-async-handler";
import { pool } from "../config/postgersql.config";
import auth from "../middleware/auth.middleware";
const rout = Router();
rout.use(auth);
// Post
rout.post("/add", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { staff, task, project, task_name, project_name, description, date, start_time, end_time, total_hours, status } = req.body;
            const result = await pool.query("insert into timesheet (staff,task,project,task_name,project_name,description,date,start_time,end_time,total_hours,status) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) returning *", [staff, task, project, task_name, project_name, description, date, start_time, end_time, total_hours, status])
            const taskX = await pool.query(`select * from task where id=$1`, [task,]);
            if (taskX.rowCount != null && taskX.rowCount > 0) {
                const actual = parseInt(((parseInt(total_hours) / 3600) + parseInt(taskX.rows[0].actual_time)).toString());
                var complete = (actual / parseInt(taskX.rows[0].estimate_time)) * 100;
                complete = complete > 100 ? 100 : complete;
                const statusX = complete < 100 ? 'processed' : 'completed';
                await pool.query('update task set actual_time=$1,complete_time=$2,status=$3 where id=$4', [actual, complete, statusX, task]);
                if (statusX == 'completed') {
                    const projectX = await pool.query("select * from project where id=$1", [project]);
                    const task_count = parseInt(projectX.rows[0].no_task || 0);
                    const complete_task = parseInt(projectX.rows[0].complete_task ||0) + 1;
                    const score = (complete_task / task_count) * 100;
                     if (score == 100) {
                    await pool.query("update project set no_task=$1,completed_task=$2,level_complete=$3,status=$4 where id=$5 ", [task_count, complete_task, score, "completed", project]);
                } else {
                    await pool.query("update project set no_task=$1,completed_task=$2,level_complete=$3,status=$4 where id=$5 ", [task_count, complete_task, score, "processed", project]);
                }
                }
            }
            res.json(result.rows);
        } catch (err) {
            next(err)
        }
    }
));
// Get
rout.get("/getAll/weak", asyncHandler(
    async (req: any, res, next: NextFunction) => {
        try {
            const { start, end } = req.query;
            const result = await pool.query("select * from timesheet where staff=$1 and date between $2 and $3 ", [req.user.id, start, end])
            res.json(result.rows);
        } catch (err) {
            next(err)
        }
    }
));
rout.get("/getAll/staff", asyncHandler(
    async (req: any, res, next: NextFunction) => {
        try {
            const result = await pool.query("select * from timesheet where staff=$1", [req.user.id])
            res.json(result.rows);
        } catch (err) {
            next(err)
        }
    }
));
rout.get("/get/:id", asyncHandler(
    async (req: any, res, next: NextFunction) => {
        try {
            const result = await pool.query("select * from timesheet where id=$1", [req.params.id])
            res.json(result.rows);
        } catch (err) {
            next(err)
        }
    }
));
rout.put("/update/:id", asyncHandler(
    async (req: any, res, next: NextFunction) => {
        try {
            const status = req.body.status;
            const result = await pool.query("update timesheet set status=$1 where id=$2 returning *", [status, req.params.id])
            res.json(result.rows);
        } catch (err) {
            next(err)
        }
    }
));
export default rout;