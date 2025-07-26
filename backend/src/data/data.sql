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
    type TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    contactNumber VARCHAR(15) UNIQUE,
    address TEXT,
    noProject NUMERIC,
    isCurrentProject BOOLEAN,
    currentProject TEXT,
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
    project UUID,
    projectName TEXT,
    status project_type,
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
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project) REFERENCES project(id),
    FOREIGN KEY (staff) REFERENCES staff(id),
    FOREIGN KEY (task) REFERENCES task(id)
);











-- Sample data
INSERT INTO
    staff (
        name,
        email,
        password,
        dob,
        contact,
        role
    )
VALUES (
        'infant',
        'infant0467@gmail.com',
        '1234',
        '2004-01-15',
        '9342199741',
        'admin'
    );

-- Drop Tables

-- DROP TABLE staff;
Drop TABLE staff;
Drop TABLE client;