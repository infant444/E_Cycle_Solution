import { NextFunction, Router } from "express";
import asyncHandler from "express-async-handler";
import { pool } from "../config/postgersql.config";
import auth from "../middleware/auth.middleware";
import { ProjectModel } from "../model/project.model";
import { projectAssignedEmployee, ProjectAssignedManager } from "../controller/email.control";
import { MailConfig, mailGenerator } from "../config/mail.config";
import nodeMailer from 'nodemailer';
const rout = Router();

rout.use(auth);

rout.post("/add", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { project_name, description, client_id, due_date, manager_id, priority, budget, team_member, tags } = req.body;

            const project = await pool.query("insert into project (project_name,client_id,due_date,status,level_complete,no_task,completed_task,description,manager_id,priority,budget,team_member,tags) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING*", [project_name, client_id, due_date, "pending", 0, 0, 0, description, manager_id, priority, budget, team_member, tags]);
            const client = await pool.query("select * from client where id=$1;", [client_id,]);
            if (client.rowCount != null && client.rowCount > 0) {
                var count = parseInt(client.rows[0].no_project) || 0;
                count += 1;
                await pool.query("update client set current_project=$1,is_current_project=$2,no_project=$3 where id=$4", [project_name, true, count, client_id]);
                var staffX: string[] = [];
                const manager = await pool.query("select * from staff where id=$1", [manager_id,]);
                let transporter = nodeMailer.createTransport(MailConfig);
                for (let i = 0; i < team_member.length; i++) {
                    const staff = await pool.query("select * from staff where id=$1", [team_member[i],]);
                    const staffMailTem = projectAssignedEmployee(staff.rows[0].name, client.rows[0].name, project_name, due_date, manager.rows[0].name);
                    const mail = mailGenerator.generate(staffMailTem);
                    let message = {
                        from: '"RI planIt " <riplanit@gmail.com>',
                        to: '<' + staff.rows[0].email + '>',
                        subject: "Project Assignment Notification",
                        html: mail,
                    }
                    transporter.sendMail(message).then(() => {
                        console.log("Successfully send to " + staff.rows[0].name)
                    })
                    staffX.push(staff.rows[0].name);
                }
                const managerMail = ProjectAssignedManager(manager.rows[0].name, project_name, client.rows[0].name, due_date, staffX);
                const mail = mailGenerator.generate(managerMail);
                let message = {
                    from: '"RI planIt " <riplanit@gmail.com>',
                    to: '<' + manager.rows[0].email + '>',
                    subject: "Project Assignment Notification",
                    html: mail,
                }
                transporter.sendMail(message).then(() => {
                    console.log("Successfully send to " + manager.rows[0].name)
                })
            }

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
rout.get("/get-by-client/:clientId", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const project = await pool.query("select * from project where client_id=$1", [req.params.clientId]);
            res.send(project.rows);
        } catch (e) {
            next(e);
        }
    }
))
rout.put("/update/:id", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { project_name, description, client_id, due_date, manager_id, priority, budget, team_member, tags, status, level_complete, no_task, complete_task } = req.body;

            const project = await pool.query(
                `UPDATE project 
   SET project_name=$1,
       client_id=$2,
       due_date=$3,
       description=$4,
       manager_id=$5,
       priority=$6,
       budget=$7,
       team_member=$8,
       tags=$9
   WHERE id=$10
   RETURNING *`,
                [
                    project_name,
                    client_id,
                    due_date,
                    description,
                    manager_id,
                    priority,
                    budget,
                    team_member,
                    tags,
                    req.params.id // <-- you forgot to pass id
                ]
            ); res.json(project.rows[0]);
        } catch (error) {
            next(error);
        }
    }
));
rout.put("/update/status/:id",asyncHandler(
    async(req,res,next:NextFunction)=>{
        try{
        const result= await pool.query("update project set status=$1 where id=$2 RETURNING *",[req.body.status,req.params.id])
        res.json(result.rows[0]);
        }catch(err){
            next(err);
        }
    }
))
rout.delete("/delete/:id", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const result = await pool.query("delete from project where id=$1 RETURNING *", [req.params.id,]);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
))


// TASK
rout.post("/task/add", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { task, description, project, staff, project_name, priority, due } = req.body;
            const tasks = await pool.query("insert into task (task,description,project,staff,project_name,priority,due) values ($1,$2,$3,$4,$5,$6,$7) returning * ", [task, description, project, staff, project_name, priority, due]);
            const project_data = await pool.query("select * from project where id=$1", [project]);
            const task_count = parseInt(project_data.rows[0].no_task) + 1;
            const complete_task = parseInt(project_data.rows[0].complete_task);
            const score = (complete_task / task_count) * 100;
            await pool.query("update project set no_task=$1,completed_task=$2,level_complete=$3 where id=$4 ", [task_count, complete_task, score, project]);
            res.send(tasks);
        } catch (error) {
            next(error);
        }
    }
));
rout.get("/task/getall/:projectid", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const tasks = await pool.query("select * from task where project=$1", [req.params.projectid]);
            res.send(tasks.rows);
        } catch (e) {
            next(e);
        }
    }
));
rout.get("/task/get/:id", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const task = await pool.query("select * from task where id=$1", [req.params.id]);
            res.send(task.rows[0]);
        } catch (e) {
            next(e);
        }
    }
));
rout.put("/task/status/update/:taskId", asyncHandler(
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
                    await pool.query("update project set no_task=$1,completed_task=$2,level_complete=$3,status=$4 where id=$5 ", [task_count, complete_task, score, "completed", task.rows[0].project]);
                } else {
                    await pool.query("update project set no_task=$1,completed_task=$2,level_complete=$3,status=$4 where id=$5 ", [task_count, complete_task, score, "processed", task.rows[0].project]);
                }
            }
            res.send(task.rows[0]);
        } catch (e) {
            next(e);
        }
    }
));

rout.delete("/task/delete/:id", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const data = await pool.query("select * from task where id=$1", [req.params.id,]);
            if (data.rowCount != null && data.rowCount > 0) {
                const projectData = await pool.query("select * from project where id=$1;"[data.rows[0].project]);
                if (projectData.rowCount != null && projectData.rowCount > 0) {
                    const noTask = parseInt(projectData.rows[0].no_task) - 1;
                    await pool.query("update project set no_task=$1 where id=$2", [noTask, data.rows[0].project])
                    if (data.rows[0].status == 'completed') {
                        const completedTask = parseInt(projectData.rows[0].completed_task) - 1;
                        await pool.query("update project set completed_task=$1 where id=$2", [noTask, data.rows[0].project])
                    }
                    await pool.query("delete from task where id=$1", [req.params.id]);
                }
            }
            res.json(data);
        } catch (err) {
            next(err);
        }
    }
))
export default rout;