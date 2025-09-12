-- Active: 1750250082768@@127.0.0.1@5432@e_cycle

-- extension Package
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum types
CREATE TYPE staff_type AS ENUM ('admin', 'staff', 'worker');

CREATE TYPE project_type AS ENUM('completed','processed','pending','accepted');
CREATE TYPE task_type AS ENUM('completed','processed','pending','accepted');

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Created tables
CREATE TABLE IF NOT EXISTS Staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    dob DATE,
    contact VARCHAR(15),
    role staff_type,
    is_login BOOLEAN DEFAULT FALSE,
    profile TEXT,
    position TEXT,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS client (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL,
    contact_number VARCHAR(15) UNIQUE,
    contact_person TEXT,
    address TEXT,
    website TEXT,
    no_project NUMERIC,
    total_collection NUMERIC,
    value NUMERIC,
    is_current_project BOOLEAN,
    current_project TEXT,
    last_collection_date DATE,
    special_instruction TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_name TEXT NOT NULL,
    description TEXT,
    client_id UUID,
    manager_id UUID,
    start_date DATE,
    status project_type,
    priority NUMERIC DEFAULT 0,
    budget NUMERIC,
    team_member UUID[],
    tags TEXT[] DEFAULT '{}'::TEXT[],
    level_complete NUMERIC DEFAULT 0,
    no_task NUMERIC DEFAULT 0,
    completed_task NUMERIC DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES client(id),
    FOREIGN KEY (manager_id) REFERENCES staff(id)
);

CREATE TABLE IF NOT EXISTS task (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task TEXT NOT NULL,
    description TEXT,
    project UUID,
    staff UUID NOT NULL,
    project_name TEXT,
    status task_type DEFAULT 'pending',
    priority NUMERIC DEFAULT 1,
    due DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project) REFERENCES project(id),
    FOREIGN KEY (staff) REFERENCES staff(id)
);

CREATE TABLE IF NOT EXISTS timesheet (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff UUID NOT NULL,
    task UUID NOT NULL,
    project UUID NOT NULL,
    task_name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    description TEXT,
    date DATE,
    start_time TIME,
    end_time TIME,
    total_hours NUMERIC DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project) REFERENCES project(id),
    FOREIGN KEY (staff) REFERENCES staff(id),
    FOREIGN KEY (task) REFERENCES task(id)
);





-- Update Function

CREATE TRIGGER trigger_set_updated_at
BEFORE UPDATE ON task
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();


CREATE TRIGGER trigger_set_client_updated_at
BEFORE UPDATE ON client
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_set_project_updated_at
BEFORE UPDATE ON project
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_set_time_sheet_updated_at
BEFORE UPDATE ON timesheet
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

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
--         'ram',
--         'ram7@gmail.com',
--         '1234',
--         '2014-11-12',
--         '9342198941',
--         'staff'
--     );

-- -- Drop Tables

-- -- DROP TABLE staff;
-- Drop TABLE staff;

DROP TABLE timeSheet;
DROP TABLE task;
DROP TABLE project;
-- Drop TABLE client;

-- ALTER TABLE staff ADD COLUMN position TEXT; 
-- ALTER TABLE staff RENAME COLUMN isLogin to is_login; 