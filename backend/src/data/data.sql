-- Active: 1750250082768@@127.0.0.1@5432@e_cycle

-- extension Package
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types
CREATE TYPE staff_type AS ENUM ('admin', 'staff', 'worker');

-- Created tables
CREATE TABLE IF NOT EXISTS Staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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


-- Sample data
INSERT INTO staff (name, email, password, dob, contact, role) 
VALUES ('infant', 'infant0467@gmail.com', '1234', '2004-01-15', '9342199741', 'admin');



-- Drop Tables

-- DROP TABLE staff;
Drop TABLE staff;