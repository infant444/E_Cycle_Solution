import e, { NextFunction, Router } from "express";
import asyncHandler from 'express-async-handler';
import { pool } from "../config/postgersql.config";
import auth from "../middleware/auth.middleware";
import { MailConfig, mailGenerator } from "../config/mail.config";
import nodeMailer from 'nodemailer';
import { schudeleMeeting } from "../controller/email.control";
import { createICSFile } from "../controller/calender.controller";
const rout = Router();
rout.use(auth);

rout.post("/add", asyncHandler(
  async (req, res, next: NextFunction) => {
    const { title, type, description, status, staff, start_date, start_time, end_date, end_time } = req.body;
    try {
      const result = await pool.query(`insert into meeting (title, type, description, status, staff, start_date, start_time, end_date, end_time) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`, [title, type, description, status, staff, start_date, start_time, end_date, end_time]);
      const user = await pool.query(`select * from staff where id=$1`, [staff]);
      console.log(user.rows[0])

      if (user.rowCount != null && user.rowCount > 0) {
        let transporter = nodeMailer.createTransport(MailConfig);
        const mailTemplate = schudeleMeeting(user.rows[0].name, title, start_date, start_time, end_time, type, description);
        const mail = mailGenerator.generate(mailTemplate);
        const icsContent = createICSFile(title, type, description, start_date, start_time, end_date, end_time)
        let message = {
          from: '"RI planIt " <riplanit@gmail.com>',
          to: '<' + user.rows[0].email + '>',
          subject: `Meeting Scheduled: ${title}`,
          html: mail,
          attachments: [
            {
              filename: "meeting.ics",
              content: Buffer.from(icsContent, "utf-8"),
              contentType: "text/calendar; charset=UTF-8; method=REQUEST",
            },
          ],
        }

        transporter.sendMail(message).then(() => {
          console.log("Successfully send to " + user.rows[0].name)
        })
        res.json(result.rows[0]);
      }
    } catch (err) {
      next(err);
    }
  }
));
rout.get("/get/all", asyncHandler(
  async (req, res, next: NextFunction) => {
    try {
      const result = await pool.query("select * from meeting", []);
      res.json(result.rows);
    } catch (err) {
      next(err)
    }
  }
));
rout.get('/get/all/upcoming', asyncHandler(
  async (req, res, next: NextFunction) => {
    try {
      const now = new Date().toISOString().split('T')[0];
      const result = await pool.query("select * from meeting where start_date >= $1", [now]);
      res.json(result.rows);
    } catch (err) {
      next(err)
    }
  }
));

rout.get('/get/user/:id', asyncHandler(
  async (req, res, next: NextFunction) => {
    try {
      const result = await pool.query("select * from meeting where staff=$1", [req.params.id]);
      res.json(result.rows);
    } catch (err) {
      next(err)
    }
  }
));

rout.get('/get/user/upcoming/:id', asyncHandler(
  async (req, res, next: NextFunction) => {
    try {
      const now = new Date().toISOString().split('T')[0];
      const result = await pool.query("select * from meeting where start_date >= $1 and staff=$2", [now, req.params.id]);
      res.json(result.rows);
    } catch (err) {
      next(err)
    }
  }
));
rout.get('/get/meeting/:id', asyncHandler(
  async (req, res, next: NextFunction) => {
    try {
      const result = await pool.query("select * from meeting where id=$1", [req.params.id]);
      res.json(result.rows[0]);
    } catch (err) {
      next(err)
    }
  }
));

rout.put('/update/all/:id', asyncHandler(
  async (req, res, next: NextFunction) => {
    try {
      const { title, type, description, staff, start_date, start_time, end_date, end_time } = req.body;
      await pool.query("update meeting set  title=$1, type=$2, description=$3, staff=$4, start_date=$5, start_time=$6, end_date=$7, end_time=$8 where id=$9", [title, type, description, staff, start_date, start_time, end_date, end_time, req.params.id]);
      res.status(200).json({ "message": "Updated successfully" })
    } catch (err) {
      next(err);
    }
  }
))
rout.put('/update/status/:id', asyncHandler(
  async (req, res, next: NextFunction) => {
    try {
      const { status } = req.body;
      await pool.query("update meeting set status=$1 where id=$2", [status, req.params.id]);
      res.status(200).json({ "message": "Updated successfully" })
    } catch (err) {
      next(err);
    }
  }
))

rout.delete("/delete/meeting/:id", asyncHandler(
  async (req, res, next: NextFunction) => {
    try {
      await pool.query(`delete from meeting where id=$1`, [req.params.id]);
      res.status(200).json({ "message": "Deleted successfully" })
    } catch (err) {
      next(err)
    }
  }
))
export default rout;