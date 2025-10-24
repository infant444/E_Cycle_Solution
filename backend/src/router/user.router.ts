import { NextFunction, Router } from "express";
import asyncHandler from 'express-async-handler';
import { pool } from "../config/postgersql.config";
import { v2 as cloudinary } from 'cloudinary';
import { generateUserToken } from "../middleware/jwt.middleware";
import multer from 'multer';
import bcrypt from "bcryptjs";
import { generatePassCode } from "../controller/user.control";
import { MailConfig, mailGenerator } from "../config/mail.config";
import nodeMailer from 'nodemailer';
import { greatEmployee, passwordChanged, resetPassword } from "../controller/email.control";

const rout = Router();
const s = multer.memoryStorage();
const upload = multer({
    storage: s,
    limits: { fieldSize: 1024 * 1024 }
});

rout.post("/login", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const query = 'SELECT * FROM staff WHERE email = $1';
            const user = await pool.query(query, [email]);
            if (user.rowCount == 0 || user.rowCount == null) {
                next({
                    status: 400,
                    message: "No user found!"
                });
                return;
            }
            if(user.rows[0].lock){
                 next({
                    status: 400,
                    message: "your account Locked"
                });
                return;
            }
            if (await bcrypt.compare(password, user.rows[0].password)) {
                const now = new Date().toISOString();
                await pool.query('UPDATE staff set login_time=$1,is_login=$2,updated_at=$3 where id=$4', [now, true, now, user.rows[0].id]);
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

rout.get("/getAll", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const staff = await pool.query("select * from staff");
            res.send(staff.rows);
        } catch (err) {
            next(err);
        }
    }
))

rout.post("/get-data/project-member", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { ids } = req.body;
            const placeholders = ids.map((_: any, i: any) => `$${i + 1}`).join(',');
            const query = `SELECT * FROM staff WHERE id IN (${placeholders})`;
            const result = await pool.query(query, ids);
            res.json(result.rows);
        } catch (e) {
            next(e)
        }
    }));

rout.get("/getById/:id", asyncHandler(
    async (req, res, next: NextFunction) => {
        const result = await pool.query("SELECT * FROM staff WHERE id=$1", [req.params.id,]);
        res.json(result.rows[0])
    }
))

