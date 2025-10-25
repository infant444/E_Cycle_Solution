-- Active: 1750250082768@@127.0.0.1@5432@e_cycle

-- extension Package
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



-- Enum types
CREATE TYPE staff_type AS ENUM ('admin', 'staff', 'worker');

CREATE TYPE project_type AS ENUM('completed','processed','pending','accepted');
CREATE TYPE task_type AS ENUM('completed','processed','pending','accepted','rejected');

CREATE TYPE meeting_status AS ENUM('assigned','processed','ready','wait','completed');
-- ALTER TYPE task_type ADD VALUE 'rejected';
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
    is_active BOOLEAN DEFAULT TRUE,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lock BOOLEAN DEFAULT false
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
    value_generate NUMERIC DEFAULT 0,
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
    due_date DATE,
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
    FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE,
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
    estimate_time NUMERIC,
    actual_time NUMERIC DEFAULT 0,
    complete_time NUMERIC DEFAULT 0 ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project) REFERENCES project(id) ON DELETE CASCADE,
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
    status task_type,
    FOREIGN KEY (project) REFERENCES project(id) ON DELETE CASCADE,
    FOREIGN KEY (staff) REFERENCES staff(id) ON DELETE CASCADE,
    FOREIGN KEY (task) REFERENCES task(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS meeting (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status meeting_status DEFAULT 'assigned',
    staff UUID NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (staff) REFERENCES staff(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    collection_name TEXT NOT NULL,
    company VARCHAR(150) NOT NULL,
    stored_location VARCHAR(150) NOT NULL,
    received_date DATE NOT NULL,
    processed_date DATE,
    status VARCHAR(50) DEFAULT 'Active',
    remarks TEXT,
    client_id UUID NOT NULL,
    manager_name TEXT NOT NULL,
    total_items INT DEFAULT 0,
    total_value NUMERIC(12, 2) DEFAULT 0.00,
    created_by UUID,
    updated_by UUID,
    manage UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_id UUID REFERENCES inventory(id) ON DELETE CASCADE,
    product_name VARCHAR(150) NOT NULL,
    barcode VARCHAR(100) UNIQUE,
    category VARCHAR(100),
    brand VARCHAR(100),
    quantity INT DEFAULT 0,
    stock_in_date DATE NOT NULL,
    stock_out_date DATE,
    unit_price NUMERIC(10, 2) NOT NULL,
    total_value NUMERIC(12, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    no_item_sold INT DEFAULT 0,
    profit_margin NUMERIC(5, 2),
    product_value NUMERIC(10, 2),
    expiry_date DATE,
    condition VARCHAR(50) DEFAULT 'New',
    status VARCHAR(50) DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    type VARCHAR(50) CHECK (type IN ('Purchase', 'Sale', 'Return', 'Damage')),
    quantity INT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    total_amount NUMERIC(12, 2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_or_supplier VARCHAR(150),
    client UUID,
    payment_status VARCHAR(50) CHECK (payment_status IN ('Paid', 'Pending', 'Refunded')),
    remarks TEXT
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receiver_id UUID,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  redirect TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (receiver_id) REFERENCES staff(id) ON DELETE CASCADE
);
-- Update Function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_meeting_updated_at
BEFORE UPDATE ON meeting
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_set_updated_at
BEFORE UPDATE ON task
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trigger_set_user_updated_at
BEFORE UPDATE ON staff
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

CREATE TRIGGER trg_generate_barcode
BEFORE INSERT ON products
FOR EACH ROW
EXECUTE FUNCTION generate_barcode_if_null();
ALTER TABLE meeting ALTER COLUMN start_date TYPE date USING start_date::date;
ALTER TABLE meeting ALTER COLUMN end_date TYPE date USING end_date::date;
-- Automatic functionality
CREATE OR REPLACE FUNCTION generate_barcode_if_null()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.barcode IS NULL OR NEW.barcode = '' THEN
    NEW.barcode := 'PROD-' ||
                   TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' ||
                   SUBSTRING(MD5(RANDOM()::text) FROM 1 FOR 6);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- DROP TABLE timeSheet;
-- DROP TABLE task;
-- DROP TABLE project;
-- Drop TABLE client;

-- ALTER TABLE inventory ADD COLUMN collection_name TEXT NOT NULL ; 

-- ALTER TABLE products DROP COLUMN description;
