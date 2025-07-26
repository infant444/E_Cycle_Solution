import { Router, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { pool } from "../config/postgersql.config";
import { stat } from "fs";

const rout = Router();

rout.get(
  "/client",
  asyncHandler(async (req, res, next: NextFunction) => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS client(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    contactNumber VARCHAR(15) UNIQUE,
    address TEXT,
    noProject NUMERIC,
    isCurrentProject BOOLEAN,
    currentProject TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
)`);
      res.json({ status: "success" });
    } catch (error) {
      next(error);
    }
  })
);
rout.get(
  "/project",
  asyncHandler(async (req, res, next: NextFunction) => {
    try {
      await pool.query(
        `CREATE TYPE project_type AS ENUM('completed','processed','pending','accepted');`
      );
      await pool.query(`CREATE TABLE IF NOT EXISTS project (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    projectName Text NOT NULL,
    client_id UUID,
    startDate DATE,
    status project_type,
    level_complete NUMERIC,
    noTask NUMERIC,
    completedTask NUMERIC,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES client(id)

);`);
      res.json({ status: "success" });
    } catch (error) {
      next(error);
    }
  })
);

rout.get(
  "/task",
  asyncHandler(async (req, res, next: NextFunction) => {
    try {
//       await pool.query(`  CREATE TYPE IF NOT EXISTS task_type AS ENUM (
//     'completed',
//     'processed',
//     'pending',
//     'accepted'
//   );`);
      await pool.query(`CREATE TABLE IF NOT EXISTS task(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    task TEXT NOT NULL,
    project UUID,
    projectName TEXT,
    status task_type,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project) REFERENCES project(id) ON DELETE CASCADE
);`);
      res.json({ status: "success" });
    } catch (error) {
      next(error);
    }
  })
);

rout.get(
  "/timeSheet",
  asyncHandler(async (req, res, next: NextFunction) => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS timeSheet(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    staff UUID NOT NULL,
    task UUID NOT NULL,
    project UUID NOT NULL,
    taskName TEXT NOT NULL,
    projectName TEXT NOT NULL,
    description TEXT,
    date DATE,
    startTime TIME,
    endTime TIME,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project) REFERENCES project(id),
    FOREIGN KEY (staff) REFERENCES staff(id),
    FOREIGN KEY (task) REFERENCES task(id)
);`);
      res.json({ status: "success" });
    } catch (error) {
      next(error);
    }
  })
);
export default rout;
