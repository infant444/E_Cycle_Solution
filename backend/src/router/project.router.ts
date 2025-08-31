import { NextFunction, Router } from "express";
import asyncHandler from "express-async-handler";
import { pool } from "../config/postgersql.config";
import auth from "../middleware/auth.middleware";
const rout = Router();

rout.use(auth);

rout.post("/add", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { project_name, client_id, start_date } = req.body;

            const project = await pool.query("insert into project (project_name,client_id,start_date,status,level_complete,no_task,complete_task) values ($1,$2,$3,$4,$5,$6,$7) returning *", [project_name, client_id, start_date, "pending", 0, 0, 0]);
            res.json(project.rows[0]);
        } catch (error) {
            next(error);
        }
    }
));

rout.get("/getall", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const projects = await pool.query("select * from project",);
            res.send(projects.rows);
        } catch (e) {
            next(e);
        }
    }
));
rout.get("/get/:id", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const project = await pool.query("select * from project where id=$1", [req.params.id]);
            res.send(project.rows[0]);
        } catch (e) {
            next(e);
        }
    }
));
rout.get("/task/add", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { task, description, project, staff, project_name, priority, due } = req.body;
            const tasks = await pool.query("insert into task (task,description,project,staff,project_name,priority,due) values ($1,$2,$3,$4,$5,$6,$7) returning * ", [task, description, project, staff, project_name, priority, due]);
            const project_data = await pool.query("select * from project where id=$1", [project]);
            const task_count = parseInt(project_data.rows[0].no_task) + 1;
            const complete_task = parseInt(project_data.rows[0].complete_task);
            const score = (complete_task / task_count) * 100;
            await pool.query("update project set no_task=$1,complete_task=$2,level_complete=$3 where id=$4 ", [task_count, complete_task, score, project]);
            res.send(task);
        } catch (error) {
            next(error);
        }
    }
));
rout.get("task/getall/:projectid", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const tasks = await pool.query("select * from task where project=$1", [req.params.projectid]);
            res.send(tasks.rows);
        } catch (e) {
            next(e);
        }
    }
));
rout.get("task/get/:id", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const task = await pool.query("select * from task where id=$1", [req.params.id]);
            res.send(task.rows[0]);
        } catch (e) {
            next(e);
        }
    }
));
rout.put("task/status/update/:taskId", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {

            const task = await pool.query(
                "UPDATE task SET status=$1 WHERE id=$2 RETURNING id",
                [req.body.status, req.params.taskId]
            );
            if (req.body.status === "completed") {
                const project_data = await pool.query("select * from project where id=$1", [task.rows[0].project]);
                const task_count = parseInt(project_data.rows[0].no_task);
                const complete_task = parseInt(project_data.rows[0].complete_task) + 1;
                const score = (complete_task / task_count) * 100;
                if (score == 100) {
                    await pool.query("update project set no_task=$1,complete_task=$2,level_complete=$3,status=$4 where id=$5 ", [task_count, complete_task, score, "completed", task.rows[0].project]);
                } else {
                    await pool.query("update project set no_task=$1,complete_task=$2,level_complete=$3,status=$4 where id=$5 ", [task_count, complete_task, score, "processed", task.rows[0].project]);
                }
            }
            res.send(task.rows[0]);
        } catch (e) {
            next(e);
        }
    }
));
export default rout;