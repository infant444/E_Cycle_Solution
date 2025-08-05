-- Active: 1750250082768@@127.0.0.1@5432@e_cycle

-- extension Package
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types
CREATE TYPE staff_type AS ENUM ('admin', 'staff', 'worker');

CREATE TYPE project_type AS ENUM('completed','processed','pending','accepted');
CREATE TYPE task_type AS ENUM('completed','processed','pending','accepted');



-- Created tables
CREATE TABLE IF NOT EXISTS Staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    dob DATE,
    contact VARCHAR(15),
    role staff_type,
    isLogin BOOLEAN DEFAULT FALSE,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS client (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    contactNumber VARCHAR(15) UNIQUE,
    contactPerson TEXT,
    address TEXT,
    website TEXT,
    noProject NUMERIC,
    totalCollection NUMERIC,
    value NUMERIC,
    isCurrentProject BOOLEAN,
    currentProject TEXT,
    lastCollectionDate DATE,
    specialInstruction TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project (
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
);

CREATE TABLE IF NOT EXISTS task(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    task TEXT NOT NULL,
    description TEXT,
    project UUID,
    projectName TEXT,
    status task_type,
    priority NUMERIC,
    due Date,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project) REFERENCES project(id)
);



CREATE TABLE IF NOT EXISTS timeSheet(
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
    totalHours NUMERIC,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project) REFERENCES project(id),
    FOREIGN KEY (staff) REFERENCES staff(id),
    FOREIGN KEY (task) REFERENCES task(id)
);











-- Sample data
-- INSERT INTO
--     staff (
--         name,
--         email,
--         password,
--         dob,
--         contact,
--         role
--     )
-- VALUES (
--         'infant',
--         'infant0467@gmail.com',
--         '1234',
--         '2004-01-15',
--         '9342199741',
--         'admin'
--     );

-- -- Drop Tables

-- -- DROP TABLE staff;
-- Drop TABLE staff;

-- DROP TABLE timeSheet;
-- DROP TABLE task;
-- DROP TABLE project;
-- Drop TABLE client;

-- ALTER TABLE client ADD COLUMN contactPerson TEXT; 
-- ALTER TABLE client RENAME COLUMN contctnumber to contactNumber; 