rout.post("/register", upload.single('file'), asyncHandler(
    async (req, res, next: NextFunction) => {
        try {

            const file = req.file as Express.Multer.File;
            const { name, email, dob, contact, role, position } = req.body;
            const user = await pool.query("select * from staff where email=$1", [email]);
            if (user.rowCount != null && user.rowCount > 0) {
                next({
                    status: 500,
                    message: "user already existed!s"
                });
                return;
            }
            let img: string = '';

            if (file) {
                const base64Data = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
                const result = await cloudinary.uploader.upload(base64Data, {
                    folder: "Profile",
                    public_id: file.originalname.split(".")[0],
                    resource_type: "image",
                });
                img = result.secure_url;
            }
            const passcode = generatePassCode();
            let transporter = nodeMailer.createTransport(MailConfig);

            const mailTemplate = greatEmployee(name, email, passcode);
            const mail = mailGenerator.generate(mailTemplate);
            let message = {
                from: '"RI planIt " <riplanit@gmail.com>',
                to: '<' + email + '>',
                subject: "Welcome to E-Cycle Solutions, " + name + "!",
                html: mail,
            }
            console.log(passcode);
            const resultX = await pool.query(`insert into staff (name,email,dob,contact,role,position,password,profile) values($1,$2,$3,$4,$5,$6,$7,$8) returning *`, [name, email, dob, contact, role, position, await bcrypt.hash(passcode, 10), img]);
            transporter.sendMail(message).then(() => {
                console.log("Successfully send to " + name)
            })
            res.json(resultX.rows[0]);
        } catch (err) {
            next(err);
        }
    }
));
rout.get("/logout/:userid", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const query = 'SELECT * FROM staff WHERE id = $1';
            const user = await pool.query(query, [req.params.userid]);
            if (user.rowCount != null && user.rowCount > 0) {
                const now = new Date().toISOString();
                await pool.query('UPDATE staff set is_login=$1,updated_at=$2 where id=$3', [false, now, user.rows[0].id]);
                console.log("Hi")
                res.status(200).json({ "message": "successfully logout" });
                return;
            }
        } catch (e) {
            next(e);
        }
    }
));
rout.get("/resetPassword/:id", asyncHandler(
    async (req, res, next: NextFunction) => {

        try {
            const user = await pool.query(`select * from staff where id=$1`, [req.params.id,]);
            if (user.rowCount != null && user.rowCount > 0) {
                const passcode = generatePassCode();
                let transporter = nodeMailer.createTransport(MailConfig);

                const mailTemplate = resetPassword(user.rows[0].name, passcode);
                const mail = mailGenerator.generate(mailTemplate);
                let message = {
                    from: '"RI planIt " <riplanit@gmail.com>',
                    to: '<' + user.rows[0].email + '>',
                    subject: "Reset password, " + "!",
                    html: mail,
                }
                console.log(passcode);
                const resultX = await pool.query(`UPDATE staff set password=$1 where id=$2 returning *`, [await bcrypt.hash(passcode, 10), req.params.id]);
                transporter.sendMail(message).then(() => {
                    console.log("Successfully send to " + user.rows[0].name)
                })
                res.status(200).json({ "message": "successfully send email" })
            }
        } catch (err) {
            next(err)
        }
    }
))
rout.put("/update/:id", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { name, email, dob, contact, role, position } = req.body;
            const resultX = await pool.query(`update staff set name=$1,email=$2,dob=$3,contact=$4,role=$5,position=$6 where id=$7 returning *`, [name, email, dob, contact, role, position, req.params.id]);
            res.json(resultX.rows[0]);
        } catch (err) {
            next(err);
        }
    }
));
rout.put("/updatePassword/:id", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const { oldPassword, newPassword } = req.body;
            const query = 'SELECT * FROM staff WHERE id = $1';
            const user = await pool.query(query, [req.params.id]);
            if (user.rowCount == 0 || user.rowCount == null) {
                next({
                    status: 400,
                    message: "No user found!"
                });
                return;
            }
            if (await bcrypt.compare((oldPassword ?? '').toString(), user.rows[0].password)) {
                const now = new Date().toISOString();
                await pool.query('UPDATE staff set password=$1 where id=$2', [await bcrypt.hash((newPassword ?? '').toString(), 10), req.params.id]);
                let transporter = nodeMailer.createTransport(MailConfig);

                const mailTemplate = passwordChanged(user.rows[0].name);
                const mail = mailGenerator.generate(mailTemplate);
                let message = {
                    from: '"RI planIt " <riplanit@gmail.com>',
                    to: '<' + user.rows[0].email + '>',
                    subject: "Welcome to E-Cycle Solutions, " + name + "!",
                    html: mail,
                }
                transporter.sendMail(message).then(() => {
                    console.log("Successfully send to " + user.rows[0].name)
                })
                res.status(200).json({ "message": " password update successfully" })
                return;
            }
            next({
                status: 400,
                message: "Password wrong"
            });
        } catch (err) {
            next(err)
        }

    }
));
rout.put("/update-status/:id",asyncHandler(
    async(req,res,next:NextFunction)=>{
        const {status}=req.body;
        try{
        await pool.query('UPDATE staff set lock=$1 where id=$2', [status, req.params.id]);
                res.status(200).json({ "message": "update successfully" })
            
        }catch(err){
            next(err)
        }
        
    }
))
rout.delete("/delete/:id", asyncHandler(
    async (req, res, next: NextFunction) => {
        try {
            const result = await pool.query("delete from staff where id=$1 returning *", [req.params.id]);
            res.send(result.rows[0]);
        } catch (err) {
            next(err)
        }
    }
))
export default rout;